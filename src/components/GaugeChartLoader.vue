<template>
    <svg class="gauge-chart-loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="30" width="60" height="8" fill="#3B82F6" :style="{ opacity: showBlue }"/>
      <rect x="30" y="50" width="40" height="8" fill="#EF4444" :style="{ opacity: showRed }"/>
      <rect x="40" y="70" width="20" height="8" fill="#10B981" :style="{ opacity: showGreen }"/>
    </svg>
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
  .gauge-chart-loader {
    background-color: transparent!important;
    border-radius: 8px;
    padding: 10px;
  }
  
  .gauge-chart-loader rect {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
    animation: expand 1.5s infinite alternate ease-in-out;
  }
  
  @keyframes expand {
    0% {
      transform: scaleX(0.9);
      opacity: 0.7;
    }
    100% {
      transform: scaleX(1);
      opacity: 1;
    }
  }
  </style>