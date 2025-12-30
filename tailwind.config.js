import defaultColors from './src/assets/tailwind-setting/colors';
import { fontFamily, fontSize, fontVariantNumeric } from './src/assets/tailwind-setting/fonts';
import { whiteList } from './src/assets/tailwind-setting/corePluginsWhiteList';
import { content } from './src/assets/tailwind-setting/content';
import { borderStyleShorthand, notoFont, tailwindPluginDesignTokensToCssVars } from './src/assets/tailwind-setting/plugins';
// import { generateGrid } from './src/helper/tailwind';
/** @type {import('tailwindcss').Config} */

export default {
  content,
  corePlugins: whiteList,
  theme: {
    colors: defaultColors,
    fontFamily,
    screens: {
      xs: '414px',
      'max-xs': { max: '413px' },
      sm: '576px',
      'max-sm': { max: '575px' },
      md: '768px',
      'max-md': { max: '767px' },
      lg: '992px',
      'max-lg': { max: '991px' },
      xl: '1280px',
      'max-xl': { max: '1279px' },
      max: '1600px',
      'min-lg': { min: '992px' },
      // mediaMax, mediaMin
      'xs-to-sm': { min: '414px', max: '575px' },
      'sm-to-md': { min: '576px', max: '767px' },
      'md-to-lg': { min: '768px', max: '991px' },
      'lg-to-xl': { min: '992px', max: '1279px' },
      'sm-to-lg': { min: '576px', max: '991px' },
      // mediaRange
      'sm-to-xl': { min: '576px', max: '1279px' },
      'md-to-xl': { min: '768px', max: '1279px' },
      'xs-to-md': { min: '414px', max: '767px' },
      'xs-to-lg': { min: '414px', max: '991px' },
      'xs-to-xl': { min: '414px', max: '1279px' },
      'lg-to-max': { min: '992px', max: '1600px' },
      'xl-to-max': { min: '1280px', max: '1600px' },
    },
    extend: {
      fontSize,
      fontVariantNumeric,
      spacing: {
        15: '15px',
      },
      zIndex: {
        'back-to-top': '3',
        'menubar-desktop': '50',
        'bottom-bar': '200',
        'menubar-mobile': '300',
        'alert-modal': '1051',
        loading: '3000',
        modal: '9998',
        100: '100',
        200: '200',
      },
      maxWidth: {
        'container-sm': '100%',
        'container-md': 'calc(768px - 30px)',
        'container-lg': 'calc(960px - 30px)',
        'container-xl': 'calc(1272px - 30px)',
      },
      // ...generateGrid(24),
    },
  },
  plugins: [borderStyleShorthand, notoFont, tailwindPluginDesignTokensToCssVars],
};
