# Astro Project

基於 Astro 的 Eslite EC Frontend 專案。

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🛠 開發環境設置

### HTTPS 憑證安裝

本專案支援 HTTPS 開發環境，需要安裝 SSL 憑證：

#### 方法 1：使用 mkcert（推薦）

```bash
# 1. 安裝 mkcert
brew install mkcert

# 2. 安裝根憑證到系統（需要輸入密碼）
mkcert -install

# 3. 生成本地憑證
mkcert localhost 127.0.0.1 ::1

# 4. 重新命名憑證檔案
mv localhost+2.pem server.crt
mv localhost+2-key.pem server.key
```

#### 方法 2：使用 OpenSSL（會有瀏覽器警告）

```bash
openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt -days 365 -nodes \
  -subj "/C=TW/ST=Taiwan/L=Taipei/O=Development/OU=IT Department/CN=localhost"
```

#### 方法 3：瀏覽器手動信任

如果不想安裝憑證，可以在瀏覽器中手動信任：

1. 訪問 `https://localhost:3000/`
2. 點擊「進階」或「Advanced」
3. 選擇「繼續前往 localhost (不安全)」

### 環境變數設置

複製環境變數檔案：

```bash
# 開發環境
cp .env.development .env.local

# 或根據需要修改 .env 檔案中的 VITE_API 設定
```

## 🧞 指令

所有指令都在專案根目錄執行：

### 開發環境
| 指令                      | 說明                                             |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | 安裝相依套件                                      |
| `pnpm dev`                | 啟動開發伺服器 `https://localhost:3000/`         |
| `pnpm start:lab`          | Lab 環境開發模式                                 |
| `pnpm start:stg`          | Staging 環境開發模式                             |
| `pnpm start:uat`          | UAT 環境開發模式                                 |
| `pnpm start:prd`          | Production 環境開發模式                          |

### 建置部署
| 指令                      | 說明                                             |
| :------------------------ | :----------------------------------------------- |
| `pnpm build`              | 建置正式版本到 `./dist/`                         |
| `pnpm build:lab`          | 建置 Lab 環境版本                               |
| `pnpm build:stg`          | 建置 Staging 環境版本                           |
| `pnpm build:uat`          | 建置 UAT 環境版本                               |
| `pnpm build:prd`          | 建置 Production 環境版本                        |

### 預覽
| 指令                      | 說明                                             |
| :------------------------ | :----------------------------------------------- |
| `pnpm preview`            | 本地預覽建置結果                                 |
| `pnpm preview:lab`        | 預覽 Lab 環境建置結果                           |
| `pnpm preview:stg`        | 預覽 Staging 環境建置結果                       |
| `pnpm preview:uat`        | 預覽 UAT 環境建置結果                           |
| `pnpm preview:prd`        | 預覽 Production 環境建置結果                    |

## 📦 主要功能

### Asiox 插件 - 增強型 Axios

本專案包含 `asiox` 插件，提供以下功能：

- **多環境支援**：自動從環境變數讀取 API baseURL
- **智能重試機制**：網路錯誤和 5xx 錯誤自動重試
- **詳細錯誤分類**：HTTP 狀態碼分類和嚴重程度判斷
- **請求取消**：使用 AbortController 管理請求取消
- **錯誤日誌**：根據嚴重程度自動記錄錯誤
- **TypeScript 完整支援**：所有功能都有完整的類型定義

#### 使用範例

```typescript
import globalAxios from '@/plugins/asiox';

// 基本使用 - 自動從環境變數讀取 baseURL
const { abortManager, setBaseURL, setGlobalHeaders } = globalAxios();

// 自訂配置
const { abortManager } = globalAxios({
  baseURL: 'https://custom-api.com',
  globalHeaders: { 'Authorization': 'Bearer token' },
  customRetryConfig: { maxRetries: 5, retryDelay: 2000 },
  customLogConfig: { enabled: true, logLevel: 'DEBUG' }
});

// 動態切換 API 端點
setBaseURL('https://new-api.com');
setGlobalHeaders({ 'X-Custom-Header': 'value' });

// 取消所有請求
abortManager.cancelAll();
```

## 🔧 技術架構

- **框架**: Astro 5.x + Vue 3
- **狀態管理**: Pinia
- **樣式**: TailwindCSS + SCSS
- **HTTP 客戶端**: Axios (增強版 asiox)
- **建置工具**: Vite
- **開發工具**: TypeScript, ESLint

## 📁 專案結構

```text
/
├── public/                 # 靜態檔案
├── src/
│   ├── assets/            # 資源檔案 (CSS, SCSS, 圖片)
│   ├── components/        # Vue 元件
│   ├── layouts/           # Astro 版面配置
│   ├── pages/            # 頁面檔案
│   ├── plugins/          # 插件 (asiox, head, pinia 等)
│   ├── stores/           # Pinia 狀態管理
│   └── types/            # TypeScript 類型定義
├── .env*                 # 環境變數檔案
├── server.key            # SSL 私鑰 (本地開發)
└── server.crt            # SSL 憑證 (本地開發)
```

## 🌍 環境配置

專案支援多環境配置，透過不同的 `.env` 檔案：

- `.env` - 通用 API 路徑定義
- `.env.development` - 開發環境設定
- `.env.lab` - Lab 環境設定  
- `.env.stg` - Staging 環境設定
- `.env.prd` - Production 環境設定

## 👀 更多資源

- [Astro 文檔](https://docs.astro.build)
- [Vue.js 文檔](https://vuejs.org)
- [Pinia 文檔](https://pinia.vuejs.org)
- [TailwindCSS 文檔](https://tailwindcss.com)
