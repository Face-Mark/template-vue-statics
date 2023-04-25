import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index'
import Userinfo from './modules/userinfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    ...Userinfo
  ]

})

export default router
