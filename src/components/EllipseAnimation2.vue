<template>
    <div class="ellipse-container">
      <p class="loading-text">
        Oops! You seem to have taken a wrong turn...
        <br>
        Redirecting to home in <span class="countdown">{{ countdown }}</span>
        <span class="dots">{{ ellipses }}</span>
      </p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'EllipseAnimation2',
    setup() {
      const router = useRouter();
      const ellipses = ref('');
      const countdown = ref(5);
      let ellipsesInterval = null;
      let countdownInterval = null;
  
      const redirectToHome = () => {
        router.push('/');
      };
  
      onMounted(() => {
        ellipsesInterval = setInterval(() => {
          if (ellipses.value.length < 3) {
            ellipses.value += '.';
          } else {
            ellipses.value = '';
          }
        }, 500);
  
        countdownInterval = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--;
          } else {
            clearInterval(countdownInterval);
            clearInterval(ellipsesInterval);
            redirectToHome();
          }
        }, 1000);
      });
  
      onBeforeUnmount(() => {
        clearInterval(ellipsesInterval);
        clearInterval(countdownInterval);
      });
  
      return {
        ellipses,
        countdown,
      };
    },
  };
  </script>
  
  <style scoped>
  .ellipse-container {
    margin-top: 2rem;
    text-align: center;
  }
  
  .loading-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
    line-height: 1.5;
  }
  
  .countdown {
    font-weight: 700;
    color: #3B82F6;
  }
  
  .dots {
    display: inline-block;
    min-width: 24px;
  }
  
  @media (max-width: 768px) {
    .loading-text {
      font-size: 1rem;
    }
  }
  </style>