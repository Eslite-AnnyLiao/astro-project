import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTestStore = defineStore('test', () => {
  // State
  const count = ref(0);
  const message = ref('Pinia is working!');

  // Getters (computed)
  const doubleCount = computed(() => count.value * 2);
  const displayMessage = computed(() => `${message.value} Count: ${count.value}`);

  // Actions
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function setMessage(newMessage: string) {
    message.value = newMessage;
  }

  function reset() {
    count.value = 0;
    message.value = 'Pinia is working!';
  }

  return {
    // state
    count,
    message,
    // getters
    doubleCount,
    displayMessage,
    // actions
    increment,
    decrement,
    setMessage,
    reset
  };
});