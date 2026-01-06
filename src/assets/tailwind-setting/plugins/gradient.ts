import plugin from 'tailwindcss/plugin';
import { flattenColors } from '../shared';

/**
 * 漸變背景插件
 * 
 * 使用方式：
 * - gradient-v-red-to-blue: 垂直漸變（紅到藍）
 * - gradient-h-green-to-yellow: 水平漸變（綠到黃）
 * - gradient-r-purple-to-pink: 徑向漸變（紫到粉）
 */
export const gradientPlugin = plugin(({ addUtilities, theme }) => {
  const colors = theme('colors') as Record<string, any>;
  const flatColors = flattenColors(colors);
  
  const utilities: Record<string, any> = {};

  // 生成所有可能的漸變組合
  Object.keys(flatColors).forEach(fromColor => {
    Object.keys(flatColors).forEach(toColor => {
      if (fromColor !== toColor) {
        const fromHex = flatColors[fromColor];
        const toHex = flatColors[toColor];
        
        // 垂直漸變
        utilities[`.gradient-v-${fromColor}-to-${toColor}`] = {
          backgroundImage: `linear-gradient(to bottom, ${fromHex}, ${toHex})`,
          backgroundColor: fromHex,
        };
        
        // 水平漸變
        utilities[`.gradient-h-${fromColor}-to-${toColor}`] = {
          backgroundImage: `linear-gradient(to right, ${fromHex}, ${toHex})`,
          backgroundColor: fromHex,
        };
        
        // 徑向漸變
        utilities[`.gradient-r-${fromColor}-to-${toColor}`] = {
          backgroundImage: `radial-gradient(ellipse at center, ${fromHex}, ${toHex})`,
          backgroundColor: fromHex,
        };
      }
    });
  });

  addUtilities(utilities);
});