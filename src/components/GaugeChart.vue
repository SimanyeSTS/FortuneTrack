<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'GaugeChart',
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
      
      // Get the data values
      const lowPrice = parseFloat(props.chartData.datasets[0].data[0]);
      const highPrice = parseFloat(props.chartData.datasets[0].data[1]);
      const currentPrice = parseFloat(props.chartData.datasets[0].data[2]); // median
      
      // Calculate the percentage for the gauge
      const percentage = ((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100;

      const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          tooltip: {
  enabled: true,
  callbacks: {
    label: function(tooltipItem) {
      const datasetIndex = tooltipItem.dataIndex; // Get the index of the dataset being hovered
      const lowPrice = parseFloat(props.chartData.datasets[0].data[0]);
      const highPrice = parseFloat(props.chartData.datasets[0].data[1]);
      const currentPrice = parseFloat(props.chartData.datasets[0].data[2]);

      if (datasetIndex === 0) {
        return `Current Price: $${currentPrice.toFixed(2)}`; // Show current price for the first segment
      } else {
        return `Remaining Percentage: ${((100 - ((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100)).toFixed(1)}%`; // Show remaining percentage for the second segment
      }
    }
  }
},
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Price Range',
            color: 'black',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      };

      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [percentage, 100 - percentage],
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',  // Vibrant blue for the percentage
              'rgba(200, 200, 200, 0.5)'  // Light grey for the remaining part
            ],
            circumference: 180,
            rotation: 270,
          }]
        },
        options: defaultOptions
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
        const lowPrice = parseFloat(newVal.datasets[0].data[0]);
        const highPrice = parseFloat(newVal.datasets[0].data[1]);
        const currentPrice = parseFloat(newVal.datasets[0].data[2]);

        const newPercentage = ((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100;

        chart.data.datasets[0].data = [newPercentage, 100 - newPercentage];
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
  height: 400px; /* Adjust height as needed */
  background-color: white;
}
</style>