import plugin from 'tailwindcss/plugin';

/**
 * 游標指針插件
 * 
 * 使用方式：
 * - cursor-pointer-select-none: 指針游標 + 禁止選取
 */
export const cursorPointerPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.cursor-pointer-select-none': {
      cursor: 'pointer',
      userSelect: 'none',
    },
  });
});