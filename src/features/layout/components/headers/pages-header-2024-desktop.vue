<template>
  <div>
    <eslite-header :is-for-pages="true" :initial-data="initialData" />
    <ul class="category-nav ec-container p-0 flex">
      <li class="z-20">
        <button type="button" class="border-none">全站分類</button>
        <MenuComponent :rwd-mode="true" :initial-data="initialData" class="submenu" />
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
import { computed } from 'vue';
import MenuComponent from './elements/menu-component.vue';
import EsliteHeader from './header-2024index.vue';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';
import homePageAdFormatter from '@/shared/helpers/ad/home-page-2024-formatter';
import { homePageADMappingEnumWithNewIndex } from '@/shared/constants/ad/homepage-ad-type';
import { isFunction } from '@/shared/helpers/data-process';

// 接收從 Astro 傳入的預取資料
const props = defineProps<{
  initialData?: Record<string, any> | null;
}>();

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
const topBannrImageSource = computed(() => getFormattedData('B001') || {});
const smallBannrImageSource = computed(() => getFormattedData('B004') || {});
const searchKeywords = computed(() => getFormattedData('B003')?.items || []);
const navTabs = computed(() => getFormattedData('B005')?.items || []);
const menuData = computed(() => getFormattedData('B006')?.items || []);
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
