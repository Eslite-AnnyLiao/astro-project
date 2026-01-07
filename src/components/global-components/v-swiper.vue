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

<script setup lang="ts">
import { repeat } from 'ramda';
import { computed, ref, type Ref, type ComputedRef } from 'vue';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper as VueSwiper } from 'swiper/vue';
import { createSwiperConfig } from '@/composables/useSwiper';
import type { SwiperConfigOptions } from '@/types/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// 定義 props 介面
interface VSliderProps {
  options?: Record<string, any>;
  totalSlides?: number;
  needThumbs?: boolean;
}

const props = withDefaults(defineProps<VSliderProps>(), {
  options: () => ({}),
  totalSlides: 0,
  needThumbs: false,
});

const swiperRef: Ref<InstanceType<typeof VueSwiper> | null> = ref(null);

const composedSwiperOption: ComputedRef<any> = computed(() => {
  const configOptions: SwiperConfigOptions = {
    navigation: true,
    pagination: true,
  };
  const baseConfig = createSwiperConfig(configOptions);
  return { ...baseConfig, ...props.options };
});
const emptySlides: ComputedRef<string[]> = computed(() => {
  // if (!props.options?.loopFillGroupWithBlank) return [];
  if (!props.totalSlides) return [];

  const groupLength = props.options?.slidesPerView as number;
  if (!groupLength || typeof groupLength !== 'number') return [];

  const lastGroupLength = props.totalSlides % groupLength;
  if (!lastGroupLength) return [];

  return repeat('', groupLength - lastGroupLength);
});
const swiperModules: ComputedRef<any[]> = computed(() => {
  const base: any[] = [Navigation, Pagination, Autoplay];
  if (props.options?.freeMode) base.push(FreeMode);
  if (props.needThumbs) base.push(Thumbs);
  return base;
});

defineOptions({
  name: 'VSwiper',
  inheritAttrs: true,
});
</script>
