import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PredictView from '@/views/PredictView.vue'
import ReachMeView from '@/views/ReachMeView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import UserDashboardView from '@/views/UserDashboardView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import PredictionDataView from '@/views/PredictionDataView.vue'
import store from '../store/index.js' // Import your Vuex store

// Navigation guard for checking authentication
const requireAuth = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser) {
    // Redirect to home page with a return url
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
    return;
  }
  next();
};

// Navigation guard for checking admin role
const requireAdmin = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser || currentUser.userRole !== 'Admin') {
    // Redirect to home page if not admin
    next({
      path: '/',
      query: { message: 'Unauthorized. Admin access required.' }
    });
    return;
  }
  next();
};

// Navigation guard for checking user role
const requireUser = (to, from, next) => {
  const currentUser = store.getters.current;
  if (!currentUser || currentUser.userRole !== 'User') {
    // Redirect to home page if not a regular user
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
    beforeEnter: requireAdmin // Add admin role check
  },
  {
    path: '/user',
    name: 'user-dashboard',
    component: UserDashboardView,
    beforeEnter: requireUser // Add user role check
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
    beforeEnter: requireAuth // Add authentication check
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Global navigation guard to check for stored token on app startup
router.beforeEach((to, from, next) => {
  // Check if we have a token in localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (token && user && !store.getters.current) {
    // If we have a token but no user in Vuex, set the user
    store.commit('SET_USER', user);
    store.commit('SET_TOKEN', token);
  }
  
  next();
});

export default router;