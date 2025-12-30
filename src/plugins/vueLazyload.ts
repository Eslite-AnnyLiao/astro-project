import VueLazyLoad from 'vue-lazyload';
import type { PluginContext } from '@/types/plugin';
import { productFail, loadingLargeImg } from '@/constant/images-path';

export default ({ app }: PluginContext) => {
  // function getlazyConfigByEnv() {
  //   if (checkIsImageSnapshotTest()) {
  //     return { preLoad: 10 };
  //   }
  //   return {};
  // }

  app.use(VueLazyLoad, {
    preLoad: 1.3,
    error: productFail.src,
    loading: loadingLargeImg.src,
    // attempt: 1,
    // ...getlazyConfigByEnv(),
  });
};
