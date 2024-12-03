<template>
  <div class="chart-container">
    <svg class="line-chart-loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <rect x="10" y="30" width="20" height="10" fill="#3B82F6" :style="{ opacity: showBlue }"/>
      <rect x="40" y="50" width="20" height="10" fill="#EF4444" :style="{ opacity: showRed }"/>
      <rect x="70" y="20" width="20" height="10" fill="#10B981" :style="{ opacity: showGreen }"/>
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

.line-chart-loader {
  width: 100% !important;
  height: 100% !important;
  max-height: 400px;
  border-radius: 8px;
  padding: 10px;
}

.line-chart-loader rect {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    opacity: 0.6;
    transform: scaleX(0.9);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0.6;
    transform: scaleX(0.9);
  }
}

@media (max-width: 1024px) {
  .chart-container {
    min-height: 300px;
  }
}
</style>