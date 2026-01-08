import screenState from '@/services/ScreenManager';
import type { PluginContext } from '@/types/plugin';

export default ({ app }: PluginContext) => {
  app.config.globalProperties.$screen = screenState;
  app.provide('$screen', screenState);

  // 只在客戶端添加 resize 監聽器
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => screenState.updateSize());
  }
};
