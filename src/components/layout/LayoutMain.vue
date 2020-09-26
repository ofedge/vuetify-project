<template>
    <v-main>
      <layout-bar></layout-bar>
      <v-container fluid>
        <h3>Hello</h3>
      </v-container>
    </v-main>
</template>

<script>
import { getUserInfo } from '@/api/signIn';
import LayoutBar from "./LayoutBar";

export default {
  name: 'LayoutMain',
  components: {
    LayoutBar
  },
  data() {
    return {
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    if (!this.userInfo || !Object.keys(this.userInfo).length) {
      this.getUserInfo();
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data);
        } else {
          console.error(res.msg);
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>

<style scoped>

</style>
