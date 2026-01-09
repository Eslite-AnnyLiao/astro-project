import type { PluginContext } from '../types/plugin';
import head from './head';
import VueDOMPurifyHTML from './vueDomPurigyHtml';
import vue3Lazyload from './vue3Lazyload';
import './day';
import axiosPlugin from './axios';
import windowResize from './windowResize';

const plugins = [axiosPlugin, head, VueDOMPurifyHTML, vue3Lazyload, windowResize];

export const addPlugins = async (context: PluginContext) => {
  // console.log(`[isbot] main ${isBot()}`);
  plugins.forEach((plugin) => (plugin ? plugin(context) : null));
};
