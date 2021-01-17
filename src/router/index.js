import Vue from 'vue'
import VueRouter from 'vue-router'
const Home    = () => import('../views/Home.vue')
const Top     = () => import('../views/Top.vue')
const Profile = () => import('../views/Profile.vue')
const Tests   = () => import('../views/Tests.vue')
const Test   = () => import('../views/Test.vue')
const Questions = () => import('../views/Questions.vue')


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
  {
    path: '/test',
    name: 'Test',
    component: Test,
    props: true
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions,
    props: true
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
