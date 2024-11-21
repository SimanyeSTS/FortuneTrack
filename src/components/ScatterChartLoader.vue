<template>
    <svg class="scatter-chart-loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="30" cy="30" r="8" fill="#3B82F6" :style="{ opacity: showBlue }"/>
      <circle cx="50" cy="50" r="12" fill="#EF4444" :style="{ opacity: showRed }"/>
      <circle cx="70" cy="70" r="16" fill="#10B981" :style="{ opacity: showGreen }"/>
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
      this.animateDot('Blue', 0);
      this.animateDot('Red', 500);
      this.animateDot('Green', 1000);
    },
    methods: {
      animateDot(color, delay) {
        setTimeout(() => {
          this[`show${color}`] = 1;
        }, delay);
      }
    }
  };
  </script>
    
  <style scoped>
  .scatter-chart-loader {
    background-color: transparent!important;
    border-radius: 8px;
    padding: 10px;
  }
  
  .scatter-chart-loader circle {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: float 2s infinite ease-in-out alternate;
  }
  
  @keyframes float {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(5px);
    }
  }
  </style>