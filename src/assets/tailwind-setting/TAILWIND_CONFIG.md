# Tailwind CSS 配置說明

## 概述

本專案採用模組化的 Tailwind CSS 配置架構，將 SCSS 系統完全轉換為 Tailwind 插件和工具類別系統。

## 檔案結構

```
src/assets/tailwind-setting/
├── shared.ts                    # 共用工具函數
├── content.ts                   # 內容掃描配置
├── fonts.ts                     # 字體相關配置
├── theme/
│   ├── colors.ts               # 顏色系統
│   └── core-plugins-whiteList.ts  # 啟用的核心插件
├── extend/
│   ├── spacing.ts              # 間距擴展
│   └── z-index.ts              # Z-index 層級
└── plugins/
    ├── index.ts                # 插件統一導出
    ├── border-style.ts         # 邊框樣式
    ├── center.ts               # 居中工具
    ├── common-utils.ts         # 通用工具
    ├── cursor-pointer.ts       # 游標樣式
    ├── design-tokens.ts        # 設計令牌
    ├── gradient.ts             # 漸層背景
    ├── hover-link.ts           # 連結懸停
    ├── letter-spacing.ts       # 字母間距
    ├── mobile-adapt.ts         # 移動端適配
    ├── rem-utils.ts            # REM 工具
    └── screens-generator.ts    # 斷點生成器
```

## 核心配置

### 基礎斷點 (theme.screens)

```typescript
screens: {
  xs: '414px',   // 超小螢幕
  sm: '576px',   // 小螢幕
  md: '768px',   // 中等螢幕  
  lg: '992px',   // 大螢幕
  xl: '1280px',  // 超大螢幕
  max: '1600px', // 最大寬度
}
```

### 擴展斷點 (screensGeneratorPlugin)

自動生成的斷點類別：

- **Max-width 斷點**: `max-xs`, `max-sm`, `max-md`, `max-lg`, `max-xl`
- **範圍斷點**: `xs-to-sm`, `sm-to-md`, `md-to-lg`, `lg-to-xl`
- **特殊範圍**: `sm-to-lg`, `xs-to-xl`, `lg-to-max` 等

### 顏色系統

完整的設計系統顏色，包含：
- Eslite 品牌色系
- 功能性顏色 (錯誤、警告、成功)
- 中性色系 (灰階)
- 語義化顏色命名

## 自定義插件

### 1. Border Style Plugin (`border-style.ts`)

快速邊框樣式設定：

```html
<div class="border-all-solid">四邊實線</div>
<div class="border-t-dashed">上邊虛線</div>
<div class="border-r-solid-red-500">右邊紅色實線</div>
```

### 2. Center Plugin (`center.ts`)

居中對齊工具：

```html
<div class="center-v">垂直置中</div>
<div class="center-h">水平置中</div>
<div class="center-both">完全置中</div>
```

### 3. Gradient Plugin (`gradient.ts`)

自動生成所有顏色組合的漸層：

```html
<div class="gradient-v-red-500-to-blue-500">垂直紅到藍</div>
<div class="gradient-h-green-600-to-yellow-500">水平綠到黃</div>
<div class="gradient-r-purple-500-to-pink-500">徑向紫到粉</div>
```

### 4. Design Tokens Plugin (`design-tokens.ts`)

將主題設定輸出為 CSS 變數：

```css
:root {
  --spacing-15: 0.9375rem;
  --z-100: 100;
  --color-red-500: #FC0619;
  --font-size-lg: 1.125rem;
}
```

### 5. Mobile Adapt Plugin (`mobile-adapt.ts`)

移動端比例縮放工具：

```html
<div class="mobile-rate-80">手機版 80% 縮放</div>
<div class="mobile-rate-90">手機版 90% 縮放</div>
```

### 6. REM Utils Plugin (`rem-utils.ts`)

PX 轉 REM 工具類別：

```html
<div class="rem-20">1.25rem (20px)</div>
<div class="rem-24">1.5rem (24px)</div>
```

### 7. Hover Link Plugin (`hover-link.ts`)

連結懸停效果：

```html
<a class="hover-link-red-500">紅色懸停</a>
<a class="hover-link-blue-600">藍色懸停</a>
```

### 8. Letter Spacing Plugin (`letter-spacing.ts`)

字母間距工具：

```html
<div class="tracking-2">0.02em 間距</div>
<div class="tracking-4">0.04em 間距</div>
```

### 9. Common Utils Plugin (`common-utils.ts`)

常用工具類別：

```html
<div class="abs-center">絕對定位置中</div>
<div class="full-cover">完整覆蓋</div>
```

## 核心插件白名單

透過 `core-plugins-whiteList.ts` 控制啟用的 Tailwind 核心功能：

- ✅ 啟用: 佈局、顏色、字體、間距、漸層等
- ❌ 停用: 未使用的功能以減小 bundle 大小

## 內容掃描配置

```typescript
content: [
  './src/pages/**/*.{vue,js,astro}',
  './src/components/**/*.{vue,js,astro}',
  './src/layouts/**/*.{vue,js,astro}',
  './src/stories/**/*.{js,jsx,ts,tsx}',
  './src/stories/**/*.vue',
]
```

### 排除規則

- 生產環境排除 sample 頁面
- 排除已下架功能 (gift-ai, event-embedded)

## 共用工具 (`shared.ts`)

### pxToRem 函數
```typescript
pxToRem(16) // → '1rem'
```

### flattenColors 函數
```typescript
flattenColors({
  red: { 500: '#FC0619', 600: '#E60012' }
}) // → { 'red-500': '#FC0619', 'red-600': '#E60012' }
```

## 使用建議

1. **響應式設計**: 使用擴展斷點進行精確控制
2. **顏色一致性**: 使用設計系統中的語義化顏色
3. **性能優化**: 透過 content 配置確保 CSS purging 正常運作
4. **維護性**: 新增工具類別時優先考慮插件化

## 遷移說明

本配置已完全取代原有的 SCSS 系統：

- ❌ ~~SCSS mixins~~ → ✅ Tailwind plugins
- ❌ ~~SCSS functions~~ → ✅ Utility classes  
- ❌ ~~SCSS variables~~ → ✅ Theme tokens

所有原始功能都已保留並優化為更現代的 Tailwind 解決方案。