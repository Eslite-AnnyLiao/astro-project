import plugin from 'tailwindcss/plugin';

/**
 * 通用工具類插件
 * 
 * 提供常用的組合工具類，避免重複撰寫常見的樣式組合
 * 
 * 使用方式：
 * - text-pointer: 指針游標 + 禁止選取
 * - absolute-center: 絕對定位居中
 * - flex-center-all: Flex 完全居中
 */
export const commonUtilsPlugin = plugin(({ addUtilities }) => {
  // 常用組合工具類
  addUtilities({
    '.text-pointer': {
      cursor: 'pointer',
      userSelect: 'none',
    },
    '.absolute-center': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '.flex-center-all': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
});