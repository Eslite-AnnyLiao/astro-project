// import { checkIsImageSnapshotTest } from '@/helper/check-image-snapshot-test';

const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0);

export function getSwiperGlobalOptions() {
  return isTouchDevice()
    ? {}
    : {
        // 防止桌機 click 變成 swipe
        threshold: 20,
      };
}
