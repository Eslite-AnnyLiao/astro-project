<template>
  <vue-swiper ref="swiperRef" :modules="swiperModules" v-bind="{ ...composedSwiperOption }" class="w-full">
    <slot></slot>
    <swiper-slide v-for="(emptyItem, index) in emptySlides" :key="`empty-${index}`"></swiper-slide>
    <template #container-end>
      <slot name="button-prev"></slot>
      <slot name="button-next"></slot>
      <slot name="pagination"></slot>
      <slot name="scrollbar"></slot>
    </template>
  </vue-swiper>
</template>

<script lang="ts">
export default {
  name: 'VSwiper',
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { repeat } from 'ramda';
import { computed, ref, type Ref, type ComputedRef } from 'vue';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper as VueSwiper } from 'swiper/vue';
import { getSwiperGlobalOptions } from '@/features/swiper/helpers/swiper';
import type { 
  SwiperConfigOptions, 
  SwiperBreakpoint,
  SwiperNavigationConfig,
  SwiperPaginationConfig,
  VSwiperExposed
} from '@/features/swiper/types/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// 內建配置工廠函數
const createNavigation = (containerClass?: string): SwiperNavigationConfig => {
  const selector = containerClass ? `.${containerClass}` : '';
  return {
    nextEl: `${selector} .swiper-button-next`,
    prevEl: `${selector} .swiper-button-prev`
  };
};

const createPagination = (containerClass?: string): SwiperPaginationConfig => {
  const selector = containerClass ? `.${containerClass}` : '';
  return {
    el: `${selector} .swiper-pagination`,
    clickable: true
  };
};

// 常用響應式斷點
const commonBreakpoints: SwiperBreakpoint = {
  576: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1280: { slidesPerView: 5 }
};

// 基礎配置
const baseSwiperOptions = {
  init: true,
  loop: true,
  autoplay: true,
  slidesPerView: 1,
  spaceBetween: 0
};

// 配置工廠函數
const createSwiperConfig = (options: SwiperConfigOptions = {}) => {
  const globalOptions = getSwiperGlobalOptions();
  const config: any = { ...globalOptions };

  if (options.navigation !== false) {
    config.navigation = createNavigation(options.containerClass);
  }

  if (options.pagination) {
    config.pagination = createPagination(options.containerClass);
  }

  if (options.autoplay !== false) {
    config.autoplay = true;
  }

  if (options.loop !== false) {
    config.loop = true;
  }

  if (options.custom) {
    Object.assign(config, options.custom);
  }

  return config;
};

// 預設配置模板
const swiperPresets = {
  basic: () => createSwiperConfig({
    navigation: true,
    pagination: true,
    custom: baseSwiperOptions
  }),

  responsive: (containerClass?: string) => createSwiperConfig({
    containerClass,
    navigation: true,
    pagination: true,
    custom: {
      ...baseSwiperOptions,
      breakpoints: commonBreakpoints
    }
  }),

  centered: (containerClass?: string) => createSwiperConfig({
    containerClass,
    navigation: true,
    custom: {
      loop: true,
      spaceBetween: 4,
      centeredSlides: true,
      slidesPerView: 1.2
    }
  }),

  thumbs: (containerClass?: string) => createSwiperConfig({
    containerClass,
    navigation: true,
    custom: {
      loop: true,
      loopedSlides: 5,
      spaceBetween: 10
    }
  }),

  multiRow: (slidesPerView: number, spaceBetween: number = 12) => createSwiperConfig({
    navigation: true,
    custom: {
      slidesPerView,
      spaceBetween,
      slidesPerGroup: 1,
      loop: true
    }
  })
};

// 定義 props 介面
interface VSliderProps {
  options?: Record<string, any>;
  totalSlides?: number;
  needThumbs?: boolean;
  preset?: 'basic' | 'responsive' | 'centered' | 'thumbs' | 'multiRow';
  presetOptions?: {
    containerClass?: string;
    slidesPerView?: number;
    spaceBetween?: number;
  };
}

const props = withDefaults(defineProps<VSliderProps>(), {
  options: () => ({}),
  totalSlides: 0,
  needThumbs: false,
});

const swiperRef: Ref<InstanceType<typeof VueSwiper> | null> = ref(null);

const composedSwiperOption: ComputedRef<any> = computed(() => {
  let baseConfig: any;
  
  // 使用 preset 或自定義配置
  if (props.preset) {
    const presetOptions = props.presetOptions || {};
    switch (props.preset) {
      case 'basic':
        baseConfig = swiperPresets.basic();
        break;
      case 'responsive':
        baseConfig = swiperPresets.responsive(presetOptions.containerClass);
        break;
      case 'centered':
        baseConfig = swiperPresets.centered(presetOptions.containerClass);
        break;
      case 'thumbs':
        baseConfig = swiperPresets.thumbs(presetOptions.containerClass);
        break;
      case 'multiRow':
        baseConfig = swiperPresets.multiRow(
          presetOptions.slidesPerView || 1,
          presetOptions.spaceBetween || 12
        );
        break;
      default:
        baseConfig = createSwiperConfig({
          navigation: true,
          pagination: true,
        });
    }
  } else {
    // 使用默認配置
    const configOptions: SwiperConfigOptions = {
      navigation: true,
      pagination: true,
    };
    baseConfig = createSwiperConfig(configOptions);
  }
  
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

// 導出預設配置和斷點，供其他組件使用
defineExpose<VSwiperExposed>({
  swiperPresets,
  commonBreakpoints,
  swiperRef
});
</script>
