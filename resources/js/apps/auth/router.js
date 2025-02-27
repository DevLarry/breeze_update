import { createRouter, createWebHistory } from 'vue-router';

// import {
//   Login,
//   Register,
//   VerifyCode,
//   VerifyEmail,
//   VerifyOtp,
//   ForgotPassword,
//   ResetPassword,
// } from './pages';

import Home from './pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
