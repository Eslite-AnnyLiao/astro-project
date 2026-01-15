<template>
  <div id="header-search-bar">
    <form class="ec-input-group flex pb-[10px]" method="get" action="/Search">
      <input
        class="ec-form-control h-[40px]"
        type="text"
        name="query"
        aria-label="搜尋"
        placeholder="請輸入關鍵字"
        data-test-id="static-searchbar-input"
        autocomplete="off"
      />
      <button ref="searchButton" class="ec-btn ec-btn-outline-secondary mx-0 px-0" type="submit">
        <Icon name="fa-search" size="sm" />
      </button>
      <!-- auto complete-->
      <!-- <search-bar-auto-complete
        v-if="isShowRecommendList"
        :display="isShowRecommends"
        :list="items"
        :value="hoverIndex"
        :keyword="searchKeyword"
        :source-type="keywordType"
        @select="selectRecommendedWords"
        @overItem="over"
      ></search-bar-auto-complete> -->
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderSearchBar',
};
</script>
<script setup lang="ts">
import Icon from '@/shared/components/Icon.vue';
</script>

<style scoped>
input.ec-form-control {
  border-right: none;
  border-color: theme('colors.gray-200');
  border-radius: 8px;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  padding-left: 1rem;
  color: theme('colors.gray-400');
  &:focus {
    outline: none;
    box-shadow: none;
    color: theme('colors.gray-900');
  }
}
input::placeholder {
  color: theme('colors.gray-400');
  font-size: 14px;
}
button {
  background-color: theme('colors.gold-500');
  @apply border-none rounded-r-lg;

  &:focus,
  &:hover,
  &:active,
  &:focus-visible {
    background-color: theme('colors.gold-400');
    border-color: theme('colors.gold-400');
  }
}
button i {
  color: theme('colors.white');
  padding-left: 18px;
  padding-right: 18px;
}
</style>
