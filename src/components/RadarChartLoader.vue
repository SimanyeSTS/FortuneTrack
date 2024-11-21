<template>
    <svg class="radar-chart-loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="15" fill="none" stroke="#3B82F6" stroke-width="3" :style="{ opacity: showBlue }"/>
      <circle cx="50" cy="50" r="25" fill="none" stroke="#EF4444" stroke-width="3" :style="{ opacity: showRed }"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" stroke-width="3" :style="{ opacity: showGreen }"/>
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
      this.animateCircle('Blue', 0);
      this.animateCircle('Red', 500);
      this.animateCircle('Green', 1000);
    },
    methods: {
      animateCircle(color, delay) {
        setTimeout(() => {
          this[`show${color}`] = 1;
        }, delay);
      }
    }
  };
  </script>
    
  <style scoped>
  .radar-chart-loader {
    background-color: transparent!important;
    border-radius: 8px;
    padding: 10px;
  }
  
  .radar-chart-loader circle {
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
  </style>