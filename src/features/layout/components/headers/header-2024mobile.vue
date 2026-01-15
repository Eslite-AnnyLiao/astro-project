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
import { ref, computed } from 'vue';
import HeaderSearchBar from './elements/mobile/header-searchbar.vue';
import homePageAdFormatter from '@/shared/helpers/ad/home-page-2024-formatter';
import { homePageADMappingEnumWithNewIndex } from '@/shared/constants/ad/homepage-ad-type';
import { isFunction } from '@/shared/helpers/data-process';

// 接收從 Astro 傳入的預取資料
const props = defineProps<{
  initialData?: Record<string, any> | null;
}>();

const height = ref(60);

// app download
const showComponent = ref(false);

// 從 initialData 格式化資料的輔助函數
const getFormattedData = (slotType: string) => {
  if (!props.initialData?.[slotType]) return null;
  const data = props.initialData[slotType];
  const adContent = data?.content || data;
  const formatter = homePageAdFormatter[`format${homePageADMappingEnumWithNewIndex[slotType]}` as keyof typeof homePageAdFormatter];
  if (adContent && isFunction(formatter)) {
    try {
      return formatter(adContent);
    } catch {
      return null;
    }
  }
  return null;
};

// 直接從 initialData 讀取資料（SSR 時可用）
const bigSlide = computed(() => getFormattedData('B007') || {});
const logo = computed(() => getFormattedData('B002') || {});
const eightLinks = computed(() => getFormattedData('A001') || {});

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
