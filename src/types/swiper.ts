import { type Ref } from 'vue';

export interface SwiperConfigOptions {
  containerClass?: string;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  custom?: Record<string, any>;
}

export interface SwiperBreakpoint {
  [key: number]: {
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    slidesPerGroup?: number;
  };
}

export interface SwiperNavigationConfig {
  nextEl: string;
  prevEl: string;
}

export interface SwiperPaginationConfig {
  el: string;
  clickable: boolean;
}

export interface SwiperInstanceMethods {
  getInstance: () => any;
  initInstance: () => void;
  destroyInstance: () => void;
  handleReady: () => void;
  handleClick: () => void;
  handleSlideChange?: (swiper: any) => void;
  updateThumbs?: (mainSwiperRef: Ref<any>, thumbsSwiperRef: Ref<any>) => void;
}

export interface VSwiperExposed {
  swiperPresets: {
    basic: () => any;
    responsive: (containerClass?: string) => any;
    centered: (containerClass?: string) => any;
    thumbs: (containerClass?: string) => any;
    multiRow: (slidesPerView: number, spaceBetween?: number) => any;
  };
  commonBreakpoints: SwiperBreakpoint;
  swiperRef: Ref<any>;
}