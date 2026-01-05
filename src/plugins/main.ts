import type { PluginContext } from '@/types/plugin';
import head from '@/plugins/head';
import VueDOMPurifyHTML from '@/plugins/vueDomPurigyHtml';
import vueLazyload from '@/plugins/vueLazyload';
import '@/plugins/day';
import axiosPlugins from '@/plugins/asiox';


const plugins = [axiosPlugins, head, VueDOMPurifyHTML, vueLazyload];

export const addPlugins = async (context: PluginContext) => {
  // console.log(`[isbot] main ${isBot()}`);
  plugins.forEach((plugin) => (plugin ? plugin(context) : null));
};
