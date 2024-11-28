<template>
    <div class="spinner-container">
      <div class="chart-wrapper">
        <transition name="slide-up" mode="out-in" appear>
          <component 
            :is="currentChart" 
            :key="currentChartIndex" 
          />
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import LineChartLoader from './LineChartLoader.vue';
  import BarChartLoader from './BarChartLoader.vue';
  import ScatterChartLoader from './ScatterChartLoader.vue';
  import RadarChartLoader from './RadarChartLoader.vue';
  import GaugeChartLoader from './GaugeChartLoader.vue';
  
  export default {
    name: 'SpinnerComp3',
    components: {
      LineChartLoader,
      BarChartLoader,
      ScatterChartLoader,
      RadarChartLoader,
      GaugeChartLoader,
    },
    setup() {
      const charts = [
        LineChartLoader,
        BarChartLoader,
        ScatterChartLoader,
        RadarChartLoader,
        GaugeChartLoader,
      ];
      const currentChart = ref(charts[0]);
      const currentChartIndex = ref(0);
      let interval = null;
  
      onMounted(() => {
        interval = setInterval(() => {
          currentChartIndex.value = (currentChartIndex.value + 1) % charts.length;
          currentChart.value = charts[currentChartIndex.value];
        }, 3000);
      });
  
      onBeforeUnmount(() => {
        if (interval) {
          clearInterval(interval);
        }
      });
  
      return {
        currentChart,
        currentChartIndex,
      };
    },
  };
  </script>
  
  <style scoped>
  .spinner-container {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  
  .chart-wrapper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }
  
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  
  @media (max-width: 768px) {
    .spinner-container {
      width: 200px;
      height: 200px;
    }
  }
  
  @media (max-width: 480px) {
    .spinner-container {
      width: 150px;
      height: 150px;
    }
  }
  </style>