import type { App } from 'vue';
import { createPinia } from 'pinia';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { SwiperSlide } from 'swiper/vue';
import VSwiper from '@/components/global-components/v-swiper.vue';


export default (app: App) => {
  /**
   * VueDOMPurifyHTML
   */
  app.use(VueDOMPurifyHTML, {
    default: {
      // whitelists - 允許的標籤和屬性
      ADD_TAGS: ['iframe'], // 允許 iframe 標籤
      ADD_ATTR: ['allow', 'frameborder', 'allowtransparency', 'allowfullscreen'],
      // 允許的屬性
    },
  });

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
  app.component('Swiper', VSwiper);
  app.component('SwiperSlide', SwiperSlide);
};
