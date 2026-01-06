import plugin from 'tailwindcss/plugin';

/**
 * 手機螢幕比例計算
 */
const mobileRate = (width: number): number => {
  return 1080 / width;
};

/**
 * 手機適配插件
 * 
 * 使用方式：
 * - mobile-[375]: 375px 螢幕適配
 * - mobile-[414]: 414px 螢幕適配
 */
export const mobileAdaptPlugin = plugin(({ matchUtilities }) => {
  matchUtilities(
    {
      'mobile': (value: string) => {
        const width = Number(value);
        const rate = mobileRate(width);
        return {
          '--mobile-rate': rate.toString(),
          transform: `scale(${1 / rate})`,
          transformOrigin: 'top left',
        };
      },
    },
    {
      values: {
        '375': '375',
        '414': '414', 
        '390': '390',
        '428': '428',
      },
    }
  );
});