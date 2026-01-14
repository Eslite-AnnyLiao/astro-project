<template>
  <div>
    <eslite-header :is-for-pages="true" />
    <ul class="category-nav ec-container p-0 flex">
      <li class="z-20">
        <button type="button" class="border-none">全站分類</button>
        <MenuComponent :rwd-mode="true" class="submenu" />
      </li>
      <li v-for="item in navTabs" :key="`pages-header-nav-${item.alt}`" class="nav-links">
        <router-link-usage :link="item.link" :title="item.alt">{{ item.alt }}</router-link-usage>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PagesHeader2024Desktop',
};
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import MenuComponent from './elements/menu-component.vue';
import EsliteHeader from './header-2024index.vue';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';
import { homePageADTypeEnum } from '@/shared/constants/ad/homepage-ad-type';
import { useHomeAd2024Store } from '@/shared/stores/home-ad-2024';

const homeAdStore = useHomeAd2024Store();
const { fetchHomeAd } = homeAdStore;
const { getTopBanner, getHeaderSmallBanner, getSearchKeywords, getBigSlideTabs, getMenu } = storeToRefs(homeAdStore);

/**
 * top banner
 * @const {computed({})} topBannrImageSource 置頂 banner data
 */
const topBannrImageSource = computed(() => getTopBanner.value);

/**
 * header small banner
 * @const {computed({})} smallBannrImageSource header small banner data
 */
const smallBannrImageSource = computed(() => getHeaderSmallBanner.value);

const searchKeywords = computed(() => getSearchKeywords.value?.items || []);

const navTabs = computed(() => getBigSlideTabs.value?.items || []);
const menuData = computed(() => getMenu.value?.items || []);

onMounted(async () => {
  const defaultFace = [];

  if (Object.keys(topBannrImageSource.value).length === 0) {
    defaultFace.push(homePageADTypeEnum.topBanner);
  }
  if (searchKeywords.value.length === 0) {
    defaultFace.push(homePageADTypeEnum.searchKeywords);
  }
  if (Object.keys(smallBannrImageSource.value).length === 0) {
    defaultFace.push(homePageADTypeEnum.headerSmallBanner);
  }
  if (menuData.value.length === 0) {
    defaultFace.push(homePageADTypeEnum.menu);
  }
  if (navTabs.value.length === 0) {
    defaultFace.push(homePageADTypeEnum.bigSlideTabs);
  }
  if (defaultFace.length === 0) return false;
  await fetchHomeAd(defaultFace);
  return true;
});
</script>

<style scoped>
.category-nav {
  .nav-links a {
    @apply no-underline;
  }
  &:hover .nav-links a {
    @apply no-underline;
  }
  li {
    @apply relative;

    &:hover {
      > a:after,
      > button:after {
        @apply block h-1 w-full;
      }
      .submenu {
        @apply block;
      }
    }
    a {
      @apply text-gray-800 cursor-pointer;
    }
    > a,
    > button {
      @apply py-2 px-4 block after:content-[''] after:block after:h-1 after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-gray-900;
      &:after {
        transition: all 0.3s;
      }
    }
    &:not(:last-child) {
      @apply relative after:content-[''] after:block after:h-4 after:w-[1px] after:absolute after:right-0 after:top-3 after:bg-gray-200;
    }

    .submenu {
      @apply hidden absolute top-[100%] left-0 border border-solid border-gold-500 py-6 bg-white z-10 w-[212px];
    }
  }
}

.line {
  @apply border-t border-t-solid border-t-['#f0ebe1'];
}

.brand-img {
  @apply w-[40px] h-[40px];
}

.banner-img {
  @apply w-[250px] h-[80px];
}
</style>
