<template>
  <vue-swiper ref="swiperRef" :modules="swiperModules" v-bind="{ ...composedSwiperOption }" class="swiperDefault">
    <slot></slot>
    <swiper-slide v-for="(emptyItem, index) in emptySlides" :key="`empty-${index}`"></swiper-slide>
    <div slot="container-end">
      <slot name="button-prev"></slot>
      <slot name="button-next"></slot>
      <slot name="pagination"></slot>
      <slot name="scrollbar"></slot>
    </div>
  </vue-swiper>
</template>

<script>
import { repeat } from 'ramda';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper as VueSwiper } from 'swiper/vue';
import { getSwiperGlobalOptions } from '@/helper/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const globalOption = getSwiperGlobalOptions();

const props = {
  // v-on 除外(ex. @slideChange)
  options: { type: Object, default: () => ({}) },
  totalSlides: { type: Number, default: 0 },
  needThumbs: { type: Boolean, default: false },
};

export default {
  name: 'VSwiper',
  components: { VueSwiper },
  inheritAttrs: true,
  props,
  computed: {
    composedSwiperOption() {
      return { ...globalOption, ...this.options };
    },
    // 實現 swiperjs v9.4.1 的 loopFillGroupWithBlank
    emptySlides() {
      if (!this.options.loopFillGroupWithBlank) return [];
      if (!this.totalSlides) return [];
      const groupLength = this.options.slidesPerView;
      const lastGroupLength = this.totalSlides % groupLength;
      if (!lastGroupLength) return [];
      return repeat('', groupLength - lastGroupLength);
    },
    swiperModules() {
      const base = [Navigation, Pagination, Autoplay];
      if (this.options.freeMode) base.push(FreeMode);
      if (this.needThumbs) base.push(Thumbs);
      return base;
    },
  },
  methods: {
    getSwiperInstance() {
      // swiper element
      // return this.$refs.swiperRef?.swiper || null;
      // swiper/vue
      return this.$refs.swiperRef?.$el.swiper || null;
    },
    initSwiperInstance() {
      // (swiper element) 當 init = false，手動執行 initialize，產出 swiperRef.swiper
      // this.$refs.swiperRef.initialize();
      // (swiper/vue) init
      this.$refs.swiperRef.$el.swiper.init();
    },
  },
};
</script>
