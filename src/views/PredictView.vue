<template>
    <div class="predict-view">
      <h1>Predict</h1>
        <div v-for="(sector, sectorIndex) in sectors" :key="sectorIndex" class="sector-charts">
          <h2>{{ sector.name }}</h2>
          <div v-for="(data, dataIndex) in sector.data" :key="dataIndex" class="chart-container">
            <MainLineChart :chartData="prepareChartData(data)" />
          </div>
        </div>
      </div>
  </template>
  <script>
  import { defineComponent, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import MainLineChart from '../components/MainLineChart.vue';
  
  export default defineComponent({
    name: 'PredictView',
    components: {
      MainLineChart
    },
    setup() {
      const store = useStore();
  
      const isLoading = computed(() => store.state.isLoading);
      const error = computed(() => store.state.error);
  
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
          parseFloat(data.QuarterlyEarningsGrowthYOY) * 100, // Convert to percentage
          parseFloat(data.RevenueTTM) / 1e9, // Convert to billions
          parseFloat(data.AnalystTargetPrice),
          parseFloat(data.Week52High)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', // red will change
          'rgba(54, 162, 235, 0.7)', // blue will change
          'rgba(255, 206, 86, 0.7)', // yellow will change
          'rgba(75, 192, 192, 0.7)'  // green will change
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
        prepareChartData
      }
    }
  })
  </script>

  <style scoped>
  .predict-view {
    padding: 20px;
  }
  
  h2{
    text-align: center;
  }
  .sector-charts {
    margin-bottom: 40px;
  }
  
  .chart-container {
    margin-bottom: 20px;
    height: 400px;
  }

  h1{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
  }

  h2{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 25px;
  }
  </style>
  