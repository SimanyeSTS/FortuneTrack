<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'RadarChart',
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
      const defaultOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      };

      chart = new Chart(ctx, {
        type: 'radar',
        data: props.chartData,
        options: { ...defaultOptions, ...props.options }
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (chart) {
        chart.resize();
      }
    });

    onMounted(() => {
      createChart();
      resizeObserver.observe(chartCanvas.value);
    });

    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
      resizeObserver.disconnect();
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
position: relative;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
}

canvas {
width: 100% !important;
height: 100% !important;
max-height: 400px;
background-color: white;
}

@media (max-width: 1024px) {
.chart-container {
  min-height: 300px;
}
}
</style>