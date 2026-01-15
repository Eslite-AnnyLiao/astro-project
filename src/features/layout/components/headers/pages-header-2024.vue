<template>
  <!-- Desktop 版本 -->
  <div class="header-desktop">
    <EsliteHeaderDesktop :initial-data="initialData" />
  </div>
  <!-- Mobile 版本 -->
  <div class="header-mobile">
    <EsliteHeaderMobile :initial-data="initialData" />
  </div>
</template>

<script setup lang="ts">
import EsliteHeaderDesktop from './pages-header-2024-desktop.vue';
import EsliteHeaderMobile from './header-2024mobile.vue';

// 接收從 Astro 傳入的預取資料
defineProps<{
  initialData?: Record<string, any> | null;
}>();
</script>

<script lang="ts">
export default { name: 'EsliteHeader' };
</script>

<style scoped>
/* Mobile: < 1024px 顯示 */
.header-mobile {
  display: block;
}

.header-desktop {
  display: none;
}

/* Desktop: >= 1024px 顯示 */
@screen lg {
  .header-desktop {
    display: block;
  }
  .header-mobile {
    display: none;
  }
}
</style>
