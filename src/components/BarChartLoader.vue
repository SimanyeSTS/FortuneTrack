<template>
  <div class="chart-container">
    <svg 
      class="bar-chart-loader" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="25" y="30" width="15" height="40" fill="#3B82F6" :style="{ opacity: showBlue }"/>
      <rect x="45" y="20" width="15" height="60" fill="#EF4444" :style="{ opacity: showRed }"/>
      <rect x="65" y="40" width="15" height="20" fill="#10B981" :style="{ opacity: showGreen }"/>
    </svg>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      showBlue: 0,
      showRed: 0,
      showGreen: 0,
    };
  },
  mounted() {
    this.animateBar('Blue', 0);
    this.animateBar('Red', 500);
    this.animateBar('Green', 1000);
  },
  methods: {
    animateBar(color, delay) {
      setTimeout(() => {
        this[`show${color}`] = 1;
      }, delay);
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

.bar-chart-loader {
  width: 100% !important;
  height: 100% !important;
  max-height: 400px;
  border-radius: 8px;
  padding: 10px;
}

.bar-chart-loader rect {
  transform-origin: bottom;
  animation: pulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scaleY(0.8);
    opacity: 0.7;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .chart-container {
    min-height: 300px;
  }
}
</style>