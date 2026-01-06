// tailwind/plugins/borderStyleShorthand.js
import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';

const directions = {
  all: ['top', 'right', 'bottom', 'left'],
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  x: ['left', 'right'],
  y: ['top', 'bottom'],
};

/** @const {string[]} border-Styles 常用的 border style */
const borderStyles = ['solid', 'dashed', 'dotted', 'double'];

/**
 * borderStyleShorthand 自定義 border 組合以避免 border 太長串
 * @sample `border-all-solid` => border border-solid
 * @sample `border-r-solid-gray-400` => border-r border-solid
 * @sample [無效] `border-r-solid-[#c9b27d]` => border-r border-solid border-[#c9b27d]
 * @sample [無效] `border-r-solid-[var(--very-light-pink-two)]` => border-r border-solid border-[var(--very-light-pink-two)]
 */
export const borderStyleShorthand = plugin(({ addUtilities, theme, e }) => {
  const newUtilities: Record<string, CSSRuleObject> = {};

  const colors = theme('colors') as Record<string, string | Record<string, string>>;

  const flattenColors = (obj: Record<string, string | Record<string, string>>, prefix = ''): Record<string, string> => {
    const result: Record<string, string> = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        result[`${prefix}${key}`] = value;
      } else {
        Object.assign(result, flattenColors(value, `${prefix}${key}-`));
      }
    });
    return result;
  };

  const flatColors = flattenColors(colors);

  Object.entries(directions).forEach(([dirKey, sides]) => {
    borderStyles.forEach((style) => {
      // 無色彩版本
      const className = `border-${dirKey}-${style}`;
      const base: CSSRuleObject = {};
      sides.forEach((side) => {
        (base as any)[`border-${side}-style`] = style;
        (base as any)[`border-${side}-width`] = '1px';
      });
      newUtilities[`.${e(className)}`] = base;

      // 有主題顏色版本
      Object.entries(flatColors).forEach(([colorKey, colorValue]) => {
        const colorClass = `border-${dirKey}-${style}-${colorKey}`;
        const styled = { ...base };
        sides.forEach((side) => ((styled as any)[`border-${side}-color`] = colorValue));
        newUtilities[`.${e(colorClass)}`] = styled;
      });

      // 支援 inline color 例如 [#c9b27d]、[var(--xxx)]
      // 這類無法事先 addUtilities，但 tailwind 會處理，只要結構合法即可使用
    });
  });

  addUtilities(newUtilities);
});

/** @const notoFont 原scss notoSerifFont (noto-[500], noto-[bold] ) */
export const notoFont = plugin(({ matchUtilities }) => {
  matchUtilities(
    {
      noto: (value) => ({
        fontFamily: '"Noto Sans TC"',
        fontStyle: 'normal',
        fontWeight: value,
      }),
    },
    {
      values: {},
    },
  );
});

/**
 * Tailwind CSS Plugin: tailwindPluginDesignTokensToCssVars
 *
 * 自動將 theme.extend 中的部分設定輸出為 :root 上的 CSS 變數。
 * 用於 overwrite-style-utilities.css 這種共用檔案以避免 @apply 疊加 @apply 的錯誤，並保持與 Tailwind config 內的設定值同步。
 *
 * 目前支援的內容：
 * - spacing.15 → --spacing-15
 * - zIndex.100, zIndex.200 → --z-100, --z-200
 * - maxWidth.container-{sm,md,lg,xl} → --container-sm, --container-md, --container-lg, --container-xl
 * - fontSize.* → --font-size-{key}, 並輸出對應的 lineHeight (--font-line-{key}) 及 letterSpacing (--font-track-{key})
 * - fontVariantNumeric.* → --fvn-{key} (以 flag = 1 方式輸出可用性)
 * - colors.* → --color-{key} (單一顏色) 或 --color-{key}-{shade} (色彩系統)
 *
 * @plugin tailwindPluginDesignTokensToCssVars
 * @param {import('tailwindcss/plugin').PluginAPI} helpers - Tailwind 提供的工具 API
 *   - addBase: 新增 base 樣式
 *   - theme: 讀取 Tailwind config 內的設定值
 *
 * @example
 * // 在 tailwind.config.js 中註冊
 * plugins: [tailwindPluginDesignTokensToCssVars]
 *
 * // 在 CSS/元件內使用
 * .box {
 *   max-width: var(--container-lg);
 *   z-index: var(--z-200);
 *   font-size: var(--font-size-lg);
 *   line-height: var(--font-line-lg);
 *   color: var(--color-eslite-red-700);
 *   background-color: var(--color-white);
 * }
 */
export const tailwindPluginDesignTokensToCssVars = plugin(function ({ addBase, theme }) {
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
