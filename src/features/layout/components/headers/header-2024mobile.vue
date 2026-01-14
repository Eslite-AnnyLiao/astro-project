<template>
  <div ref="headerFixedWrapperRef" class="header header-mobile" data-test-id="header">
    <!-- download app -->
    <div v-if="showComponent" title="APP下載" class="download-app">
      <img src="/images/app-icon.webp" alt="誠品線上" />
      <div class="txt">下載APP首登，現領$100優惠券！</div>
      <div class="gold"><span>立即體驗</span></div>
    </div>

    <!-- search -->
    <HeaderSearchBar />
  </div>
  <div class="nbsp" :style="`height: ${height}px`">&nbsp;</div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onBeforeMount, onMounted } from 'vue';
import { useHomeAd2024Store } from '@/shared/stores/home-ad-2024';
import { homePageADTypeEnum } from '@/shared/constants/ad/homepage-ad-type';
import HeaderSearchBar from './elements/mobile/header-searchbar.vue';

const height = ref(60);

// store
const homeAdStore = useHomeAd2024Store();
const { fetchHomeAd } = homeAdStore;


// app download
const showComponent = ref(false);


onMounted(() => {
  // B007, B002, A001
  fetchHomeAd([homePageADTypeEnum.bigSlide, homePageADTypeEnum.logo, homePageADTypeEnum.eightLinks]);
});

</script>

<script lang="ts">
export default { name: 'HeaderWith2024Mobile' };
</script>

<style scoped>
.header.header-mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.download-app {
  @apply h-[52px] px-4 py-[6px] text-[13px] leading-[18px] font-normal grid gap-2 no-underline;
  grid-template-columns: auto 1fr auto;
  color: theme('colors.gray-900');
  background-color: theme('colors.white');
  img {
    @apply w-10 h-10 rounded-lg;
  }
  .txt {
    @apply grid items-center overflow-hidden;
  }
  .gold {
    @apply grid items-center;
    color: theme('colors.gold-500');
  }

  &:hover .gold span,
  &:active .gold span {
    border-bottom: 1px solid theme('colors.gold-500');
  }
}
</style>
