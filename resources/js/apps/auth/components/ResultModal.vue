<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: String,
  type: String, // 'success' or 'error'
});
const emit = defineEmits(['close']);
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <div class="flex items-center">
        <span v-if="type === 'success'" class="text-green-500 text-3xl">✔️</span>
        <span v-if="type === 'error'" class="text-red-500 text-3xl">❌</span>
        <p class="ml-3 text-lg font-semibold">{{ message }}</p>
      </div>
      <button @click="emit('close')" class="mt-4 w-full p-2 bg-blue-500 text-white rounded-md">
        OK
      </button>
    </div>
  </div>
</template>
