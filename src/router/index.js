import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreApplication from '../views/PreApplication.vue'
import PreDonation from '../views/PreDonation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pre-application',
    name: 'PreApplication',
    component: PreApplication
  },
  {
    path: '/pre-donation',
    name: 'PreDonation',
    component: () => import('../views/PreDonation.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/'),  // Changed from process.env.BASE_URL to '/'
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router