<template>
  <v-main class="grey lighten-3">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="light-blue darken-3" dark flat>
              <v-toolbar-title>Sign In</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginFormRef">
                <v-text-field
                  label="Username"
                  v-model="login.username"
                  prepend-icon="mdi-account"
                  :rules="rules.username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="Password"
                  v-model="login.password"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :rules="rules.password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signIn">Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { signIn } from '@/api/signIn';
import { md5Password } from '@/util/encrypt';
import { setToken } from '@/util/auth'

export default {
  name: 'SignIn',
  data() {
    return {
      login: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          v => !!v || 'Username is required!'
        ],
        password: [
          v => !!v || 'Password is required!'
        ]
      }
    }
  },
  computed: {
    loginForm() {
      return {
        username: this.login.username,
        password: md5Password(this.login.password)
      }
    }
  },
  methods: {
    signIn() {
      const valid = this.$refs.loginFormRef.validate();
      if (!valid) {
        return;
      }
      signIn(this.loginForm).then(res => {
        if (res.code === 0) {
          setToken(res.data.token);
          this.$store.commit('setUserInfo', res.data);
          this.$router.push({ name: 'Main' });
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error(err);
      });
    }
  }
}
</script>

<style scoped>

</style>
