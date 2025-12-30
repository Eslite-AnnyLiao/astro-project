import type { App } from 'vue';
import type { Pinia } from 'pinia';

export interface PluginContext {
  pluginContext: Record<string, any>;
  app: App;
  pinia: Pinia;
}