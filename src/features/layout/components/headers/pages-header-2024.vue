<template>
  <component :is="componentName"/>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import EsliteHeader from './pages-header-2024-desktop.vue';
import EsliteHeaderMobile from './header-2024mobile.vue';

const $screen = inject('$screen');
const componentName = computed(() => ($screen.isMobileSize ? EsliteHeaderMobile : EsliteHeader));
</script>

<script lang="ts">
export default { name: 'EsliteHeader' };
</script>
