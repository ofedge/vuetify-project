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
    component: () => import('../components/layout/LayoutMain')
  }
]

const router = new VueRouter({
  routes
})

export default router
