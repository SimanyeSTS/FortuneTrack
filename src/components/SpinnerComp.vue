<template>
  <div class="spinner-container">
    <div class="spinner-border changing-spinner" role="status"></div>
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
  width: 100vw;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.25em solid transparent;
  border-top-color: #007bff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}

@keyframes colorChange {
  0% {
      border-top-color: #007bff; /* Primary (Blue) */
  }
  12.5% {
      border-top-color: #6c757d; /* Secondary (Gray) */
  }
  25% {
      border-top-color: #28a745; /* Success (Green) */
  }
  37.5% {
      border-top-color: #dc3545; /* Danger (Red) */
  }
  50% {
      border-top-color: #ffc107; /* Warning (Yellow) */
  }
  62.5% {
      border-top-color: #17a2b8; /* Info (Cyan) */
  }
  75% {
      border-top-color: #f8f9fa; /* Light (Light Grey) */
  }
  87.5% {
      border-top-color: #343a40; /* Dark (Black) */
  }
  100% {
      border-top-color: #007bff; /* Loop back to Primary (Blue) */
  }
}

.changing-spinner {
  animation: spin 1s linear infinite, colorChange 2s linear infinite;
}

@media (max-width: 300px) {
  .spinner-border {
      width: 2rem;
      height: 2rem;
  }
}

@media (max-width: 600px) {
  .spinner-border {
      width: 2.5rem;
      height: 2.5rem;
  }
}
</style>