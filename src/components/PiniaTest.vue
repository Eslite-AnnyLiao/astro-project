<template>
  <div class="pinia-test p-6 border rounded-lg shadow-lg max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Pinia Store Test</h2>
    
    <div class="mb-4">
      <p class="text-lg mb-2">{{ store.displayMessage }}</p>
      <p class="text-sm text-gray-600">Double count: {{ store.doubleCount }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <button 
        @click="store.increment" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        +1
      </button>
      <button 
        @click="store.decrement" 
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        -1
      </button>
      <button 
        @click="store.reset" 
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset
      </button>
    </div>

    <div class="mb-4">
      <input
        v-model="newMessage"
        @keyup.enter="updateMessage"
        placeholder="Enter new message"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        @click="updateMessage"
        class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Update Message
      </button>
    </div>

    <div class="text-sm text-gray-500">
      <p>Store State:</p>
      <pre class="bg-gray-100 p-2 rounded text-xs">{{ JSON.stringify({
        count: store.count,
        message: store.message,
        doubleCount: store.doubleCount
      }, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTestStore } from '@/stores/testStore';

const store = useTestStore();
const newMessage = ref('');

function updateMessage() {
  if (newMessage.value.trim()) {
    store.setMessage(newMessage.value);
    newMessage.value = '';
  }
}

defineOptions({
  name: 'PiniaTest'
})
</script>

<style scoped>
.pinia-test {
  font-family: 'Arial', sans-serif;
}
</style>