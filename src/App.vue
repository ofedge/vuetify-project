<template>
  <v-app>
    <router-view></router-view>
    <snackbar-message></snackbar-message>
  </v-app>
</template>

<script>
import SnackbarMessage from './components/SnackbarMessage';

export default {
  name: 'App',
  components: { SnackbarMessage },
  created() {
    this.$vuetify.lang.curren='en';
  }
};
</script>
