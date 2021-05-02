import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import '../assets/scss/style.scss'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
