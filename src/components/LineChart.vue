<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'LineChart',
    props: {
      chartData: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      const chartCanvas = ref(null);
      let chart = null;
  
      const createChart = () => {
        const ctx = chartCanvas.value.getContext('2d');
        chart = new Chart(ctx, {
          type: 'line',
          data: props.chartData,
          options: props.options
        });
      };
  
      onMounted(() => {
        createChart();
      });
  
      watch(() => props.chartData, (newVal) => {
        if (chart) {
          chart.data = newVal;
          chart.update();
        }
      }, { deep: true });
  
      return { chartCanvas };
    }
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  