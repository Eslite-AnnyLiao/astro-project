import { getSwiperGlobalOptions } from '@/helper/swiper';
import type { 
  SwiperConfigOptions, 
  SwiperBreakpoint,
  SwiperNavigationConfig,
  SwiperPaginationConfig 
} from '@/types/swiper';

/**
 * 創建導航配置
 */
export const createNavigation = (containerClass?: string): SwiperNavigationConfig => {
  const selector = containerClass ? `.${containerClass}` : '';
  return {
    nextEl: `${selector} .swiper-button-next`,
    prevEl: `${selector} .swiper-button-prev`
  };
};

/**
 * 創建分頁配置
 */
export const createPagination = (containerClass?: string): SwiperPaginationConfig => {
  const selector = containerClass ? `.${containerClass}` : '';
  return {
    el: `${selector} .swiper-pagination`,
    clickable: true
  };
};

/**
 * 常用響應式斷點
 */
export const commonBreakpoints: SwiperBreakpoint = {
  576: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1280: { slidesPerView: 5 }
};

/**
 * 基礎 Swiper 配置
 */
export const baseSwiperOptions = {
  init: true,
  loop: true,
  autoplay: true,
  slidesPerView: 1,
  spaceBetween: 0
};

/**
 * Swiper 配置工廠函數
 */
export const createSwiperConfig = (options: SwiperConfigOptions = {}) => {
  const globalOptions = getSwiperGlobalOptions();
  const config: any = { ...globalOptions };

  // 添加導航
  if (options.navigation !== false) {
    config.navigation = createNavigation(options.containerClass);
  }

  // 添加分頁
  if (options.pagination) {
    config.pagination = createPagination(options.containerClass);
  }

  // 添加自動播放
  if (options.autoplay !== false) {
    config.autoplay = true;
  }

  // 添加循環
  if (options.loop !== false) {
    config.loop = true;
  }

  // 合併自定義配置
  if (options.custom) {
    Object.assign(config, options.custom);
  }

  return config;
};

/**
 * 預設配置模板
 */
export const swiperPresets = {
  // 基礎輪播
  basic: () => createSwiperConfig({
    navigation: true,
    pagination: true,
    custom: baseSwiperOptions
  }),

  // RWD 輪播
  responsive: (containerClass?: string) => createSwiperConfig({
    containerClass,
    navigation: true,
    pagination: true,
    custom: {
      ...baseSwiperOptions,
      breakpoints: commonBreakpoints
    }
  }),

  // 居中顯示
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

  // 縮略圖模式
  thumbs: (containerClass?: string) => createSwiperConfig({
    containerClass,
    navigation: true,
    custom: {
      loop: true,
      loopedSlides: 5,
      spaceBetween: 10
    }
  }),

  // 多列顯示
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