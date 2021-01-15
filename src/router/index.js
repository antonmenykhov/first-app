import Vue from 'vue'
import VueRouter from 'vue-router'
const Home    = () => import('../views/Home.vue')
const Top     = () => import('../views/Top.vue')
const Profile = () => import('../views/Profile.vue')
const Tests   = () => import('../views/Tests.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
  {
    path: '/tests',
    name: 'Tests',
    component: Tests
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
