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