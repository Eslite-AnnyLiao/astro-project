import plugin from 'tailwindcss/plugin';

/**
 * Border Radius Utilities Plugin
 * 
 * 轉換 bootstrap-base/mixins/_border-radius.scss 的 mixins
 * 提供 Bootstrap 風格的邊角圓角工具類別
 */

export const borderRadiusUtilsPlugin = plugin(({ addUtilities }) => {
  const utilities = {
    // ec-border-end-radius mixin → utilities
    '.border-end-radius-0': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    '.border-end-radius': {
      borderTopRightRadius: '0.375rem',
      borderBottomRightRadius: '0.375rem',
    },
    '.border-end-radius-sm': {
      borderTopRightRadius: '0.25rem',
      borderBottomRightRadius: '0.25rem',
    },
    '.border-end-radius-lg': {
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
    },

    // ec-border-start-radius mixin → utilities
    '.border-start-radius-0': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '.border-start-radius': {
      borderTopLeftRadius: '0.375rem',
      borderBottomLeftRadius: '0.375rem',
    },
    '.border-start-radius-sm': {
      borderTopLeftRadius: '0.25rem',
      borderBottomLeftRadius: '0.25rem',
    },
    '.border-start-radius-lg': {
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
    },

    // Complete border radius utilities
    '.border-radius-0': {
      borderRadius: '0',
    },
    '.border-radius': {
      borderRadius: '0.375rem',
    },
    '.border-radius-sm': {
      borderRadius: '0.25rem',
    },
    '.border-radius-lg': {
      borderRadius: '0.5rem',
    },
    '.border-radius-xl': {
      borderRadius: '0.75rem',
    },
  }

  addUtilities(utilities)
});