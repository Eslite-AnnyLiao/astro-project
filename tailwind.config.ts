import type { Config } from 'tailwindcss';
import defaultColors from './src/assets/tailwind-setting/theme/colors';
import { fontFamily, fontSize, fontVariantNumeric, notoFontPlugin } from './src/assets/tailwind-setting/fonts';
import { whiteList } from './src/assets/tailwind-setting/theme/core-plugins-whiteList';
import { content } from './src/assets/tailwind-setting/content';
import { allPlugins } from './src/assets/tailwind-setting/plugins';
import { spacing } from './src/assets/tailwind-setting/extend/spacing';
import { zIndex } from './src/assets/tailwind-setting/extend/z-index';
// import { generateGrid } from './src/helper/tailwind';

const config: Config = {
  content,
  corePlugins: whiteList,
  theme: {
    colors: defaultColors,
    fontFamily,
    // 基礎斷點 (Tailwind 預設 + xs + max)
    screens: {
      xs: '414px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      max: '1600px',
    },
    extend: {
      fontSize: fontSize as any,
      fontVariantNumeric,
      spacing,
      // screens 擴展斷點由 screensGeneratorPlugin 自動生成
      zIndex,
      // maxWidth: {
      //   'container-sm': '100%',
      //   'container-md': 'calc(768px - 30px)',
      //   'container-lg': 'calc(960px - 30px)',
      //   'container-xl': 'calc(1272px - 30px)',
      // },
      // ...generateGrid(24),
    },
  },
  plugins: [notoFontPlugin, ...allPlugins],
};

export default config;
