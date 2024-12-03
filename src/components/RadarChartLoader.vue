<template>
  <div class="chart-container">
    <svg 
      class="radar-chart-loader" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        :d="getDiamondPath(15)"
        fill="none"
        stroke="#3B82F6"
        stroke-width="3"
        :style="{ opacity: showBlue }"
      />
      <path
        :d="getDiamondPath(25)"
        fill="none"
        stroke="#EF4444"
        stroke-width="3"
        :style="{ opacity: showRed }"
      />
      <path
        :d="getDiamondPath(35)"
        fill="none"
        stroke="#10B981"
        stroke-width="3"
        :style="{ opacity: showGreen }"
      />
    </svg>
  </div>
</template>
    
<script>
export default {
  name: 'RadarChartLoader',
  data() {
    return {
      showBlue: 0,
      showRed: 0,
      showGreen: 0,
    };
  },
  mounted() {
    this.animateCircle('Blue', 0);
    this.animateCircle('Red', 500);
    this.animateCircle('Green', 1000);
  },
  methods: {
    animateCircle(color, delay) {
      setTimeout(() => {
        this[`show${color}`] = 1;
      }, delay);
    },
    getDiamondPath(size) {
      const center = 50;
      return `M ${center} ${center - size} 
              L ${center + size} ${center} 
              L ${center} ${center + size} 
              L ${center - size} ${center} 
              Z`;
    }
  }
};
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

.radar-chart-loader {
  width: 100% !important;
  height: 100% !important;
  max-height: 400px;
  border-radius: 8px;
  padding: 10px;
}

.radar-chart-loader path {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulse 2s infinite ease-in-out alternate;
  stroke-dasharray: 10;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    stroke-opacity: 0.7;
  }
  100% {
    transform: scale(1);
    stroke-opacity: 1;
  }
}

@media (max-width: 1024px) {
  .chart-container {
    min-height: 300px;
  }
}
</style>