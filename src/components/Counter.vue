<template>
  <div class="text-center p-8 border border-gray-300 rounded-lg max-w-sm mx-auto bg-gray-50">
    <h2 class="text-gray-700 mb-4 text-xl font-semibold">Vue Counter 計數器</h2>
    <p class="text-2xl font-bold text-gray-600 my-4">計數: {{ count }}</p>
    <div class="flex gap-2 justify-center">
      <button 
        @click="decrement" 
        class="px-4 py-2 border-0 rounded cursor-pointer font-bold transition-colors duration-200 bg-red-500 text-white hover:bg-red-700"
      >
        -
      </button>
      <button 
        @click="increment" 
        class="px-4 py-2 border-0 rounded cursor-pointer font-bold transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-700"
      >
        +
      </button>
      <button 
        @click="reset" 
        class="px-4 py-2 border-0 rounded cursor-pointer font-bold transition-colors duration-200 bg-gray-500 text-white hover:bg-gray-700"
      >
        重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}
</script>

