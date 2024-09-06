import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PredictView from '@/views/PredictView.vue'
import ReachMeView from '@/views/ReachMeView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import UserDashboardView from '@/views/UserDashboardView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import PredictionDataView from '@/views/PredictionDataView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about-me',
    component: AboutView
  },
  {
    path: '/predict',
    name: 'predictions',
    component: PredictView
  },
  {
    path: '/contact',
    name: 'reach-me',
    component: ReachMeView
  },
  {
    path: '/admin',
    name:  'admin-dashboard',
    component: AdminDashboardView
  },
  {
    path: '/user',
    name: 'user-dashboard',
    component: UserDashboardView
  },
  {
    path: '/register',
    name: '/sign-up',
    component: RegistrationView
  },
  {
    path: '/real-time-prediiction',
    name: 'prediction-data',
    component: PredictionDataView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
