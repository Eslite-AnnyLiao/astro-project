import { reactive } from 'vue';
import { breakpoints } from '../constants/breakpoint';

// 檢查是否在瀏覽器環境
const isClient = typeof window !== 'undefined';

/**
 * @reactive {object} screenState 原 window-resize 核心功能
 */
const screenState = reactive({
  width: isClient ? window.innerWidth : 1920,
  height: isClient ? window.innerHeight : 1080,
  isMobileSize: false,
  isDesktopSize: false,
  isExtraSmallSize: false,
  isSmallSize: false,
  isMediumSize: false,
  isLargeSize: false,
  isExtraLargeSize: false,
  updateSize() {
    if (!isClient) return;
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobileSize = this.width < breakpoints.large;
    this.isDesktopSize = this.width >= breakpoints.large;
    this.isExtraSmallSize = this.width < breakpoints.small;
    this.isSmallSize = this.width < breakpoints.medium && this.width >= breakpoints.small;
    this.isMediumSize = this.width < breakpoints.large && this.width >= breakpoints.medium;
    this.isLargeSize = this.width < breakpoints.extraLarge && this.width >= breakpoints.large;
    this.isExtraLargeSize = this.width >= breakpoints.extraLarge;
  },
});

// 起始先執行一次（只在客戶端）
if (isClient) {
  screenState.updateSize();
}

// window.addEventListener('resize', () => screenState.updateSize());
export default screenState;
