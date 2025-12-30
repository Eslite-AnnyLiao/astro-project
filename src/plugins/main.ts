import type { PluginContext } from '@/types/plugin';
import head from '@/plugins/head';
import VueDOMPurifyHTML from '@/plugins/VueDomPurigyHtml';
import vueLazyload from '@/plugins/vueLazyload';
import '@/plugins/day';


const plugins = [head, VueDOMPurifyHTML, vueLazyload];

export const addPlugins = async (context: PluginContext) => {
  // console.log(`[isbot] main ${isBot()}`);
  plugins.forEach((plugin) => (plugin ? plugin(context) : null));
};
