<template>
  <div>
    <ul class="flex pb-0 mb-0">
      <!-- <li v-if="isLogin" class="gold">{{ encryptName(privacyUserName) }}</li> -->
      <!-- <li v-if="isLogin"><button type="button" title="登出" @click="logout">登出</button></li> -->
      <li><RouterLinkUsage link="/login" title="登入">登入</RouterLinkUsage></li>
      <li><button type="button" title="註冊" data-test-id="registry-button">註冊</button></li>
      <li><a :href="appRedirectLink()" title="APP下載" target="_blank">APP下載</a></li>
      <li><RouterLinkUsage link="/member" title="會員中心">會員中心</RouterLinkUsage></li>
      <li><RouterLinkUsage link="/member/orders" title="我的訂單">我的訂單</RouterLinkUsage></li>
      <li><RouterLinkUsage link="/member/wish" title="收藏商品">收藏商品</RouterLinkUsage></li>
      <li><RouterLinkUsage link="/member/coupons" title="優惠券">優惠券</RouterLinkUsage></li>
      <!-- <li><RouterLinkUsage link="/member/?我的徽章連結" title="我的徽章">我的徽章</RouterLinkUsage></li> -->
      <li>
        <RouterLinkUsage link="https://events.eslite.com/campaign/memberpoint_m876/index.html" title="誠品點"
          >誠品點</RouterLinkUsage
        >
      </li>
      <li>
        <RouterLinkUsage link="/cart/step1"
          >購物車(<span class="num font-roboto" :class="{ empty: cartQuantity === 0 }">{{ cartQuantity }}</span
          >)</RouterLinkUsage
        >
      </li>
    </ul>
    <!-- <logout-modal v-if="!$isEmpty(logoutSuccessMessage)" @close="closeModal"></logout-modal> -->
  </div>
</template>

<script setup lang="ts">
/**
 * 2024首頁改版 header links
 */
import { computed } from 'vue';
import RouterLinkUsage from '@/shared/components/link/router-link-usage.vue';

const storeCartQuantity = computed(() => 0);

const cartQuantity = computed(() => {
  // 未登入一律拿 local cart
  return storeCartQuantity.value;
});

const appRedirectLink = () => {
  // Check if running in browser environment
  if (typeof navigator === 'undefined') return 'https://vip.eslite.com/esliteapp/tw/';

  const ua = navigator.userAgent;
  if (ua.match(/(iPad|iPhone|iPod)/i)) return 'https://apps.apple.com/tw/app/id1527231018';
  if (ua.match(/Android/i)) return 'https://play.google.com/store/apps/details?id=com.eslite.tw';
  return 'https://vip.eslite.com/esliteapp/tw/';
};
</script>

<style scoped>
a,
img {
  @apply w-full max-w-full;
}

/** header link: 結構 */
li {
  @apply leading-4 my-1 px-[16px] text-center no-underline whitespace-pre border-l border-l-solid border-l-gray-200 first:pl-0 first:border-l-0 last:pr-0;
}

/** header link: default (灰色) */
li a,
li button {
  @apply text-sm font-medium text-gray-700 border-0;
}

li a:active,
li a:hover,
li button:active,
li button:hover {
  @apply no-underline text-gold-500;
}

/** header link: 購物車數量 (紅字) */
span.num {
  @apply text-pink-500;
}

span.num.empty {
  @apply text-gold-500;
}

/** header link: 名字 (金字) */
li.gold {
  @apply px-0 text-sm font-medium text-gold-500;
}

li.gold + li {
  @apply border-l-0;
}

.links {
  @apply max-w-[662px] basis-[662px] grid items-center;
}
</style>
