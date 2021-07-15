import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Wall from '../pages/Wall.vue'
import Admin from '../pages/Admin.vue'

import '../assets/scss/style.scss'


const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Wall',
    component: Wall,
    beforeEnter(to, from, next){
      let tokenInformation = JSON.parse(localStorage.getItem("token"));
      if(!tokenInformation || tokenInformation.expire < Date.now()){
        next({
          path: '/login',
        })
      }
      next()
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
