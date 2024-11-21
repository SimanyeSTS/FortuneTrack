<template>
    <p class="loading-text">Loading<span v-for="i in ellipses" :key="i">{{ '.' }}</span></p>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ellipses: 0,
        interval: null,
      };
    },
    mounted() {
      this.interval = setInterval(() => {
        this.ellipses = (this.ellipses + 1) % 4;
      }, 1000); 
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
  };
  </script>
  
  <style scoped>
  .loading-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    color: white;
    margin-bottom: 20px;
  }
  </style>