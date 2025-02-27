import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import axios from 'axios';


const app = createApp(App);

const instance = axios.create({ baseURL: '/api' });

app.use(router);
// app.use(instance);

const components = {}
app.provide('axios', instance);

for (const name in components) {
  app.component(name, components[name]);
}

// Global mixin
app.mixin({
  created() {
    this.saveReferrerIdAsCookieRefresh();
  },
  methods: {
    saveReferrerIdAsCookieRefresh() {
      const ref = this.$route.query.ref;
      if (ref) {
        this.setCookie('referrerId', ref, 30);
      }
    },
    setCookie(cookieName, value, expirationDays) {
      const date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + date.toUTCString();
      document.cookie = `${cookieName}=${value};${expires};path=/`;
    },
  },
});

app.mount('#app');
