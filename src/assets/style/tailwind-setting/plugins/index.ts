/**
 * Tailwind CSS 插件統一導出
 * 
 * 所有自定義插件都在這裡統一管理和導出
 * 讓 tailwind.config.ts 的導入更清晰簡潔
 */

// 先導入所有插件
import { borderStylePlugin } from './border-style';
import { centerPlugin } from './center';
import { commonUtilsPlugin } from './common-utils';
import { gradientPlugin } from './gradient';
import { cursorPointerPlugin } from './cursor-pointer';
import { letterSpacingPlugin } from './letter-spacing';
import { hoverLinkPlugin } from './hover-link';
import { remPlugin } from './rem-utils';
import { mobileAdaptPlugin } from './mobile-adapt';
import { designTokensPlugin } from './design-tokens';
import { screensGeneratorPlugin } from './screens-generator';
import { bootstrapComponentsPlugin } from './bootstrap-components';
import { borderRadiusUtilsPlugin } from './border-radius-utils';

/**
 * 所有插件的陣列導出
 * 可以直接展開到 tailwind.config.ts 的 plugins 陣列中
 */
export const allPlugins = [
  borderStylePlugin,
  designTokensPlugin,
  remPlugin,
  mobileAdaptPlugin,
  centerPlugin,
  gradientPlugin,
  cursorPointerPlugin,
  letterSpacingPlugin,
  hoverLinkPlugin,
  commonUtilsPlugin,
  screensGeneratorPlugin,
  bootstrapComponentsPlugin,
  borderRadiusUtilsPlugin,
];