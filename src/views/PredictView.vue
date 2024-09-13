<template>
  <div class="predict-view">
    <h1>Predict</h1>
    <div class="button-container">
      <button class="acc" @click="redirectToAccount">Account</button>      
      <button class="logout">Logout</button>
    </div>
    <div v-for="(sector, sectorIndex) in sectors" :key="sectorIndex" class="sector-charts">
      <h2>{{ sector.name }}</h2>
      <div v-for="(data, dataIndex) in sector.data" :key="dataIndex" class="chart-container-wrapper">
        <div class="chart-container">
          <MainLineChart :chartData="prepareChartData(data)" />
        </div>
        <MainSideWindow :data="data" :sector="sector.name" />
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MainLineChart from '@/components/MainLineChart.vue';
import MainSideWindow from '@/components/MainSideWindow.vue';

export default defineComponent({
  name: 'PredictView',
  components: {
    MainLineChart,
    MainSideWindow
  },
  methods: {
    redirectToAccount() {
      this.$router.push({ name: 'user-dashboard' });
    },
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading)
    const error = computed(() => store.state.error)

    const sectors = computed(() => [
      { name: 'Retail', data: store.state.retail },
      { name: 'Technology', data: store.state.technology },
      { name: 'Food and Beverages', data: store.state.foodAndBeverages },
      { name: 'Healthcare', data: store.state.healthcare }
    ])

    const prepareChartData = (data) => {
      return {
        labels: ['Earnings Growth', 'Revenue', 'Analyst Target Price', 'Week 52 High'],
        datasets: [
          {
            label: data.Symbol,
            data: [
              parseFloat(data.QuarterlyEarningsGrowthYOY) * 100, 
              parseFloat(data.RevenueTTM) / 1e9, 
              parseFloat(data.AnalystTargetPrice),
              parseFloat(data.Week52High)
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', 
              'rgba(54, 162, 235, 0.7)', 
              'rgba(255, 206, 86, 0.7)', 
              'rgba(75, 192, 192, 0.7)'  
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    }

    onMounted(() => {
      store.dispatch('fetchRetail')
      store.dispatch('fetchTechnology')
      store.dispatch('fetchFoodAndBeverages')
      store.dispatch('fetchHealthcare')
    })
    
    return {
      isLoading,
      error,
      sectors,
      prepareChartData,
    }
  }
})
</script>
  
  <style scoped>
  .predict-view {
    padding: 20px;
  }
  
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
  }
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 25px;
    text-align: center;
  }
  
  .chart-container-wrapper {
    display: flex;
    align-items: stretch;
    margin-bottom: 40px;
    gap: 0;
  }
  
  .chart-container {
    flex: 1;
    height: 400px;
    padding-left: 6%;
  }
  
  MainSideWindow {
    flex: 0 0 300px;
    padding: 20px;
  }
  
  .card {
    margin-right: 17rem;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 20px;
    top: 6rem !important;
    position: fixed;
  }
  
  button {
    background-color: white;
    color: black;
    border: 2px solid #3668ff;
    padding: 8px !important;
    width: 6rem !important;
    margin-bottom: 10px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 1em;
    cursor: pointer;
    border-radius: 20%;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #3668ff;
    color: white;
    border: solid black;
  }
  </style>