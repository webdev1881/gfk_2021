import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/clasters',
    name: 'clasters',
    component: () => import('../views/Clasters.vue')
  },
  {
    path: '/asp',
    name: 'asp',
    component: () => import('../views/Asp.vue')
  },
  {
    path: '/brands',
    name: 'brands',
    component: () => import('../views/Brands.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
