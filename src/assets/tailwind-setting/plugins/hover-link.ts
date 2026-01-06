import plugin from 'tailwindcss/plugin';
import { flattenColors } from '../shared';

/**
 * 懸停連結插件
 * 
 * 使用方式：
 * - hover-link-blue-to-red: 藍色連結，懸停變紅色
 * - hover-link-gray-500-to-black: 灰色連結，懸停變黑色
 */
export const hoverLinkPlugin = plugin(({ matchUtilities, theme }) => {
  const colors = theme('colors') as Record<string, any>;
  const flatColors = flattenColors(colors);

  matchUtilities(
    {
      'hover-link': (value: string) => {
        const [linkColor, hoverColor] = value.split('-to-');
        const linkColorValue = flatColors[linkColor] || linkColor;
        const hoverColorValue = flatColors[hoverColor] || hoverColor;
        
        return {
          cursor: 'pointer',
          userSelect: 'none',
          color: linkColorValue,
          '&:hover': {
            color: hoverColorValue,
            textDecoration: 'none',
          },
        };
      },
    },
    { values: {} }
  );
});