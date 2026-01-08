<template>
  <div class="ec-container">
    <div class="ec-row py-4">
      <p>一頁顯示7筆並單次走一筆</p>
      <VSwiper ref="SevenAndOneSwiper" preset="multiRow" :preset-options="{ slidesPerView: 7, spaceBetween: 12 }" class="banner-row">
        <SwiperSlide v-for="(item, index) in items.slice(0, 8)" :key="index" class="!flex !items-center">
          <div :style="`background-color: ${item.color};`">
            <p class="text-center text-gray-100">{{ item.sort }}</p>
            <img v-lazy="item.image" :alt="item.name" class="!h-auto" />
          </div>
        </SwiperSlide>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </VSwiper>
    </div>

    <!-- <div class="ec-row py-4"><swiper :slides-per-view="1.4" :centered-slides="true" :loop="true" :space-between="16" @slideChange="updateSlideScale"><swiper-slide v-for="(slide, index) in items" :key="index" class="custom-slide"><a :href="slide.link" :title="slide.name"><img class="swiper-lazy" :src="slide.image" :alt="slide.name" /></a></swiper-slide><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></swiper></div> -->
    <!-- <div class="ec-row py-4"><div class="ec-col-12">左右顯示部分</div><div class="ec-col-12 py-4"><swiper ref="swiperBothSidesRef" class="swiper swiperBothSides" :options="swiperBothSidesOptions" @slideChange="updateSlideScale"><swiper-slide v-for="(item, index) in items" :key="index" class="swiper-slide custom-slide"><a :href="item.link" :title="item.name"><img class="swiper-lazy" :src="item.image" :alt="item.name" /></a></swiper-slide><div slot="button-prev" class="swiper-button-prev"></div><div slot="button-next" class="swiper-button-next"></div><div slot="pagination" class="swiper-pagination swiper-pagination-bullets"></div></swiper></div></div> -->
    <!-- <div class="ec-row py-4"><div class="ec-col-12">Default</div><div class="ec-col-12 py-4"><swiper ref="swiperDefaultRef" class="swiper swiperDefault" :options="swiperDefaultOptions" @ready="handleSwiperReadied" @clickSlide="handleClickSlide"><swiper-slide v-for="(item, index) in items" :key="`type-1-${index}`" class="swiper-slide"><a :href="item.link" :title="item.name"><img class="swiper-lazy" :data-src="item.image" :alt="item.name" /><div class="swiper-lazy-preloader"></div></a></swiper-slide><template #button-prev><div class="swiper-button-prev"></div></template><template #button-next><div class="swiper-button-next"></div></template><template #pagination><div class="swiper-pagination swiper-pagination-bullets"></div></template></swiper></div></div> -->
    <!-- <div class="ec-row py-4"><div class="ec-col-12">2024 index big slide setting</div><div class="m-0 p-0 index-page-slide"><swiper ref="swiper2024IndexBigSlideRef" class="swiper swiper2024IndexBigSlide" :options="swiper2024IndexBigSlide" @ready="handleSwiperReadied" @clickSlide="handleClickSlide"><swiper-slide v-for="(item, index) in items" :key="`type-2-${index}`" class="swiper-slide"><div class="big-slide-box"><a :href="item.link" :title="item.name" class="big-banner"><img class="swiper-lazy" :src="item.image" :alt="item.name" /></a><div class="hot-product-box"><div class="title">主打商品</div><div v-for="(item, index) in [0, 1, 2]" :key="index" class="product-list"><div class="ec-card grid grid-cols-2 grid-row-3 gap-x-1 gap-y-2"><div class="card-title col-span-2">KANESU舞冷麥麵</div><div class="card-image-box row-span-2"><img :src="`/src/static/fake-images/big-slide-box-right-product-1.jpg`" class="card-image" /></div><div class="card-description">漢美馳 健康無油爆米花機</div><div class="card-dollar">$1,124,70</div></div></div></div></div></swiper-slide><div slot="button-prev" class="swiper-button-prev"></div><div slot="button-next" class="swiper-button-next"></div><div slot="pagination" class="swiper-pagination swiper-pagination-bullets"></div></swiper></div></div> -->
    <!-- <div class="ec-row py-4"><div class="ec-col-12">RWD setting</div><div class="ec-col-12 py-4"><swiper ref="swiperRWDRef" class="swiper swiperRWD" :options="swiperRWDOptions" @ready="handleSwiperReadied" @clickSlide="handleClickSlide"><swiper-slide v-for="(item, index) in items" :key="`type-2-${index}`" class="swiper-slide"><a :href="item.link" :title="item.name"><img class="swiper-lazy" :src="item.image" :alt="item.name" /></a></swiper-slide><div slot="button-prev" class="swiper-button-prev"></div><div slot="button-next" class="swiper-button-next"></div><div slot="pagination" class="swiper-pagination swiper-pagination-bullets"></div></swiper></div></div> -->
    <!-- <div class="ec-row py-4"><div class="ec-col-12">gallery thumbs</div><div class="ec-col-12 py-4"><swiper ref="swiperTopRef" class="swiper swiperTop" :options="swiperOptionTop" thumbs-swiper=".swiperThumbs" :need-thumbs="true"><swiper-slide v-for="(item, index) in items" :key="`type-viewer-${index}`" class="swiper-slide"><a :href="item.link" :title="item.name"><img :src="item.image" :alt="item.name" /></a></swiper-slide><template #button-next><div class="swiper-button-next swiper-button-white"></div></template><template #button-prev><div class="swiper-button-prev swiper-button-white"></div></template></swiper><swiper ref="swiperThumbsRef" class="swiper swiperThumbs" :options="swiperOptionThumbs" :need-thumbs="true"><swiper-slide v-for="(item, index) in items" :key="`type-thumb-${index}`" class="swiper-slide"><img :src="item.image" :alt="item.name" /></swiper-slide></swiper></div></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, type Ref } from 'vue';
import VSwiper from '@/components/global-components/v-swiper.vue';
import { useSwiperInstance } from '@/composables/swiper/useSwiperInstance';
import type { VSwiperExposed } from '@/types/swiper';
const swiperTopRef: Ref<typeof VSwiper | VSwiperExposed | null> = ref(null);

// 定義資料項目介面
interface SwiperItem {
  id: number;
  image: string;
  name: string;
  link: string;
  sort: number;
  color: string;
}

const items: Ref<SwiperItem[]> = ref([
  { id: 12284, image: '/src/static/fake-images/1044x475-1.jpg', name: '你好', link: '#1', sort: 1, color: 'orangered' },
  {
    id: 12072,
    image: '/src/static/fake-images/1044x475-2.jpg',
    name: '故事大飯店',
    link: '#2',
    sort: 2,
    color: '#F3A8A5',
  },
  {
    id: 12197,
    image: '/src/static/fake-images/1044x475-3.jpg',
    name: '森山大道',
    link: '#3',
    sort: 3,
    color: '#000000',
  },
  {
    id: 12073,
    image: '/src/static/fake-images/1044x475-4.jpg',
    name: '希望之線',
    link: '#4',
    sort: 4,
    color: '#a9adb0',
  },
  {
    id: 12198,
    image: '/src/static/fake-images/1044x475-5.jpg',
    name: '貓奴書單',
    link: '#5',
    sort: 5,
    color: '#66c9de',
  },
  {
    id: 11938,
    image: '/src/static/fake-images/1044x475-6.jpg',
    name: '丹麥一年',
    link: '#6',
    sort: 6,
    color: '#f7f6fb',
  },
  {
    id: 12074,
    image: '/src/static/fake-images/1044x475-7.jpg',
    name: '丹麥一年',
    link: '#7',
    sort: 7,
    color: '#fbf7f3',
  },
  {
    id: 11939,
    image: '/src/static/fake-images/1044x475-8.jpg',
    name: '貓奴書單',
    link: '#8',
    sort: 8,
    color: '#91d3dd',
  },
  {
    id: 12075,
    image: '/src/static/fake-images/1044x475-9.jpg',
    name: '日常生活美術館',
    link: '#9',
    sort: 9,
    color: '#fff5eb',
  },
  {
    id: 12284,
    image: '/src/static/fake-images/1044x475-1.jpg',
    name: '你好2',
    link: '#10',
    sort: 10,
    color: 'orangered',
  },
  {
    id: 12072,
    image: '/src/static/fake-images/1044x475-2.jpg',
    name: '故事大飯店2',
    link: '#11',
    sort: 11,
    color: '#F3A8A5',
  },
  {
    id: 12197,
    image: '/src/static/fake-images/1044x475-3.jpg',
    name: '森山大道2',
    link: '#12',
    sort: 12,
    color: '#000000',
  },
  {
    id: 12073,
    image: '/src/static/fake-images/1044x475-4.jpg',
    name: '希望之線2',
    link: '#13',
    sort: 13,
    color: '#a9adb0',
  },
  {
    id: 12198,
    image: '/src/static/fake-images/1044x475-5.jpg',
    name: '貓奴書單2',
    link: '#14',
    sort: 14,
    color: '#66c9de',
  },
  {
    id: 11938,
    image: '/src/static/fake-images/1044x475-6.jpg',
    name: '丹麥一年2',
    link: '#15',
    sort: 15,
    color: '#f7f6fb',
  },
  {
    id: 12074,
    image: '/src/static/fake-images/1044x475-7.jpg',
    name: '丹麥一年2',
    link: '#16',
    sort: 16,
    color: '#fbf7f3',
  },
  {
    id: 11939,
    image: '/src/static/fake-images/1044x475-8.jpg',
    name: '貓奴書單2',
    link: '#17',
    sort: 17,
    color: '#91d3dd',
  },
  {
    id: 12075,
    image: '/src/static/fake-images/1044x475-9.jpg',
    name: '日常生活美術館2',
    link: '#18',
    sort: 18,
    color: '#fff5eb',
  },
]);

// 使用 Swiper 實例管理
const { handleReady, handleClick, handleSlideChange } = useSwiperInstance();

onMounted((): void => {
  nextTick((): void => {
    // 測試 defineExpose 導出的功能
    if (swiperTopRef.value) {
      console.log('VSwiper 導出的 swiperPresets:', swiperTopRef.value.swiperPresets);
      console.log('VSwiper 導出的 commonBreakpoints:', swiperTopRef.value.commonBreakpoints);
      console.log('VSwiper 導出的 swiperRef:', swiperTopRef.value.swiperRef);
      
      // 測試使用內建的預設配置
      const basicConfig = swiperTopRef.value.swiperPresets.basic();
      console.log('基礎配置:', basicConfig);
      
      const multiRowConfig = swiperTopRef.value.swiperPresets.multiRow(5, 16);
      console.log('多列配置:', multiRowConfig);
      
      // 測試斷點配置
      console.log('斷點配置:', swiperTopRef.value.commonBreakpoints);
      
      // 綁定到 window 供測試
      (window as any).vSwiperInstance = swiperTopRef.value;
    }
  });
});

defineOptions({
  name: 'SampleSwiper',
});
</script>

<style scoped>
.swiper-button-prev,
.swiper-button-next {
  display: none;
  color: theme('colors.white');
  width: 1.25rem; /* w-5 */
  height: 2.25rem; /* h-9 */
  top: 0;
  bottom: 0;
  margin: auto 0;
  font-weight: 700; /* font-bold */
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 34px;
}

.swiper-button-prev {
  left: 0.875rem; /* 14px */
}

.swiper-button-next {
  right: 0.875rem; /* 14px */
}

.swiper-slide img {
  width: 100%;
  height: auto;
  overflow: hidden;
}

@screen md {
  .swiper-button-prev:not(.swiper-button-hidden),
  .swiper-button-next:not(.swiper-button-hidden) {
    display: block;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
}

.swiper-lazy-preloader {
  background-image: url('../static/images/loading_large.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  margin: 0;
  animation: none;
  border: none;
  width: inherit;
  height: inherit;
}

.swiper2024IndexBigSlide .swiper-pagination-bullet {
  width: 0.5rem; /* w-2 */
  height: 0.5rem; /* h-2 */
  background-color: rgb(243 244 246); /* bg-gray-100 */
  opacity: 0.8;
}

.swiper2024IndexBigSlide .swiper-pagination-bullet.swiper-pagination-bullet-active {
  width: 2.25rem; /* w-9 */
  height: 0.5rem; /* h-2 */
  opacity: 1;
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #917e57;
}

.index-page-slide {
  width: 1044px;
  height: 474px;
  padding: 0;
  margin: 0;
  outline: 1px solid blue;
}

.swiper2024IndexBigSlide .big-slide-box {
  width: 100%;
  height: 474px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.swiper2024IndexBigSlide .big-slide-box .big-banner {
  width: 100%;
  height: 100%;
  display: block;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box {
  width: 196px;
  height: 100%;
  padding: 10px 0;
  margin: 0;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  right: 0;
  /* background: linear-gradient(rgba(255, 255, 255, 0) 0 40px, rgba(255, 255, 255, 1) 120px 100%),
    url('/src/static/images/bg/big-slide-box-right-products-bg-stripe.svg') no-repeat top left, theme('colors.white'); */
  outline: 1px solid rgb(4, 235, 0);
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .title {
  font-size: 1rem;
  font-weight: 500;
  padding: 30px 0 18px 0;
  text-align: center;
  letter-spacing: 0.128px;
  color: theme('colors.black');
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list {
  width: 156px;
  margin: 0 auto;
  padding: 0 0 11px 0;
  border-bottom: 1px dashed rgb(229 231 235); /* gray-200 */
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list:first-child {
  padding-top: 0;
  background-color: black;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list:last-child {
  border-bottom: none;
  background: red;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card {
  width: 156px;
  padding: 0;
  flex-direction: column;
  align-items: center;
  border: none;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card-title {
  width: 100%;
  font-size: 0.875rem;
  text-align: left;
  padding: 0;
  margin: 0;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card-image-box {
  width: 80px;
  height: 80px;
  pointer-events: none;
  background-color: theme('colors.white');
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card-description {
  width: 72px;
  height: 60px;
  text-align: left;
  font-size: 0.875rem;
}

.swiper2024IndexBigSlide .big-slide-box .hot-product-box .product-list .card-dollar {
  width: 72px;
  height: 20px;
  text-align: left;
  font-size: 13px;
}

.swiperBothSides {
  background-color: rgb(243 244 246); /* gray-100 */
}

.swiperBothSides .swiper-slide {
  height: 120px !important;
  padding-block: 110px;
  text-align: center;
}

.swiperBothSides .custom-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: #777;
  height: 300px;
}

.swiperBothSides .swiper-button-prev,
.swiperBothSides .swiper-button-next {
  display: block;
}
</style>
