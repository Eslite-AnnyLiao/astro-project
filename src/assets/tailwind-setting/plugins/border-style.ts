import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';
import { flattenColors } from '../shared';

/**
 * 邊框樣式簡寫插件
 * 
 * 使用方式：
 * - border-all-solid: 四邊實線邊框
 * - border-t-dashed: 上邊虛線邊框
 * - border-r-solid-gray-400: 右邊實線灰色邊框
 */

const directions = {
  all: ['top', 'right', 'bottom', 'left'],
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  x: ['left', 'right'],
  y: ['top', 'bottom'],
};

const borderStyles = ['solid', 'dashed', 'dotted', 'double'];

export const borderStylePlugin = plugin(({ addUtilities, theme, e }) => {
  const newUtilities: Record<string, CSSRuleObject> = {};

  const colors = theme('colors') as Record<string, string | Record<string, string>>;
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
    });
  });

  addUtilities(newUtilities);
});