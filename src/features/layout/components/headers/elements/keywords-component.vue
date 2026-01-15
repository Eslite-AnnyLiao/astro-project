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
import { computed, ref, toRefs } from 'vue';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';
import homePageAdFormatter from '@/shared/helpers/ad/home-page-2024-formatter';
import { homePageADMappingEnumWithNewIndex } from '@/shared/constants/ad/homepage-ad-type';
import { isFunction } from '@/shared/helpers/data-process';

defineOptions({ name: 'KeywordsComponent' });
const props = defineProps({
  sticky: { type: Boolean, default: false },
  initialData: { type: Object, default: null },
});
const { sticky } = toRefs(props);
const keywordRef = ref(null);

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

// 直接從 initialData 讀取資料
const list = computed(() => getFormattedData('B003')?.items || []);

/** @const {number} containerWidth 外框寬度 */
const containerWidth = ref(700);

// 在 SSR 時直接計算可顯示的項目
const rewriteList = computed(() => {
  const avgWidth = { en: 8, cn: 14, padding: 22 };
  const result = list.value.reduce(
    (acc: { count: number; remainingWidth: number }, item: { alt: string }) => {
      if (acc.remainingWidth > 0) {
        const itemWidth = Array.from(item.alt).reduce(
          (sum, char) => sum + (char.match(/[\u4e00-\u9fa5\u3400-\u4DBF]/) ? avgWidth.cn : avgWidth.en),
          avgWidth.padding
        );

        if (acc.remainingWidth - itemWidth >= 0) {
          acc.remainingWidth -= itemWidth;
          acc.count += 1;
        }
      }
      return acc;
    },
    { count: 0, remainingWidth: containerWidth.value },
  );

  return list.value.filter((_: any, index: number) => index < result.count) || [];
});

const hasKeywords = computed(() => rewriteList.value.length > 0);
</script>

<style scoped>
.keywords li {
  @apply px-[10px] whitespace-pre leading-4 my-1 text-center no-underline border-l border-l-solid border-l-gray-200 first:border-l-0 first:ml-[1px] first:pl-0;
}
</style>
