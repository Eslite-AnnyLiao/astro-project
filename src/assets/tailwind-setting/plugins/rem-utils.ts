import plugin from 'tailwindcss/plugin';
import { pxToRem } from '../shared';

/**
 * Rem 工具插件
 * 
 * 使用方式：
 * - rem-[12]: 將 12px 轉換為 rem 值
 * - rem-[24]: 將 24px 轉換為 rem 值
 */
export const remPlugin = plugin(({ matchUtilities }) => {
  matchUtilities(
    {
      'rem': (value: string) => ({
        '--tw-numeric-value': pxToRem(Number(value)),
      }),
    },
    {
      values: {},
      type: 'number',
    }
  );
});