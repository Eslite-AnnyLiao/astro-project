<template>
  <a v-bind="$attrs" :href="href" :target="target" :title="title"><slot></slot></a>
</template>

<script lang="ts">
export default {
  name: 'ALinkUsage',
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  title: {
    type: String,
    default: '',
  },
});
</script>
