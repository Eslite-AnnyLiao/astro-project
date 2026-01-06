import { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * API 錯誤接口定義
 */
export interface ApiError extends Error {
  code?: string;
  status?: number;
  response?: AxiosResponse;
  config?: InternalAxiosRequestConfig;
}

/**
 * 網路錯誤類型
 */
export type NetworkErrorType = 'TIMEOUT' | 'NETWORK_ERROR' | 'CONNECTION_ABORTED' | 'REQUEST_ABORTED' | 'UNKNOWN';

/**
 * HTTP 錯誤類型
 */
export type HttpErrorType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE' | 'UNKNOWN_HTTP_ERROR';

/**
 * 錯誤嚴重程度
 */
export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * 重試配置
 */
export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryCondition?: (error: AxiosError) => boolean;
}

/**
 * 錯誤日誌配置
 */
export interface LogConfig {
  enabled: boolean;
  logLevel: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  customLogger?: (message: string, error: AxiosError) => void;
}

/**
 * 請求取消配置
 */
export interface AbortConfig {
  enabled: boolean;
  timeout?: number; // 自動取消超時時間（毫秒）
}

/**
 * 環境類型 - 對應 Vite 的 mode
 */
export type Environment = 'development' | 'lab' | 'stg' | 'uat' | 'prd' | 'production' | 'snapshot' | string;

/**
 * 環境配置映射
 */
export interface EnvironmentConfig {
  [key: string]: string; // 環境名稱對應 baseURL
}