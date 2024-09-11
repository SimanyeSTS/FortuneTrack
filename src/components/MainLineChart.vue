<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  <script>
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'MainChart',
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const chartCanvas = ref(null)
      let chart = null
  
      const createChart = () => {
  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'bar',
    data: props.chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index) {
              if (index === 0) return value + '%'
              if (index === 1) return '$' + value + 'B'
              return '$' + value
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.parsed.y !== null) {
                if (context.dataIndex === 0) {
                  label += context.parsed.y.toFixed(2) + '%'
                } else if (context.dataIndex === 1) {
                  label += '$' + context.parsed.y.toFixed(2) + 'B'
                } else {
                  label += '$' + context.parsed.y.toFixed(2)
                }
              }
              return label
            }
          }
        }
      }
    }
  })
}
  
      onMounted(() => {
        createChart()
      })
  
      watch(() => props.chartData, (newVal) => {
        if (chart) {
          chart.data = newVal
          chart.update()
        }
      }, { deep: true })
  
      return { chartCanvas }
    }
  });
  </script>
  <style scoped>
  canvas{
    background-color: white;
  }
  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
    padding-left: 7%;
    cursor: pointer;
  }
  </style>
  