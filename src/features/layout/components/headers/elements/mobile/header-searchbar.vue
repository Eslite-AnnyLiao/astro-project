<template>
  <div class="searchbar">
    <router-link-usage id="logo" :link="getLogo.link || '/'" :title="getLogo.alt || '誠品線上'" class="logo">
      <img width="32" height="32" :title="getLogo.alt || '誠品線上'" src="/images/eslite-logo-icon-32.svg" />
    </router-link-usage>
    <form ref="searchFormRef" method="get" action="/Search">
      <div class="input-wrapper">
        <i class="icon" />
        <input
          type="text"
          placeholder="請輸入關鍵字"
          autocomplete="off"
          aria-label="搜尋"
          name="query"
          data-test-id="searchbar-input-mobile"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StaticSearchBar',
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeAd2024Store } from '@/shared/stores/home-ad-2024';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';

const homeAd2024Store = useHomeAd2024Store();
const { getLogo } = storeToRefs(homeAd2024Store);
</script>

<style scoped>
.searchbar {
  @apply px-4 py-3 flex;
  background-color: theme('colors.white');
}

.logo {
  @apply w-8 mr-3 flex items-center;
}

form {
  width: calc(100% - 36px);
}

.input-wrapper {
  @apply w-full h-9 bg-white px-4 py-2 rounded-lg relative flex;
  border: 1px solid theme('colors.gray-200');
}
.input-wrapper i {
  @apply w-[18px] h-[18px] absolute left-[10px] top-[50%];
  transform: translateY(-50%);
  pointer-events: none;
  background-image: url('/images/icons/search-md.svg');
}
.input-wrapper input {
  @apply w-full rounded-lg flex-grow outline-none border-none pl-6 text-[14px];
  color: theme('colors.gray-400');
  &:focue {
    outline: none;
    color: theme('colors.gray-900');
  }
}

input::placeholder {
  color: theme('colors.gray-400');
}
</style>
