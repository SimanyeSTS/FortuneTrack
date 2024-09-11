import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueChartJS from 'vue-chartjs';
import { Chart } from 'chart.js';

createApp(App)
  .use(store)
  .use(router)
  .use(VueChartJS, { Chart })
  .mount('#app')