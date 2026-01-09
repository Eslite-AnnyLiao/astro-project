<template>
  <div class="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
    <h3 class="mt-0 text-white text-2xl mb-6">Categories API 測試</h3>
    
    <div class="mb-4">
      <button 
        @click="fetchCategory" 
        :disabled="loading"
        class="ec-btn ec-btn-secondary"
      >
        {{ loading ? '載入中...' : '測試 Categories API' }}
      </button>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-md">
      <h4 class="text-red-300 font-semibold mb-2">錯誤訊息:</h4>
      <pre class="text-red-200 text-sm overflow-auto">{{ error }}</pre>
    </div>

    <div v-if="data" class="p-4 bg-green-500/20 border border-green-500 rounded-md">
      <h4 class="text-green-300 font-semibold mb-2">API 回應:</h4>
      <pre class="text-green-100 text-sm overflow-auto">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import categoriesApi from '../api/categories';
import type { CategoryResponse } from '../api/categories';

const loading = ref(false);
const data = ref<CategoryResponse | null>(null);
const error = ref<string | null>(null);

const fetchCategory = async () => {
  loading.value = true;
  error.value = null;
  data.value = null;

  try {
    const response = await categoriesApi();
    data.value = response.data;
  } catch (err: any) {
    console.error('Categories API 錯誤:', err);
    
    // 提取錯誤訊息
    if (err.response) {
      error.value = `HTTP ${err.response.status}: ${err.response.statusText}\n${JSON.stringify(err.response.data, null, 2)}`;
    } else if (err.request) {
      error.value = `網路錯誤: 無法連接到伺服器\n${err.message}`;
    } else {
      error.value = `請求錯誤: ${err.message}`;
    }
  } finally {
    loading.value = false;
  }
};

// 組件載入時自動測試 API
onMounted(() => {
  fetchCategory();
});
</script>