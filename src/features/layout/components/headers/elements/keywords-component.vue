<template>
  <div v-if="!sticky" ref="keywordRef" class="w-full">
    <ul v-if="hasKeywords" class="keywords left w-full pb-0 mb-0 text-13px flex items-center overflow-hidden">
      <li v-for="(row, index) in rewriteList" :key="`header-keyword-${index}`">
        <RouterLinkUsage :id="`header-keyword-${index + 1}`" :link="row.link" class="whitespace-pre no-underline text-gray-700 hover:text-gold-500">{{ row.alt }}</RouterLinkUsage>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, toRefs, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeAd2024Store } from '@/shared/stores/home-ad-2024';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';

defineOptions({ name: 'KeywordsComponent' });
const props = defineProps({ sticky: { type: Boolean, default: false } });
const { sticky } = toRefs(props);
const keywordRef = ref(null);

const homeAdStore = useHomeAd2024Store();
const { getSearchKeywords } = storeToRefs(homeAdStore);
const list = computed(() => getSearchKeywords.value?.items || []);

/** @const {number} averageCharWidthInPixels 預設每字佔用寬度(px) */
/** @const {number} containerWidth 外框寬度 */
const containerWidth = ref(700);
const rewriteList = ref([]);

// 估算
function calculateItems() {
  const avgWidth = { en: 8, cn: 14, padding: 22 };
  const result = list.value.reduce(
    (acc, item) => {
      if (acc.remainingWidth > 0) {
        const itemWidth = Array.from(item.alt).reduce((sum, char) => sum + (char.match(/[\u4e00-\u9fa5\u3400-\u4DBF]/) ? avgWidth.cn : avgWidth.en), avgWidth.padding);

        if (acc.remainingWidth - itemWidth >= 0) {
          acc.remainingWidth -= itemWidth;
          acc.count += 1;
        }
      }
      return acc;
    },
    { count: 0, remainingWidth: containerWidth.value },
  );

  // console.log(`在 ${containerWidth.value}px 寬的外框中，可以完整顯示 ${result.count} 個項目。`);
  rewriteList.value = list?.value?.filter((val, index) => index < result.count) || [];
}

const hasKeywords = computed(() => rewriteList.value.length > 0);

onMounted(() => {
  watch(list, calculateItems, { immediate: true });
});
</script>

<style scoped>
.keywords li {
  @apply px-[10px] whitespace-pre leading-4 my-1 text-center no-underline border-l border-l-solid border-l-gray-200 first:border-l-0 first:ml-[1px] first:pl-0;
}
</style>
