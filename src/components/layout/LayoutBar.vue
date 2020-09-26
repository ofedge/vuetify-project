<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/60.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Login Time: {{ userInfo.loginTime }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ userInfo.loginTime }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="item in items">
          <template v-if="item.children">
            <v-list-group no-action :key="item.id">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <template v-for="sub in item.children">
                <v-list-item :key="sub.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ sub.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item :key="item.id">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="blue darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Vuetify Project</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="pr-3">
        <v-btn icon>
          <v-icon>mdi-lock</v-icon>
        </v-btn>
      </span>
      <span class="pr-3">
        <v-btn icon @click="signOut">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
  </div>
</template>

<script>
import { signOut } from "@/api/signIn";
import { removeToken } from "@/util/auth";

export default {
  name: 'LayoutBar',
  data() {
    return {
      drawer: null,
      items: [
        { id: 1, icon: 'mdi-trending-up', text: 'System Management',
          children: [
            { id: 2, text: 'User Management' },
            { id: 3, text: 'Role Management'}
          ]
        },
        { id: 4, icon: 'mdi-history', text: 'Test Menu' },
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    signOut() {
      signOut().then(res => {
        removeToken();
        this.$router.push({ name: 'SignIn' });
      }).catch(err => {
        console.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
