import plugin from 'tailwindcss/plugin';

/**
 * Design Tokens 到 CSS 變數插件
 * 
 * 自動將 theme.extend 中的部分設定輸出為 :root 上的 CSS 變數。
 * 用於 overwrite-style-utilities.css 這種共用檔案以避免 @apply 疊加 @apply 的錯誤，
 * 並保持與 Tailwind config 內的設定值同步。
 * 
 * 支援的內容：
 * - spacing.15 → --spacing-15
 * - zIndex.100, zIndex.200 → --z-100, --z-200
 * - maxWidth.container-{sm,md,lg,xl} → --container-sm, --container-md, --container-lg, --container-xl
 * - fontSize.* → --font-size-{key}, 並輸出對應的 lineHeight (--font-line-{key}) 及 letterSpacing (--font-track-{key})
 * - fontVariantNumeric.* → --fvn-{key} (以 flag = 1 方式輸出可用性)
 * - colors.* → --color-{key} (單一顏色) 或 --color-{key}-{shade} (色彩系統)
 * 
 * 使用範例：
 * ```css
 * .box {
 *   max-width: var(--container-lg);
 *   z-index: var(--z-200);
 *   font-size: var(--font-size-lg);
 *   line-height: var(--font-line-lg);
 *   color: var(--color-eslite-red-700);
 *   background-color: var(--color-white);
 * }
 * ```
 */
export const designTokensPlugin = plugin(function ({ addBase, theme }) {
  const root: Record<string, string> = {};

  // helper: safely assign CSS variable if value exists
  const setVar = (name: string, value: any) => {
    if (value !== undefined && value !== null) root[name] = String(value);
  };

  // ---- spacing (only extended keys we care about) ----
  setVar('--spacing-15', theme('spacing.15')); // 15px

  // ---- z-index (only extended keys we care about) ----
  setVar('--z-100', theme('zIndex.100'));
  setVar('--z-200', theme('zIndex.200'));

  // ---- max-width containers (extended) ----
  const containers = ['container-sm', 'container-md', 'container-lg', 'container-xl'];
  containers.forEach((k) => {
    const v = theme(`maxWidth.${k}`);
    if (v) setVar(`--${k}`, v);
  });

  // ---- font-size (extended) ----
  // tailwind fontSize can be a string or [size, { lineHeight, letterSpacing, ... }]
  const fontSizeConfig = theme('fontSize');
  if (fontSizeConfig && typeof fontSizeConfig === 'object') {
    Object.keys(fontSizeConfig).forEach((key) => {
      const val = fontSizeConfig[key];
      if (Array.isArray(val)) {
        const [size, meta] = val;
        setVar(`--font-size-${key}`, size);
        if (meta && typeof meta === 'object') {
          if (meta.lineHeight) setVar(`--font-line-${key}`, meta.lineHeight);
          if (meta.letterSpacing) setVar(`--font-track-${key}`, meta.letterSpacing);
        }
      } else {
        setVar(`--font-size-${key}`, val);
      }
    });
  }

  // ---- font-variant-numeric (extended) ----
  // If your project uses custom numeric variants, expose flags for convenience
  const fvn = theme('fontVariantNumeric');
  if (fvn && typeof fvn === 'object') {
    Object.keys(fvn).forEach((key) => {
      // Store as a simple flag value to indicate availability
      setVar(`--fvn-${key}`, 1);
    });
  }

  // ---- colors ----
  // Convert all colors from theme to CSS variables
  const colors = theme('colors');
  if (colors && typeof colors === 'object') {
    Object.keys(colors).forEach((colorKey) => {
      const colorValue = colors[colorKey];
      if (typeof colorValue === 'string') {
        // Simple color like 'white: #FFFFFF'
        setVar(`--color-${colorKey}`, colorValue);
      } else if (typeof colorValue === 'object') {
        // Nested color object like 'red: { 50: #..., 100: #... }'
        Object.keys(colorValue).forEach((shade) => {
          setVar(`--color-${colorKey}-${shade}`, colorValue[shade]);
        });
      }
    });
  }

  addBase({ ':root': root });
});