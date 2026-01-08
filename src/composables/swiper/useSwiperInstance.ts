import { ref, type Ref } from 'vue';
import type { SwiperInstanceMethods } from '@/types/swiper';

/**
 * Swiper 實例管理 composable
 */
export const useSwiperInstance = (): SwiperInstanceMethods & {
  swiperRef: Ref<any>;
} => {
  const swiperRef = ref<any>(null);

  /**
   * 獲取 Swiper 實例
   */
  const getInstance = () => {
    return swiperRef.value?.$el?.swiper || null;
  };

  /**
   * 初始化 Swiper 實例
   */
  const initInstance = () => {
    const instance = getInstance();
    if (instance) {
      instance.init();
    }
  };

  /**
   * 銷毀 Swiper 實例
   */
  const destroyInstance = () => {
    const instance = getInstance();
    if (instance) {
      instance.destroy(true, true);
    }
  };

  /**
   * Swiper 就緒事件
   */
  const handleReady = () => {
    console.log('Swiper ready');
  };

  /**
   * 點擊滑塊事件
   */
  const handleClick = () => {
    console.log('Swiper slide clicked');
  };

  /**
   * 滑塊變化事件
   */
  const handleSlideChange = (swiper: any) => {
    // 重置所有滑塊的縮放
    if (swiper?.slides) {
      swiper.slides.forEach((slide: HTMLElement) => {
        slide.style.transform = 'scale(0.9)';
      });
      
      // 設置當前滑塊的縮放
      if (swiper.slides[swiper.activeIndex]) {
        swiper.slides[swiper.activeIndex].style.transform = 'scale(1)';
      }
    }
  };

  /**
   * 更新縮略圖關聯
   */
  const updateThumbs = (mainSwiperRef: Ref<any>, thumbsSwiperRef: Ref<any>) => {
    const mainInstance = mainSwiperRef.value?.$el?.swiper;
    const thumbsInstance = thumbsSwiperRef.value?.$el?.swiper;
    
    if (mainInstance && thumbsInstance) {
      mainInstance.thumbs.swiper = thumbsInstance;
      mainInstance.thumbs.init();
      mainInstance.thumbs.update();
    }
  };

  return {
    swiperRef,
    getInstance,
    initInstance,
    destroyInstance,
    handleReady,
    handleClick,
    handleSlideChange,
    updateThumbs
  };
};