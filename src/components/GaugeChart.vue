<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import 'chartjs-gauge';  // Ensure the chartjs-gauge plugin is imported
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import datalabels plugin

export default defineComponent({
  name: 'GaugeChart',
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
      // Registering plugins
      Chart.register(ChartDataLabels);
      
      // Create the gauge chart
      chart = new Chart(ctx, {
        type: 'gauge',  // Type is gauge
        data: props.chartData,
        options: {
          ...props.options,
          plugins: {
            datalabels: {
              display: true,
              formatter: function (value, context) {
                return context.chart.data.labels[context.dataIndex];  // Label for each section
              },
              color: 'rgba(0, 0, 0, 1.0)',  // Label color
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          }
        }
      });
    };

    // Create the chart on component mount
    onMounted(() => {
      createChart();
    });

    // Watch for chartData changes and update the chart
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
