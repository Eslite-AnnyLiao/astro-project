<template>
  <vue-swiper ref="swiperRef" :modules="swiperModules" v-bind="{ ...composedSwiperOption }" class="w-full">
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

<script setup>
import { computed, ref } from 'vue';
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

const props = defineProps({
  // v-on 除外(ex. @slideChange)
  options: { type: Object, default: () => ({}) },
  totalSlides: { type: Number, default: 0 },
  needThumbs: { type: Boolean, default: false },
});

const swiperRef = ref(null);

const composedSwiperOption = computed(() => ({ ...globalOption, ...props.options }));
const emptySlides = computed(() => {
  if (!props.options.loopFillGroupWithBlank) return [];
  if (!props.totalSlides) return [];
  const groupLength = props.options.slidesPerView;
  const lastGroupLength = props.totalSlides % groupLength;
  if (!lastGroupLength) return [];
  return repeat('', groupLength - lastGroupLength);
});
const swiperModules = computed(() => {
  const base = [Navigation, Pagination, Autoplay];
  if (props.options.freeMode) base.push(FreeMode);
  if (props.needThumbs) base.push(Thumbs);
  return base;
});

const getSwiperInstance = () => {
  // swiper element
  // return this.$refs.swiperRef?.swiper || null;
  // swiper/vue
  console.log(swiperRef.value?.$el.swiper);
  return swiperRef.value?.$el.swiper || null;
};
const initSwiperInstance = () => {
  // (swiper element) 當 init = false，手動執行 initialize，產出 swiperRef.swiper
  // this.$refs.swiperRef.initialize();
  // (swiper/vue) init
  swiperRef.value?.$el.swiper.init();
};

defineOptions({
  name: 'VSwiper',
  inheritAttrs: true,
});
</script>
