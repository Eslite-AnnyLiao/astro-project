import plugin from 'tailwindcss/plugin';

/**
 * 動態生成擴展斷點的插件
 * 基於基礎斷點自動生成 max-width 和範圍斷點
 */

// 基礎斷點定義 (與 theme.screens 對應)
const baseScreens = {
  xs: 414,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1280,
  max: 1600,
};

// 生成擴展斷點
function generateExtendedScreens() {
  const screens: Record<string, any> = {};

  const breakpoints = Object.entries(baseScreens);

  // 生成 max-width 斷點
  breakpoints.forEach(([key, value]) => {
    if (key !== 'max') {
      screens[`max-${key}`] = { max: `${value - 1}px` };
    }
  });

  // 生成範圍斷點 (相鄰斷點間)
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const [currentKey, currentValue] = breakpoints[i];
    const [nextKey, nextValue] = breakpoints[i + 1];
    
    if (currentKey !== 'max' && nextKey !== 'max') {
      screens[`${currentKey}-to-${nextKey}`] = {
        min: `${currentValue}px`,
        max: `${nextValue - 1}px`
      };
    }
  }

  // 生成特殊範圍斷點
  screens['sm-to-lg'] = { min: `${baseScreens.sm}px`, max: `${baseScreens.lg - 1}px` };
  screens['sm-to-xl'] = { min: `${baseScreens.sm}px`, max: `${baseScreens.xl - 1}px` };
  screens['md-to-xl'] = { min: `${baseScreens.md}px`, max: `${baseScreens.xl - 1}px` };
  screens['xs-to-md'] = { min: `${baseScreens.xs}px`, max: `${baseScreens.md - 1}px` };
  screens['xs-to-lg'] = { min: `${baseScreens.xs}px`, max: `${baseScreens.lg - 1}px` };
  screens['xs-to-xl'] = { min: `${baseScreens.xs}px`, max: `${baseScreens.xl - 1}px` };
  screens['lg-to-max'] = { min: `${baseScreens.lg}px`, max: `${baseScreens.max}px` };
  screens['xl-to-max'] = { min: `${baseScreens.xl}px`, max: `${baseScreens.max}px` };

  return screens;
}

export const screensGeneratorPlugin = plugin(
  function() {
    // 這個插件主要用於擴展 theme，不添加額外的 utilities
  },
  {
    theme: {
      extend: {
        screens: generateExtendedScreens()
      }
    }
  }
);