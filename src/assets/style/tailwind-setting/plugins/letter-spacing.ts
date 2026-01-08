import plugin from 'tailwindcss/plugin';
import { pxToRem } from '../shared';

/**
 * 字間距插件
 * 
 * 使用方式：
 * - letter-spacing-[2]: 2px 字間距（自動轉 rem）
 * - letter-spacing-[1.5]: 1.5px 字間距
 */
export const letterSpacingPlugin = plugin(({ matchUtilities }) => {
  matchUtilities(
    {
      'letter-spacing': (value: string) => ({
        letterSpacing: pxToRem(Number(value)),
      }),
    },
    {
      values: {},
      type: 'number',
    }
  );
});