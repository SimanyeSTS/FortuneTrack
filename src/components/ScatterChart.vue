<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'ScatterChart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chart = null;

    const createChart = () => {
  const ctx = chartCanvas.value.getContext('2d');
  
  chart = new Chart(ctx, {
    type: 'scatter',
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time Period (Years)',
            color: 'black'
          },
          ticks: {
            color: 'black'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Performance (%)',
            color: 'black'
          },
          ticks: {
            color: 'black'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'black'
          }
        }
      }
    }
  });
};

    onMounted(() => {
      if (props.chartData.datasets[0].data.some(val => val !== undefined)) {
        createChart();
      }
    });

    watch(() => props.chartData, (newVal) => {
      if (chart) {
        chart.destroy();
      }
      if (newVal.datasets[0].data.some(val => val !== undefined)) {
        createChart();
      }
    }, { deep: true });

    return { chartCanvas };
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: white;
  padding: 20px;
}
</style>