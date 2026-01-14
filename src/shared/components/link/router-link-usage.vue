<template>
  <div v-if="allowEmptyLink && isEmptyLink" v-bind="$attrs" data-type="route-empty">
    <slot></slot>
  </div>
  <a-link-usage v-else v-bind="$attrs" :href="link" :title="title" :target="target" data-type="a-link">
    <slot></slot>
  </a-link-usage>
</template>

<script lang="ts">
export default {
  name: 'RouterLinkUsage',
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { toRefs, computed } from 'vue';
import ALinkUsage from '../link/a-link-usage.vue';

const props = defineProps({
  link: { type: String, default: '' },
  title: { type: String, default: '' },
  target: { type: String, default: '_self' },
  allowEmptyLink: { type: Boolean, default: false },
});

const { link, title, target, allowEmptyLink } = toRefs(props);

const isEmptyLink = computed(() => !link.value || link.value === '#');
</script>
