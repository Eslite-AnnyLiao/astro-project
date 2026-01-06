import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * 居中定位插件
 * 
 * 使用方式：
 * - center-v: 垂直居中
 * - center-h: 水平居中
 * - center-both: 完全居中
 */
export const centerPlugin = plugin(({ addUtilities }) => {
  const centerUtilities: Record<string, CSSRuleObject> = {
    '.center-v': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '.center-h': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '.center-both': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  addUtilities(centerUtilities);
});