<script setup>
import { ref, inject } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import ResultModal from '../components/ResultModal.vue';

const axios = inject('axios');

const schema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  whatsapp: yup.string().required('Whatsapp Number is required'),
  gender: yup.string().required('Gender is required'),
  belonging: yup.string().required('Belonging is required'),
  contribution: yup.string().required('Contribution mode is required'),
  reminder: yup.string().required('Reminder mode is required'),
  commitment: yup.string().required('Commitment amount is required'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms'),
});

const { handleSubmit } = useForm({ validationSchema: schema });
const fullName = useField('fullName');
const email = useField('email');
const whatsapp = useField('whatsapp');
const gender = useField('gender');
const belonging = useField('belonging');
const contribution = useField('contribution');
const reminder = useField('reminder');
const commitment = useField('commitment');
const terms = useField('terms');
const modal = ref(false);
const message = ref('');
const type = ref('');

const submitForm = handleSubmit((values) => {
  // console.log('Form Submitted', values);

  const payload = {
    name: values.fullName,
    email: values.email,
    whatsapp: values.whatsapp,
    identity: values.belonging,
    gender: values.gender,
    commitmentAmount: parseInt(values.commitment),
  };
  axios
    .post('/subscriber', payload)
    .then((e) => {
      // console.log(e);
      modal.value = true;
      message.value = "JazaakumuLlohu Khayran. Your commitment has been received. May Allah reward you abundantly.";
      type.value = "success";
      // alert('Sign up successful!');
    })
    .catch((err) => {
      modal.value = true;
      message.value = "Something went wrong. Please try again later.";
      type.value = "error";
    });
});
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
    <img src="assets/img/photo.jpg" alt="">
    <h2 class="text-3xl font-semibold mb-4 text-center">
      MSSN FUTMINNA PROJECT 5000 COMMITMENT FORM
    </h2>
    <form @submit="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700">Full Name</label>
        <input
          v-model="fullName.value.value"
          class="w-full p-2 border rounded-md"
        />
        <p class="text-red-500">{{ fullName.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Email Address</label>
        <input
          v-model="email.value.value"
          type="email"
          class="w-full p-2 border rounded-md"
        />
        <p class="text-red-500">{{ email.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Whatsapp Number</label>
        <input
          v-model="whatsapp.value.value"
          class="w-full p-2 border rounded-md"
        />
        <p class="text-red-500">{{ whatsapp.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Gender</label>
        <select
          v-model="gender.value.value"
          class="w-full p-2 border rounded-md"
        >
          <!-- <option value="">Select</option> -->
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <p class="text-red-500">{{ gender.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Category</label>
        <!-- <input v-model="belonging.value.value" class="w-full p-2 border rounded-md" /> -->
        <select
          v-model="belonging.value.value"
          class="w-full p-2 border rounded-md"
        >
          <!-- <option value="">Select</option> -->
          <option value="STUDENT">Futminna Student</option>
          <option value="STAFF">Futminna Staff</option>
          <option value="OTHER">Other</option>
        </select>
        <p class="text-red-500">{{ belonging.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700"
          >Preferred mode of contribution</label
        >
        <select
          v-model="contribution.value.value"
          class="w-full p-2 border rounded-md"
        >
          <option value="Bank transfer">Bank transfer</option>
          <option value="Cash">Cash</option>
        </select>
        <p class="text-red-500">{{ contribution.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Preferred mode of reminder</label>
        <select
          v-model="reminder.value.value"
          class="w-full p-2 border rounded-md"
        >
          <option value="Whatsapp">Whatsapp</option>
          <option value="Email">Email</option>
        </select>
        <p class="text-red-500">{{ reminder.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Commitment Amount</label>
        <!-- <input v-model="commitment.value.value" type="number" class="w-full p-2 border rounded-md" /> -->
        <select
          v-model="commitment.value.value"
          class="w-full p-2 border rounded-md"
        >
          <!-- <option value="">Select</option> -->
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
          <option value="other">Other</option>
        </select>
        <p class="text-red-500">{{ commitment.errorMessage }}</p>
      </div>

      <div class="mb-4">
        <input v-model="terms.value.value" id="terms" type="checkbox" />
        <label class="text-gray-700 ml-2" for="terms"
          >I agree to the terms and conditions</label
        >
        <p class="text-red-500">{{ terms.errorMessage }}</p>
      </div>

      <button
        type="submit"
        class="w-full p-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  </div>
  <ResultModal v-if="modal" :type="type" :message="message" @close="modal = false" />
</template>
