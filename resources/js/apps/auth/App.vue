<template>
  <router-view></router-view>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      companyName: 'Trimbler',
    };
  },
  components: {
    RouterView
  }
};
</script>
