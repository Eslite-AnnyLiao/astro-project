import type { PluginContext } from '@/types/plugin';
import head from '@/plugins/head';
import VueDOMPurifyHTML from '@/plugins/vueDomPurigyHtml';
import vue3Lazyload from '@/plugins/vue3Lazyload';
import '@/plugins/day';
import axiosPlugin from '@/plugins/axios';
import windowResize from './window-resize';

const plugins = [axiosPlugin, head, VueDOMPurifyHTML, vue3Lazyload, windowResize];

export const addPlugins = async (context: PluginContext) => {
  // console.log(`[isbot] main ${isBot()}`);
  plugins.forEach((plugin) => (plugin ? plugin(context) : null));
};
