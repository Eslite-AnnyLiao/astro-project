import type { App } from 'vue';
import { createPinia } from 'pinia';
import { SwiperSlide } from 'swiper/vue';
// import VSwiper from '@/components/global-components/v-swiper.vue';
import { addPlugins } from '@/shared/plugins/main';


export default async (app: App) => {
  /**
   * pinia
   */
  const pinia = createPinia();
  // allow pinia store use globalProperties
  pinia.use(({ app, store }) => (store.$app = app.config.globalProperties));
  // 先 use(pinia)，install auths plugin 時執行 verifyTokenAndInitUser 才能使用 pinia store。
  app.use(pinia);

  /**
   * Swiper
   */
  // app.component('Swiper', VSwiper);
  app.component('SwiperSlide', SwiperSlide);

  /**
   * Plugins
   */
  const pluginContext: Record<string, any> = {};
  await addPlugins({ pluginContext, app, pinia });
};
