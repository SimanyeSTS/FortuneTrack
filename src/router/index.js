import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PredictView from '@/views/PredictView.vue'
import ReachMeView from '@/views/ReachMeView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import UserDashboardView from '@/views/UserDashboardView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import PredictionDataView from '@/views/PredictionDataView.vue'
import NotFoundView from '@/views/NotFoundView.vue' // Add this import
import store from '../store/index.js'

const requireAuth = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
    return;
  }
  next();
};

const requireAdmin = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser || currentUser.userRole !== 'Admin') {
    next({
      path: '/',
      query: { message: 'Unauthorized. Admin access required.' }
    });
    return;
  }
  next();
};

const requireUser = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser || currentUser.userRole !== 'User') {
    next({
      path: '/',
      query: { message: 'Unauthorized. User access required.' }
    });
    return;
  }
  next();
};

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
    name: 'admin-dashboard',
    component: AdminDashboardView,
    beforeEnter: requireAdmin
  },
  {
    path: '/user',
    name: 'user-dashboard',
    component: UserDashboardView,
    beforeEnter: requireUser
  },
  {
    path: '/register',
    name: 'sign-up',
    component: RegistrationView
  },
  {
    path: '/real-time-prediction/:symbol/:sector',
    name: 'prediction-data',
    component: PredictionDataView,
    props: true,
    beforeEnter: requireAuth
  },
  // Add the 404 route at the end to catch all unmatched routes
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (token && user && !store.getters.current) {
    store.commit('SET_USER', user);
    store.commit('SET_TOKEN', token);
  }
  
  next();
});

export default router;