import { createHead } from '@unhead/vue';
import type { PluginContext } from '@/types/plugin';

export default ({ app }: PluginContext) => {
  const head = createHead();

  app.use(head);
};