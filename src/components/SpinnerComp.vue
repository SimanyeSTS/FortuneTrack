<template>
    <div class="spinner-container">
      <div class="spinner-border changing-spinner" role="status">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SpinnerComp"
  };
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;  /* Full width of the viewport */
  }
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  
  @keyframes colorChange {
    0% {
      border-color: #007bff; /* Primary (Blue) */
    }
    12.5% {
      border-color: #6c757d; /* Secondary (Gray) */
    }
    25% {
      border-color: #28a745; /* Success (Green) */
    }
    37.5% {
      border-color: #dc3545; /* Danger (Red) */
    }
    50% {
      border-color: #ffc107; /* Warning (Yellow) */
    }
    62.5% {
      border-color: #17a2b8; /* Info (Cyan) */
    }
    75% {
      border-color: #f8f9fa; /* Light (Light Grey) */
    }
    87.5% {
      border-color: #343a40; /* Dark (Black) */
    }
    100% {
      border-color: #007bff; /* Loop back to Primary (Blue) */
    }
  }
  
  .changing-spinner {
    animation: colorChange 2s linear infinite;
  }
  </style>
  