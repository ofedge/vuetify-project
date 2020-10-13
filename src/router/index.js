import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: () => import('../views/signIn/SignIn')
  },
  {
    path: '/main',
    name: 'Main',
    redirect: '/main/user',
    component: () => import('../components/layout/LayoutMain'),
    children: [{
      path: 'user',
      name: 'UserManager',
      component: () => import('../views/user/Index')
    }, {
      path: 'role',
      name: 'RoleManager',
      component: () => import('../views/role/Index')
    }, {
      path: 'test',
      name: 'TestPage',
      component: () => import('../views/test/Index')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
