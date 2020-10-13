<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>User List</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :items="pages.values"
          :items-per-page.sync="pages.size"
          :headers="headers"
          :page.sync="pages.page"
          :server-items-length="pages.total"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getUsers } from '@/api/user';

export default {
  name: 'UserManager',
  data() {
    return {
      pages: {
        page: 1,
        size: 10,
        pages: 0,
        total: 0,
        values: []
      },
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email'}
      ]
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getUsers({
        page: 1,
        size: 10,
        name: '',
        username: '',
        email: '',
        active: '',
        order: 'name:0'
      }).then(res => {
        if (res.code === 0) {
          this.pages = res.data;
        } else {
          console.error(res.msg);
        }
      }).catch(err => {
        console.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
