<!--
  Icon 元件 - 智能圖標元件
  
  Props:
  - name: 圖標名稱 (必填) 如 'heart', 'cart' (不需要 'icon-' 前綴)
  - size: 尺寸 'sm' | 'md' | 'lg' | 'xl' | string (自訂 CSS 尺寸)
  - color: 顏色 string (CSS 顏色值)
  - customClass: 自訂 CSS 類別 string
  
  使用範例:
  <Icon name="heart" size="lg" color="#ff0000" />
  <Icon name="cart" :size="'2rem'" />
  <Icon name="Case-Round-Minimalistic" customClass="my-custom-style" />
-->

<template>
  <i :class="iconClasses" :style="iconStyles">
    <!-- 處理多 path 圖標 -->
    <template v-if="pathCount > 1">
      <span 
        v-for="pathIndex in pathCount" 
        :key="`path${pathIndex}`" 
        :class="[`path${pathIndex}`, props.color ? 'before:!text-[color:var(--icon-color)]' : '']"
      ></span>
    </template>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// 動態載入 icomoon CSS
import '@/assets/style/icomoon.css';

interface Props {
  /** 圖標名稱 (不需要 icon- 前綴) */
  name: string;
  /** 尺寸: 預設尺寸或自訂 CSS 值 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  /** 顏色: CSS 顏色值 */
  color?: string;
  /** path 數量 */
  pathCount?: number;
  /** 自訂 CSS 類別 */
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: undefined,
  pathCount: 1,
  customClass: undefined,
});

// 計算圖標類別
const iconClasses = computed(() => {
  const classes = [`icon-${props.name}`];

  // 添加尺寸類別
  if (typeof props.size === 'string' && ['sm', 'md', 'lg', 'xl'].includes(props.size)) {
    classes.push(`icon-${props.size}`);
  }

  // 添加顏色類別 (使用 Tailwind 的 before: pseudo-class)
  if (props.color) {
    classes.push('before:!text-[color:var(--icon-color)]');
  }

  // 添加自訂類別
  if (props.customClass) {
    classes.push(props.customClass);
  }

  return classes;
});

// 計算圖標樣式
const iconStyles = computed(() => {
  const styles: Record<string, string> = {};

  // 設定自訂尺寸
  if (props.size && !['sm', 'md', 'lg', 'xl'].includes(props.size)) {
    styles.fontSize = props.size;
  }

  // 設定 CSS 變數給 Tailwind 使用
  if (props.color) {
    styles['--icon-color'] = props.color;
  }

  return styles;
});


defineOptions({
  name: 'Icon',
});
</script>

<style scoped>
/* 預設尺寸定義 */
.icon-sm {
  font-size: 1rem;
}

.icon-md {
  font-size: 1.5rem;
}

.icon-lg {
  font-size: 2rem;
}

.icon-xl {
  font-size: 2.5rem;
}

/* 確保圖標正確顯示 */
i[class*='icon-'] {
  font-family: 'icomoon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
</style>
