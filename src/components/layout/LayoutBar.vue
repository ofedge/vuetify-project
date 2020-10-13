<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/29.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Login Time</v-list-item-title>
            <v-list-item-subtitle>{{ new Date(userInfo.loginTime).toLocaleString() }}</v-list-item-subtitle>
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
                <v-list-item :key="sub.id" :to="sub.to">
                  <v-list-item-content>
                    <v-list-item-title>{{ sub.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item :key="item.id" :to="item.to">
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
      <v-toolbar-items>
        <v-dialog
          width="500"
          v-model="modifyPassword.show"
          persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-lock</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span>Modify password</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeModify">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form ref="modifyPasswordRef">
                <v-container>
                  <v-row dense no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="modifyPassword.model.oldPassword"
                        label="Old password"
                        :rules="modifyPassword.rules.oldPassword"
                        :append-icon="modifyPassword.passwordShow.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="modifyPassword.passwordShow.oldPassword ? 'text' : 'password'"
                        @click:append="modifyPassword.passwordShow.oldPassword = !modifyPassword.passwordShow.oldPassword">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="modifyPassword.model.newPassword"
                        label="Old password"
                        :rules="modifyPassword.rules.newPassword"
                        :append-icon="modifyPassword.passwordShow.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="modifyPassword.passwordShow.newPassword ? 'text' : 'password'"
                        @click:append="modifyPassword.passwordShow.newPassword = !modifyPassword.passwordShow.newPassword">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="modifyPassword.model.repeatNewPassword"
                        label="Old password"
                        :rules="modifyPassword.rules.repeatNewPassword"
                        :append-icon="modifyPassword.passwordShow.repeatNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="modifyPassword.passwordShow.repeatNewPassword ? 'text' : 'password'"
                        @click:append="modifyPassword.passwordShow.repeatNewPassword = !modifyPassword.passwordShow.repeatNewPassword">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModify">Close</v-btn>
              <v-btn color="primary" @click="submitModify">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
      <v-toolbar-items class="mr-3">
        <v-btn text @click="signOut">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { signOut, modifyPassword } from "@/api/signIn";
import { removeToken } from "@/util/auth";
import { md5Password } from '@/util/encrypt';
import router from "../../router";

export default {
  name: 'LayoutBar',
  data() {
    return {
      drawer: true,
      items: [
        { id: 1, icon: 'mdi-trending-up', text: 'System Management',
          children: [
            { id: 2, text: 'User Management', to: '/main/user' },
            { id: 3, text: 'Role Management', to: '/main/role' }
          ]
        },
        { id: 4, icon: 'mdi-history', text: 'Test Menu', to: '/main/test' },
      ],
      modifyPassword: {
        show: false,
        model: {
          oldPassword: "",
          newPassword: "",
          repeatNewPassword: ""
        },
        rules: {
          oldPassword: [
            v => !!v || 'Old password is required'
          ],
          newPassword: [
            v => !!v || 'New password is required'
          ],
          repeatNewPassword: [
            v => !!v || 'Please enter new password again',
            v => v === this.modifyPassword.model.newPassword || 'The two passwords are inconsistent'
          ]
        },
        passwordShow: {
          oldPassword: false,
          newPassword: false,
          repeatNewPassword: false
        }
      }
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
        this.$message.error(err);
      });
    },
    closeModify() {
      this.modifyPassword.show = false;
      this.modifyPassword.model.oldPassword = "";
      this.modifyPassword.model.newPassword = "";
      this.modifyPassword.model.repeatNewPassword = "";
      this.modifyPassword.passwordShow.oldPassword = false;
      this.modifyPassword.passwordShow.newPassword = false;
      this.modifyPassword.passwordShow.repeatNewPassword = false;
      this.$refs.modifyPasswordRef.resetValidation();
    },
    submitModify() {
      const valid = this.$refs.modifyPasswordRef.validate();
      if (!valid) {
        return;
      }
      modifyPassword({
        oldPassword: md5Password(this.modifyPassword.model.oldPassword),
        newPassword: md5Password(this.modifyPassword.model.newPassword)
      }).then(res => {
        if (res.code === 0) {
          this.closeModify();
          this.$router.push({ name: 'SignIn' });
          this.$message.success('Password modified successfully, please sign in again');
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
