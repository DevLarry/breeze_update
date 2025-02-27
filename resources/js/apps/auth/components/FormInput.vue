<template>
    <div class="mb-4">
      <label :for="name" class="block text-sm font-medium text-gray-600">{{ label }}</label>
      <input
        :id="name"
        :name="name"
        :type="type"
        v-model="value"
        class="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        @blur="validate"
      />
      <p v-if="errors" class="text-red-500 text-sm mt-1">{{ errors }}</p>
    </div>
  </template>
  
  <script setup>
  import { useField } from 'vee-validate';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    label: String,
    name: String,
    type: String,
    rules: String,
    errors: String
  });
  
  const { value, validate } = useField(props.name, props.rules, {
    validateOnBlur: true,
    validateOnChange: false,
  });
  </script>
  