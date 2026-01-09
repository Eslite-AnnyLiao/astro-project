import VueDOMPurifyHTML from 'vue-dompurify-html';
import type { PluginContext } from '../types/plugin';

export default ({ app }: PluginContext) => {
  app.use(VueDOMPurifyHTML, {
    default: {
      // whitelists - 允許的標籤和屬性
      ADD_TAGS: ['iframe'], // 允許 iframe 標籤
      ADD_ATTR: ['allow', 'frameborder', 'allowtransparency', 'allowfullscreen'],
      // 允許的屬性
    },
  });
};
