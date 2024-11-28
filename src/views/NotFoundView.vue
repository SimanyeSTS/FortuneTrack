<template>
    <h1 class="heading">Page Not Found</h1>
    <div class="not-found-container">
      <h1 class="not-found-title">404 - Page Not Found</h1>
      <div class="content-wrapper">
        <SpinnerComp3 />
        <EllipseAnimation2 />
      </div>
    </div>
  </template>
  
  <script>
  import SpinnerComp3 from '@/components/SpinnerComp3.vue';
  import EllipseAnimation2 from '@/components/EllipseAnimation2.vue';
  
  export default {
    name: 'NotFoundView',
    components: {
      SpinnerComp3,
      EllipseAnimation2
    },
    mounted() {
      window.scrollTo(0, 0);
    }
  };
  </script>
  
  <style scoped>
  .not-found-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #000080;
}

.heading {
  margin-top: 1%;
  margin: 1%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}
  
  .not-found-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .content-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    .not-found-title {
      font-size: 2rem;
    }
  }

  @media (max-width: 600px) {
    .heading {
        font-size: 24px;
    }
  }

  @media (max-width: 300px) {
    .heading {
        font-size: 22px;
    }
  }
  
  @media (max-width: 480px) {
    .not-found-title {
      font-size: 1.5rem;
    }
  }
  </style>
  