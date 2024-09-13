<template>
    <div>
      <h2>Retail Sector</h2>
      <MultiAxisLineChart :chartData="retailChartData" :chartOptions="retailChartOptions" />
  
      <h2>Food and Beverages Sector</h2>
      <MultiAxisLineChart :chartData="foodAndBeveragesChartData" :chartOptions="foodAndBeveragesChartOptions" />
  
      <h2>Technology Sector</h2>
      <MultiAxisLineChart :chartData="technologyChartData" :chartOptions="technologyChartOptions" />
  
      <h2>Healthcare Sector</h2>
      <MultiAxisLineChart :chartData="healthcareChartData" :chartOptions="healthcareChartOptions" />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import MultiAxisLineChart from './MainLineChart.vue';
  
  export default {
    name: 'SectorCharts',
    components: {
      MultiAxisLineChart
    },
    computed: {
      ...mapGetters(['allRetail', 'allFoodAndBeverages', 'allTechnology', 'allHealthcare']),
      
      retailChartData() {
        return this.getChartData(this.allRetail);
      },
      foodAndBeveragesChartData() {
        return this.getChartData(this.allFoodAndBeverages);
      },
      technologyChartData() {
        return this.getChartData(this.allTechnology);
      },
      healthcareChartData() {
        return this.getChartData(this.allHealthcare);
      },
  
      retailChartOptions() {
        return this.getChartOptions('Retail Sector Performance');
      },
      foodAndBeveragesChartOptions() {
        return this.getChartOptions('Food and Beverages Sector Performance');
      },
      technologyChartOptions() {
        return this.getChartOptions('Technology Sector Performance');
      },
      healthcareChartOptions() {
        return this.getChartOptions('Healthcare Sector Performance');
      }
    },
    methods: {
      getChartData(sectorData) {
        const labels = sectorData.map(item => item.Name);
        return {
          labels,
          datasets: [
            {
              label: 'Earnings Growth',
              data: sectorData.map(item => parseFloat(item.QuarterlyEarningsGrowthYOY)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Revenue (TTM)',
              data: sectorData.map(item => parseFloat(item.RevenueTTM)),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              yAxisID: 'y1',
            },
            {
              label: 'Analyst Target Price',
              data: sectorData.map(item => parseFloat(item.AnalystTargetPrice)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              yAxisID: 'y1',
            },
            {
              label: '52 Week High',
              data: sectorData.map(item => parseFloat(item.Week52High)),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              yAxisID: 'y1',
            }
          ]
        };
      },
      getChartOptions(title) {
        return {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: title
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Earnings Growth (%)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'Price ($)'
              }
            },
          }
        };
      }
    },
    mounted() {
      this.$store.dispatch('fetchRetail');
      this.$store.dispatch('fetchFoodAndBeverages')
      this.$store.dispatch('fetchTechnology')
      this.$store.dispatch('fetchHealthcare')
    }
  }
  </script>