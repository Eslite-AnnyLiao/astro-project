<template>
  <div class="menu" :class="{ invisible: menu.length <= 0 }">
    <div v-if="!rwdMode" class="title">全站分類</div>
    <div class="list" :class="{ 'rwd-mode': rwdMode }">
      <div
        v-for="(row, rowIndex) in menu"
        :key="`index-menu-${rowIndex}`"
        class="ec-row"
        :class="{ active: rowIndex === 999 }"
      >
        <div :id="`menu-l1-${rowIndex + 1}`" class="L1-left" @mouseenter="recordActiveRowIndex(rowIndex)">
          <template v-for="(item, index) in row.level1s" :key="`index-menu-${rowIndex}-${item.id}`">
            <RouterLinkUsage :id="`menu-l1-${rowIndex + 1}-${index + 1}`" :link="getNavLinkPath(item)">{{
              item.title
            }}</RouterLinkUsage>
            <span v-if="row.level1s.length > index + 1">・</span>
          </template>
          <span v-if="rowIndex === 0" class="new-tag">New</span>
        </div>
        <div class="L1-right" v-if="activeRowIndex === rowIndex" :row-index="rowIndex" data-test-id="menu-right">
          <div v-for="(l2item, l2index) in row.level2s" :key="`l2-${l2index}`" class="ec-row">
            <RouterLinkUsage
              :id="`menu-l2-${rowIndex + 1}-${l2index + 1}`"
              :link="getNavLinkPath(l2item)"
              :title="l2item.title"
              class="L2"
              ><span class="l2title">{{ l2item.title }}</span
              ><span
                class="ec-arrow font-bold after:font-bold after:font-icomoon after:content-['\e980'] after:text-[10px] after:pl-2 after:text-gold-600"
              ></span
            ></RouterLinkUsage>
            <div class="L3">
              <template v-for="(l3item, l3index) in l2item.level3s" :key="`l3-${l3index}`">
                <RouterLinkUsage
                  :id="`menu-l3-${rowIndex + 1}-${l2index + 1}-${l3index + 1}`"
                  :link="getNavLinkPath(l3item)"
                  :title="l3item.title"
                  class="L3-list"
                  >{{ l3item.title }}</RouterLinkUsage
                >
                <span v-if="l2item.level3s.length > l3index + 1">∣</span>
              </template>
            </div>
          </div>

          <div v-if="!$isEmpty(row.brands) || !$isEmpty(row.banners)" class="line"></div>

          <div v-if="!$isEmpty(row.brands)" class="ec-row">
            <div
              class="L2 pt-6 ec-arrow font-bold after:font-bold after:font-icomoon after:content-['\e980'] after:text-[10px] after:pl-2 after:text-gold-600"
            >
              {{ l2Title }}
            </div>
            <div class="L3 L3-brand">
              <template v-for="(l3item, l3index) in row.brands" :key="`l3-brand-${l3index}`">
                <RouterLinkUsage
                  :id="`menu-brand-${rowIndex + 1}-${l3index + 1}`"
                  :link="getNavLinkPath(l3item)"
                  :title="l3item.title"
                  class="L3-list brand-link"
                  ><img :src="l3item.image" :alt="l3item.title" class="brand-img"
                /></RouterLinkUsage>
              </template>
            </div>
          </div>

          <div v-if="!$isEmpty(row.banners)" class="ec-row">
            <div class="L2 pt-6">{{ $isEmpty(row.brands) ? l2Title : '' }}</div>
            <div class="L3 L3-banner" :class="{ 'pt-3': $isEmpty(row.brands) }">
              <template v-for="(l3item, l3index) in row.banners" :key="`l3-banner-${l3index}`">
                <RouterLinkUsage
                  :id="`menu-sb-${rowIndex + 1}-${l3index + 1}`"
                  :link="getNavLinkPath(l3item)"
                  :title="l3item.title"
                  class="L3-list banner-link"
                  ><img :src="l3item.image" :alt="l3item.title" class="banner-img"
                /></RouterLinkUsage>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuComponent',
};
</script>
<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';
import { getNavLinkPath } from '@/shared/helpers/ad/ad-helper';
import homePageAdFormatter from '@/shared/helpers/ad/home-page-2024-formatter';
import { homePageADMappingEnumWithNewIndex } from '@/shared/constants/ad/homepage-ad-type';
import { isFunction } from '@/shared/helpers/data-process';

const props = defineProps({
  rwdMode: { type: Boolean, default: false },
  initialData: { type: Object, default: null },
});

const { rwdMode } = toRefs(props);

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

// 直接從 initialData 讀取 menu 資料（SSR 時可用）
const menu = computed(() => getFormattedData('B006')?.items || []);
const activeRowIndex = ref<number | null>(null);

const l2Title = ref('推薦品牌');

const recordActiveRowIndex = (index: number | null) => (activeRowIndex.value = index);
</script>

<style scoped>
.title {
  @apply h-[52px] p-4 text-base leading-5 font-medium rounded-t-lg text-white bg-gold-500;
}

.list {
  @apply w-full h-[476px] flex flex-col justify-evenly relative rounded-none text-black border border-solid border-gold-500 bg-white;

  .ec-row {
    @apply w-full p-0 m-0;
  }
  .ec-row:first-child .L1-left {
    @apply mt-0 text-clip;
  }
  > .ec-row {
    @apply h-['inherit'] inline-flex items-center flex-nowrap justify-between;

    &:hover,
    &.active {
      @apply bg-gold-50;

      .L1-left a,
      .L1-left span {
        @apply text-gold-500;
      }
      .L1-left span.new-tag {
        @apply text-orange-500;
      }
      .L1-right {
        @apply flex z-[5];
      }
    }
  }
}

.rwd-mode {
  &.list {
    @apply border-none;
  }

  .L1-right {
    @apply -top-6;
    width: calc(960px - 212px);
    max-width: calc(960px - 212px);

    @screen xl {
      width: calc(1272px - 212px);
      max-width: calc(1272px - 212px);
    }
  }
  .L3 {
    @apply flex-wrap px-2 py-0;
  }

  .L3-brand {
    @apply grid gap-y-4 gap-x-2 pt-4 px-4 pb-0;
    grid-template-columns: repeat(7, 65px);

    @screen xl {
      @apply p-2 gap-2;
      grid-template-columns: repeat(12, 65px);
    }
  }

  .L3-banner {
    @apply overflow-hidden items-center flex-wrap gap-4 p-4 w-auto grid-cols-2;

    @screen xl {
      @apply grid-cols-3;
    }
  }
  .banner-img {
    @apply w-[200px] h-[100px];
  }
}

.L1-left {
  @apply w-full h-7 px-4 py-1 mx-auto my-[1px] text-xs text-left overflow-hidden text-ellipsis whitespace-pre no-underline;

  &:first-child {
    @apply mt-0;
  }
  &:last-child {
    @apply mb-0;
  }

  a {
    @apply text-sm font-medium text-gray-700;
  }

  span {
    @apply cursor-default text-gray-700;
  }

  span.new-tag {
    @apply h-5 ml-1 px-1 py-[2px] rounded text-xs font-medium inline-block text-orange-500 bg-orange-50;
  }
}

.L1-right {
  @apply w-[1068px] max-w-[1068px] min-h-[476px] m-0 p-0 flex-auto mr-3 rounded-r-lg absolute top-0 left-[211px] flex-col justify-start hidden border-2 border-solid border-gray-200;
  background: linear-gradient(90deg, theme('colors.gray-50') 160px, theme('colors.white') 0);

  .ec-row {
    @apply flex whitespace-pre;
  }
}

.line {
  border-top: 1px solid #f0ebe1;
}

.L2 {
  @apply w-[160px] max-w-[160px] text-right text-sm py-2 px-4 font-bold overflow-hidden text-ellipsis whitespace-pre no-underline text-gold-500 bg-gray-50;
}

a.L2 .l2title:hover {
  @apply underline;
}

.L3 {
  width: calc(100% - 160px);
  @apply max-w-[904px] px-4 flex flex-wrap items-center;

  a {
    @apply h-9 p-2 text-sm text-gray-700;
  }

  span {
    @apply text-sm text-gray-200;
  }
}

.L3-brand {
  @apply grid p-4 gap-2;
  grid-template-columns: repeat(12, 65px);
  a {
    @apply h-auto p-0;
  }
  .brand-img {
    @apply w-[65px] h-[65px];
  }
}

.L3-banner {
  @apply w-[662px] grid grid-cols-3 gap-4 pb-4 items-center;

  a {
    @apply h-auto block p-0;
  }
}

.brand-img {
  @apply w-10 h-10 rounded-lg;
}

.banner-img {
  @apply w-[200px] max-h-[100px] rounded-lg;
}
</style>
