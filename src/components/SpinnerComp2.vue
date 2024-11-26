<template>
    <div class="spinner-container">
      <div class="chart-wrapper">
        <transition 
          name="slide-up" 
          mode="out-in"
          appear
        >
          <component :is="currentChart" :key="currentChart.name" />
        </transition>
      </div>
      <EllipseAnimation />
    </div>
  </template>
    
  <script>
  import LineChartLoader from '@/components/LineChartLoader.vue';
  import BarChartLoader from '@/components/BarChartLoader.vue';
  import ScatterChartLoader from '@/components/ScatterChartLoader.vue';
  import RadarChartLoader from '@/components/RadarChartLoader.vue';
  import GaugeChartLoader from '@/components/GaugeChartLoader.vue';
  import EllipseAnimation from '@/components/EllipseAnimation.vue';
    
  export default {
    components: {
      LineChartLoader,
      BarChartLoader,
      ScatterChartLoader,
      RadarChartLoader,
      GaugeChartLoader,
      EllipseAnimation,
    },
    data() {
      return {
        charts: [
          LineChartLoader,
          BarChartLoader,
          ScatterChartLoader,
          RadarChartLoader,
          GaugeChartLoader,
        ],
        currentChart: LineChartLoader,
        interval: null,
      };
    },
    mounted() {
      this.interval = setInterval(() => {
        const currentIndex = this.charts.indexOf(this.currentChart);
        const nextIndex = (currentIndex + 1) % this.charts.length;
        this.currentChart = this.charts[nextIndex];
      }, 3000); 
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
  </script>
    
  <style scoped>
  .spinner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px; 
    height: 250px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent!important;
    border-radius: 16px;
    padding: 20px;
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
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .spinner-container {
      width: 150px;
      height: 150px;
      padding: 10px;
    }
  }
  </style>