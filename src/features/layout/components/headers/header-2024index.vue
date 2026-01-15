<template>
  <div
    class="header-fixed-wrapper header w-full"
    :class="[isForPages ? 'ec-container' : 'index-container', { 'mx-auto': !isForPages }, { 'p-0': isForPages }]"
    data-test-id="header"
  >
    <!-- header:top banner -->
    <div v-if="haveTopBanner && !scrollMode" class="top-banner w-full p-0 mb-3">
      <RouterLinkUsage
        id="header-top"
        :link="topBannrImageSource.link"
        :title="topBannrImageSource.alt"
        target="_blank"
        data-test-id="top-banner"
        class="w-full h-auto max-w-full max-h-[90px] block"
        ><img
          :src="topBannrImageSource.image"
          :alt="topBannrImageSource.alt"
          class="w-full h-auto max-w-full max-h-[90px] block rounded-lg"
          fetchpriority="high"
      /></RouterLinkUsage>
    </div>

    <div id="header-hidden-anchor"></div>

    <!-- header:top link -->
    <div class="top-link links w-full p-0 mb-3 flex justify-between h-[30px]">
      <ul class="left flex">
        <div class="w-full p-0">
          <div
            class="fraud-prevention h-8 px-2 text-13px leading-[18px] font-normal inline-flex rounded-lg bg-camel-50"
          >
            <a
              href="https://events.eslite.com/2025/250123-fraud/index.html"
              alt="防詐3要訣：不聽信、不操作、掛斷電話"
              title="防詐3要訣：不聽信、不操作、掛斷電話"
              class="flex items-center text-gold-500 no-underline"
              ><img
                src="/images/Microphone.svg"
                width="24"
                height="24"
                alt="防詐3要訣：不聽信、不操作、掛斷電話"
              />防詐3要訣：不聽信、不操作、掛斷電話 <span class="ml-1 text-gold-300">(詳)</span></a
            >
          </div>
        </div>
      </ul>
      <HeaderLinks class="right" />
    </div>

    <!-- header: top-eslite-header -->
    <div
      id="top-eslite-header"
      ref="headerFixedWrapperRef"
      class="w-full mx-auto bg-white"
      :class="{ sticky: scrollMode }"
      data-test-id="top-eslite-header"
    >
      <div class="fixed-box w-full mx-auto" :class="{ 'for-pages': isForPages }">
        <!-- header: logo -->
        <div class="left">
          <RouterLinkUsage
            id="logo"
            :link="getLogo.link || '/'"
            :title="getLogo.alt || '誠品線上'"
            data-test-id="header-logo"
          >
            <img v-if="getLogo.image" class="logo w-full" :src="getLogo.image" />
            <div v-else class="logo w-full">
              <div class="loading logo-loading mode-122x32 rounded-lg"></div>
            </div>
          </RouterLinkUsage>
        </div>

        <!-- header: search bar & keywordList -->
        <div class="center">
          <HeaderSearchBar />
          <KeywordsComponent :sticky="scrollMode" :initial-data="initialData" />
        </div>
        <!-- header: small banner -->
        <div class="right links flex justify-between">
          <RouterLinkUsage
            v-if="smallBannrImageSource.image"
            id="header-sb"
            class="header-small-banner"
            :link="smallBannrImageSource.link"
            :title="smallBannrImageSource.alt"
            data-test-id="small-banner"
            ><img :src="smallBannrImageSource.image" class="w-full max-w-[250px] h-[80px] rounded-lg"
          /></RouterLinkUsage>
          <div v-else class="loading logo-loading mode-122x32 w-full max-w-[250px] h-[80px] rounded-lg"></div>
          <HeaderLinks class="header-fixed-mode hidden" />
        </div>
      </div>
    </div>

    <div class="h-3"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'HeaderWith2024Index',
};
</script>
<script setup lang="ts">
import { ref, toRefs, computed } from 'vue';

import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';
import HeaderLinks from './elements/header-links.vue';
import KeywordsComponent from './elements/keywords-component.vue';
import HeaderSearchBar from './elements/header-search-bar.vue';
import homePageAdFormatter from '@/shared/helpers/ad/home-page-2024-formatter';
import { homePageADMappingEnumWithNewIndex } from '@/shared/constants/ad/homepage-ad-type';
import { isFunction } from '@/shared/helpers/data-process';

const props = defineProps({
  scrollMode: { type: Boolean, default: false },
  isForPages: { type: Boolean, default: false },
  initialData: { type: Object, default: null },
});
const { scrollMode, isForPages } = toRefs(props);

const isLoaded = ref(true);
const headerFixedWrapperRef = ref(null);

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
const getLogo = computed(() => getFormattedData('B002') || {});
const topBannrImageSource = computed(() => getFormattedData('B001') || {});
const smallBannrImageSource = computed(() => getFormattedData('B004') || {});
const haveTopBanner = computed(() => !!topBannrImageSource.value?.image);
</script>

<style scoped>
@import '@/assets/style/tailwind-2024index.css';


.header-fixed-wrapper .top-link .left li:first-child {
  @apply pl-0 border-l-0;
}

.header-fixed-wrapper .top-link .left li:last-child {
  @apply pr-0;
}

.header-fixed-wrapper .links ul {
  @apply h-[30px] pb-0 mb-0;
}

.header-fixed-wrapper .links li a {
  @apply text-sm font-medium text-gray-700;
}

.header-fixed-wrapper .links span.red {
  @apply text-pink;
}

.header-fixed-wrapper .links li.gold {
  @apply text-sm font-medium pr-0 text-gold-500;
}

.header-fixed-wrapper .links li.gold + li {
  @apply border-l-0;
}

#top-eslite-header > div,
#top-eslite-header > div > div {
  @apply border-0;
}

#top-eslite-header .fixed-box {
  @apply w-[1280px] p-0 flex gap-6 justify-between bg-white;
}

#top-eslite-header .fixed-box.for-pages {
  @apply w-auto gap-8;
}

#top-eslite-header .fixed-box.for-pages > .left {
  @apply xl:max-w-[250px] max-w-[165px];
}

#top-eslite-header .fixed-box.for-pages > .left .logo {
  @apply xl:w-[250px] w-[165px] h-fit;
}

#top-eslite-header .fixed-box.for-pages > .center {
  @apply xl:max-w-[710px] xl:w-[710px] max-w-[560px];
}

#top-eslite-header .fixed-box.for-pages > .right {
  @apply xl:max-w-[250px] max-w-[187px];
}

#top-eslite-header .fixed-box > .left {
  @apply w-[250px] h-[66px] flex text-left flex-auto;
}

#top-eslite-header .fixed-box > .left a {
  @apply flex text-center;
}

#top-eslite-header .fixed-box > .left .logo {
  @apply w-[250px] max-h-[66px] mt-0;
}

#top-eslite-header .fixed-box > .center {
  @apply w-[700px] flex-auto;
}

#top-eslite-header .fixed-box > .right {
  @apply w-[250px] flex-auto text-right;
}

#top-eslite-header.sticky {
  @apply w-full max-w-full h-[60px] px-0 py-[12px] flex gap-4 fixed top-0 left-0 right-0 z-100;
  box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
}

#top-eslite-header.sticky .header-fixed-mode {
  @apply flex;
}

#top-eslite-header.sticky .fixed-box > div {
  @apply text-sm font-medium grid items-center;
}

#top-eslite-header.sticky .fixed-box > .left {
  @apply w-[140px] h-[36px];
}

#top-eslite-header.sticky .fixed-box > .left .logo {
  @apply w-[140px] h-[36px];
}

#top-eslite-header.sticky .fixed-box > .center {
  @apply w-[406px];
}

#top-eslite-header.sticky .fixed-box > .center .keywords {
  @apply hidden;
}

#top-eslite-header.sticky .fixed-box > .right {
  @apply w-[662px] h-[36px] justify-start;
}

#top-eslite-header.sticky .fixed-box > .right .loading {
  @apply hidden;
}

#top-eslite-header.sticky .fixed-box > .right .header-small-banner {
  @apply hidden;
}

#top-eslite-header.sticky .fixed-box > .right .header-small-banner img {
  @apply w-full max-h-full rounded-lg;
}

#top-eslite-header.sticky .fixed-box > .right li {
  @apply my-1 px-1;
}
</style>
