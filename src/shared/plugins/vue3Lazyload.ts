import VueLazyLoad from 'vue3-lazyload';
import type { PluginContext } from '../types/plugin';
import { productFail, loadingLargeImg } from '../constants/images-path';

export default ({ app }: PluginContext) => {
  // function getlazyConfigByEnv() {
  //   if (checkIsImageSnapshotTest()) {
  //     return { preLoad: 10 };
  //   }
  //   return {};
  // }

  app.use(VueLazyLoad, {
    // vue3-lazyload 正確的配置格式
    loading: loadingLargeImg,
    error: productFail,
    observerOptions: {
      rootMargin: '50px',
      threshold: 0.1
    },
    // 延遲時間
    delay: 300
  });
};
