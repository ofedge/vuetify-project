<template>
  <v-snackbar
    v-model='snackbar.show'
    top
    :timeout='snackbar.duration'
    :color="color"
    multi-line>
    <div>{{ snackbar.message }}</div>
    <template v-slot:action='{ attrs }'>
      <v-btn text v-bind='attrs' @click='close'>Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { store, mutation } from '../plugins/snackbarMessage';

export default {
  name: 'SnackbarMessage',
  computed: {
    snackbar() {
      return store.snackbar;
    },
    color() {
      const typeColor = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
      }
      return typeColor[store.snackbar.type];
    }
  },
  methods: {
    close() {
      mutation.close();
    }
  }
}
</script>

<style scoped>

</style>
