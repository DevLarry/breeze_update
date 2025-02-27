<template>
    <div class="mb-4">
      <label :for="name" class="block text-sm font-medium text-gray-600">{{ label }}</label>
      <select
        :id="name"
        :name="name"
        v-model="selectedValue"
        class="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        @change="handleChange"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
  
      <input
        v-if="selectedValue === 'Other'"
        type="text"
        v-model="otherValue"
        class="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :placeholder="`Enter your ${label.toLowerCase()}`"
        @input="updateOtherValue"
      />
  
      <p v-if="errors" class="text-red-500 text-sm mt-1">{{ errors }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    label: String,
    name: String,
    options: Array,
    modelValue: String,
    errors: String
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const selectedValue = ref(props.modelValue);
  const otherValue = ref("");
  
  const handleChange = () => {
    if (selectedValue.value === "Other") {
      otherValue.value = "";
      emit("update:modelValue", otherValue.value);
    } else {
      emit("update:modelValue", selectedValue.value);
    }
  };
  
  const updateOtherValue = () => {
    emit("update:modelValue", otherValue.value);
  };
  
  // Watch for external changes in modelValue to keep internal state in sync
  // watch(() => props.modelValue, (newValue) => {
  //   selectedValue.value = newValue === "Other" ? "Other" : newValue;
  //   otherValue.value = newValue === "Other" ? props.modelValue : "";
  // });
  </script>
  