# Astro Project

基於 Astro 的 Eslite EC Frontend 專案。

## 📁 專案結構

```text
/
├── public/                 # 靜態檔案
│   ├── favicon.svg
│   └── icomoon/           # icomoon 圖標字體檔案
├── src/
│   ├── assets/            # 資源檔案
│   │   └── style/        # 樣式系統
│   │       ├── layer/     # CSS 層級樣式
│   │       ├── tailwind-setting/  # Tailwind 配置
│   │       └── components/        # 元件專用樣式
│   ├── features/          # 功能模組 (Feature-based 架構)
│   ├── shared/           # 共用資源
│   │   ├── components/   # 共用 Vue/Astro 元件
│   │   ├── composables/  # Vue Composables
│   │   ├── plugins/      # 插件配置 (axios, pinia 等)
│   │   ├── services/     # 共用服務
│   │   ├── types/        # TypeScript 類型定義
│   │   └── constants/    # 常數定義
│   ├── layouts/          # Astro 版面配置
│   ├── pages/           # 頁面檔案
├── .env*                # 環境變數檔案
├── server.key           # SSL 私鑰 (本地開發)
├── server.crt           # SSL 憑證 (本地開發)
└── tailwind.config.ts   # Tailwind 配置檔案
```

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

# 或根據需要修改 .env 檔案中的 PUBLIC_API 設定
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
| `pnpm start:prd`          | Production 環境開發模式                          |

### 建置部署
| 指令                      | 說明                                             |
| :------------------------ | :----------------------------------------------- |
| `pnpm build`              | 建置正式版本到 `./dist/`                         |
| `pnpm build:lab`          | 建置 Lab 環境版本                               |
| `pnpm build:stg`          | 建置 Staging 環境版本                           |
| `pnpm build:prd`          | 建置 Production 環境版本                        |

### 預覽
| 指令                      | 說明                                             |
| :------------------------ | :----------------------------------------------- |
| `pnpm preview`            | 本地預覽建置結果                                 |
| `pnpm preview:lab`        | 預覽 Lab 環境建置結果                           |
| `pnpm preview:stg`        | 預覽 Staging 環境建置結果                       |
| `pnpm preview:prd`        | 預覽 Production 環境建置結果                    |

## 🔧 技術架構

- **框架**: Astro 5.x + Vue 3
- **狀態管理**: Pinia 2.x
- **樣式**: TailwindCSS 3.x + SCSS
- **設計系統**: EC Button System + 統一色彩規範
- **圖標系統**: icomoon 字體圖標
- **HTTP 客戶端**: Axios (增強版 axios)
- **建置工具**: Vite + Legacy 瀏覽器支援
- **開發工具**: TypeScript, ESLint
- **安全防護**: DOMPurify (XSS 防護)
- **UI 組件**: Swiper, Vue3-Lazyload


## 🎨 設計系統

### EC Button System
專案使用統一的按鈕系統，所有按鈕都採用 `ec-btn` 類別：

```html
<!-- 基本按鈕 -->
<button class="ec-btn ec-btn-eslite-red">Eslite Red</button>
<button class="ec-btn ec-btn-secondary">Secondary</button>
<button class="ec-btn ec-btn-gold-500">Gold</button>

<!-- Outline 按鈕 -->
<button class="ec-btn ec-btn-outline-eslite-red">Outline Red</button>
<button class="ec-btn ec-btn-outline-secondary">Outline Secondary</button>

<!-- 尺寸變化 -->
<button class="ec-btn ec-btn-eslite-red ec-btn-lg">Large</button>
<button class="ec-btn ec-btn-eslite-red ec-btn-sm">Small</button>
<button class="ec-btn ec-btn-eslite-red ec-btn-block">Block</button>
```

### 色彩系統
專案使用統一的色彩規範，定義在 `src/assets/style/tailwind-setting/theme/colors.ts`：
- **Eslite 品牌色**: `eslite-red-*`, `eslite-green-*`
- **系統色**: `camel-*`, `gold-*`, `red-*`, `blue-*` 等
- **中性色**: `gray-*`, `white`, `black`

### 圖標系統
使用 icomoon 字體圖標，透過 `<Icon>` 元件使用：

```vue
<Icon name="heart" size="lg" color="#ff0000" />
<Icon name="cart" :size="'2rem'" />
<Icon name="settings" customClass="my-custom-style" />
```

## 🚀 功能特色

### Feature-based 架構
專案採用功能導向的模組化架構：
- 每個功能模組包含自己的 components、api、stores、types
- 共用資源放在 `shared/` 目錄
- 清晰的職責分離和代碼組織

### Astro + Vue 混合開發
- 使用 Astro 作為主框架，提供卓越的性能
- Vue 3 組件用於互動式功能
- 支援 SSG (靜態站點生成)

### 開發體驗優化
- TypeScript 全面支援
- Hot Module Replacement (HMR)
- HTTPS 本地開發環境
- 多環境配置支援

## 🌍 環境配置

專案支援多環境配置，透過不同的 `.env` 檔案：

- `.env` - 通用 API 路徑定義
- `.env.development` - 開發環境設定
- `.env.lab` - Lab 環境設定  
- `.env.stg` - Staging 環境設定
- `.env.prd` - Production 環境設定

## 📝 使用說明

### 範例頁面
專案包含完整的範例頁面，展示各種功能：
- `/sample/vue-demo` - Vue 組件示例
- `/sample/bootstrap-test` - Bootstrap 組件測試
- `/sample/icon-sample` - 圖標系統示例
- `/sample/swiper-test` - 輪播組件示例
- `/sample/pinia-test` - Pinia 狀態管理示例

### 開發 Vue 元件
```vue
<script setup lang="ts">
// 使用 Composition API
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <button class="ec-btn ec-btn-eslite-red" @click="count++">
      點擊: {{ count }}
    </button>
  </div>
</template>
```

### 開發 Astro 頁面
```astro
---
import Layout from '@/layouts/Layout.astro'
import Counter from '@/features/ui-testing/components/Counter.vue'
---

<Layout title="我的頁面">
  <main>
    <h1>歡迎使用 Astro + Vue</h1>
    <Counter client:load />
  </main>
</Layout>
```

## 👀 更多資源

- [Astro 文檔](https://docs.astro.build)
- [Vue.js 文檔](https://vuejs.org)
- [Pinia 文檔](https://pinia.vuejs.org)
- [TailwindCSS 文檔](https://tailwindcss.com)
