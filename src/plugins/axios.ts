import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type {
  ApiError,
  NetworkErrorType,
  HttpErrorType,
  ErrorSeverity,
  RetryConfig,
  LogConfig,
  AbortConfig,
} from '@/types/asioxType';
import type { PluginContext } from '@/types/plugin';

/**
 * 判斷錯誤類型是否為 ECONNABORTED / Network Error / timeout
 */
const isErrorTimeout = (error: AxiosError | ApiError): boolean =>
  error?.code === 'ECONNABORTED' ||
  error?.message === 'Network Error' ||
  error?.message.toLowerCase()?.includes('timeout');

/**
 * 獲取網路錯誤類型
 */
const getNetworkErrorType = (error: AxiosError | ApiError): NetworkErrorType => {
  if (error?.code === 'ECONNABORTED') return 'CONNECTION_ABORTED';
  if (error?.message === 'Network Error') return 'NETWORK_ERROR';
  if (error?.message === 'Request aborted') return 'REQUEST_ABORTED';
  if (error?.message.toLowerCase()?.includes('timeout')) return 'TIMEOUT';
  return 'UNKNOWN';
};

/**
 * 獲取 HTTP 錯誤類型
 */
const getHttpErrorType = (status: number): HttpErrorType => {
  switch (status) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 500:
      return 'INTERNAL_SERVER_ERROR';
    case 503:
      return 'SERVICE_UNAVAILABLE';
    default:
      return 'UNKNOWN_HTTP_ERROR';
  }
};

/**
 * 獲取錯誤嚴重程度
 */
const getErrorSeverity = (error: AxiosError): ErrorSeverity => {
  const status = error.response?.status;

  if (!status) {
    // 網路錯誤通常是高嚴重程度
    return 'HIGH';
  }

  if (status >= 500) return 'CRITICAL';
  if (status === 401 || status === 403) return 'HIGH';
  if (status === 404 || status === 400) return 'MEDIUM';
  return 'LOW';
};

/**
 * 判斷是否應該重試
 */
const shouldRetry = (error: AxiosError, retryCount: number, config: RetryConfig): boolean => {
  if (retryCount >= config.maxRetries) return false;

  if (config.retryCondition) {
    return config.retryCondition(error);
  }

  // 預設重試條件：網路錯誤或 5xx 錯誤
  const status = error.response?.status;
  return !status || status >= 500 || isErrorTimeout(error);
};

/**
 * 延遲函數
 */
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 重試機制
 */
const retryRequest = async (
  originalRequest: InternalAxiosRequestConfig,
  error: AxiosError,
  retryConfig: RetryConfig,
): Promise<AxiosResponse> => {
  let retryCount = 0;
  let lastError = error;

  while (shouldRetry(lastError, retryCount, retryConfig)) {
    retryCount++;

    // 延遲後重試
    await delay(retryConfig.retryDelay * retryCount);

    try {
      const response = await axios.request(originalRequest);
      return response;
    } catch (retryError) {
      lastError = retryError as AxiosError;
    }
  }

  return Promise.reject(lastError);
};

/**
 * 錯誤日誌記錄
 */
const logError = (error: AxiosError, logConfig: LogConfig): void => {
  if (!logConfig.enabled) return;

  const status = error.response?.status;
  const method = error.config?.method?.toUpperCase();
  const url = error.config?.url;
  const errorType = status ? getHttpErrorType(status) : getNetworkErrorType(error);
  const severity = getErrorSeverity(error);

  const message = `[${severity}] ${method} ${url} - ${status || 'Network Error'} (${errorType})`;

  if (logConfig.customLogger) {
    logConfig.customLogger(message, error);
  } else {
    // 根據嚴重程度選擇日誌級別
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        console.error(message, error);
        break;
      case 'MEDIUM':
        console.warn(message, error);
        break;
      case 'LOW':
        console.info(message, error);
        break;
    }
  }
};

/**
 * 預設配置
 */
const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
};

const defaultLogConfig: LogConfig = {
  enabled: true,
  logLevel: 'ERROR',
};

const defaultAbortConfig: AbortConfig = {
  enabled: true,
  timeout: 30 * 1000, // 30秒
};

/**
 * 請求取消管理器
 */
class AbortManager {
  private controllers = new Map<string, AbortController>();
  private config: AbortConfig;

  constructor(config: AbortConfig) {
    this.config = config;
  }

  /**
   * 生成請求鍵
   */
  private generateKey(requestConfig: InternalAxiosRequestConfig): string {
    const { method, url } = requestConfig;
    return `${method?.toUpperCase()}_${url}`;
  }

  /**
   * 創建 AbortController
   */
  createController(requestConfig: InternalAxiosRequestConfig): AbortController | null {
    if (!this.config.enabled) return null;

    const key = this.generateKey(requestConfig);

    // 如果已有相同請求，先取消它
    this.cancelRequest(key);

    const controller = new AbortController();
    this.controllers.set(key, controller);

    // 設置自動超時
    if (this.config.timeout) {
      setTimeout(() => {
        if (this.controllers.has(key)) {
          controller.abort();
          this.controllers.delete(key);
        }
      }, this.config.timeout);
    }

    return controller;
  }

  /**
   * 取消特定請求
   */
  cancelRequest(key: string): void {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  /**
   * 完成請求後清理
   */
  completeRequest(requestConfig: InternalAxiosRequestConfig): void {
    const key = this.generateKey(requestConfig);
    this.controllers.delete(key);
  }

  /**
   * 取消所有請求
   */
  cancelAll(): void {
    const entries = Array.from(this.controllers.entries());
    for (const [, controller] of entries) {
      controller.abort();
    }
    this.controllers.clear();
  }
}

/**
 * 增強的錯誤處理
 */
const handleApiError = async (
  error: AxiosError,
  retryConfig: RetryConfig = defaultRetryConfig,
  logConfig: LogConfig = defaultLogConfig,
): Promise<never> => {
  // 記錄錯誤
  logError(error, logConfig);

  // 部分 browser 換頁時會強制中斷，不進行重試
  if (error?.message === 'Request aborted') {
    return Promise.reject(error);
  }

  // 如果有原始請求配置且符合重試條件，嘗試重試
  if (error.config && shouldRetry(error, 0, retryConfig)) {
    try {
      const response = await retryRequest(error.config, error, retryConfig);
      return response as never; // 這裡實際上會返回成功的響應
    } catch (retryError) {
      // 重試失敗，記錄最終錯誤
      logError(retryError as AxiosError, { ...logConfig, logLevel: 'ERROR' });
      return Promise.reject(retryError);
    }
  }

  // 其他錯誤直接拋出
  return Promise.reject(error);
};

/**
 * 全域 axios 配置函數
 */
const globalAxios = (options?: {
  customRetryConfig?: Partial<RetryConfig>;
  customLogConfig?: Partial<LogConfig>;
  customAbortConfig?: Partial<AbortConfig>;
  globalHeaders?: Record<string, string>;
}): { 
  abortManager: AbortManager;
} => {
  // 合併配置
  const retryConfig: RetryConfig = { ...defaultRetryConfig, ...options?.customRetryConfig };
  const logConfig: LogConfig = { ...defaultLogConfig, ...options?.customLogConfig };
  const abortConfig: AbortConfig = { ...defaultAbortConfig, ...options?.customAbortConfig };

  // 創建管理器實例
  const abortManager = new AbortManager(abortConfig);

  // Request interceptor
  axios.interceptors.request.use((request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (request === undefined) return request;

    // 設置 AbortController
    const controller = abortManager.createController(request);
    if (controller) {
      request.signal = controller.signal;
    }

    // 設定基本超時時間
    if (!request.timeout) {
      request.timeout = 30 * 1000; // 30秒
    }

    return request;
  });

  // Response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      // 清理成功的請求
      if (response.config) {
        abortManager.completeRequest(response.config);
      }

      return response;
    },
    async (error: AxiosError): Promise<never> => {
      // 清理失敗的請求
      if (error.config) {
        abortManager.completeRequest(error.config);
      }

      return await handleApiError(error, retryConfig, logConfig);
    },
  );

  // 返回管理器和控制函數
  return { 
    abortManager,
  };
};

// 創建 asiox 插件包裝器
export default ({ app, pluginContext }: PluginContext) => {
  // 初始化 globalAxios 實例
  const axiosInstance = globalAxios();
  
  // 將實例掛載到 Vue 應用的全域屬性
  if (app) {
    app.config.globalProperties.$asiox = axiosInstance;
  }
  
  // 也可以提供到插件上下文
  if (pluginContext) {
    pluginContext.asiox = axiosInstance;
  }
};
