<template>
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid p-0">
        <router-link class="navbar-brand p-0" to="/">
          <img src="https://i.postimg.cc/2jBN8jdG/Fortune-Track-Logo.png" alt="logo" class="img-fluid" loading="lazy">
        </router-link>
        <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarSupportedContent" :aria-expanded="isNavbarOpen" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" :class="{'d-none': isNavbarOpen}"></span>
          <span class="navbar-toggler-icon-x" v-if="isNavbarOpen"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ show: isNavbarOpen }">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/" @click="closeNavbar" active-class="active"> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" @click="closeNavbar" active-class="active"> About </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/predict" @click="closeNavbar" active-class="active"> Predict </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" @click="closeNavbar" active-class="active"> Reach Me </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <style scoped>
  nav {
    padding: 0px;
    margin: 0px;
    background-color: #4169E1;
  }
  
  .navbar-brand,
  .nav-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: black;
    font-size: 24px;
  }
  
  .nav-link:hover {
    color: white;
  }
  
  .nav-link.active {
    color: white;
  }
  
  .navbar-toggler {
    margin-right: 2%;
    border-color: black;
  }
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 7h22M4 13h22M4 19h22'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 4px;
    height: 30px;
    width: 30px;
  }
  
  .navbar-toggler-icon-x {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .navbar-toggler-icon-x::before,
  .navbar-toggler-icon-x::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: black;
  }
  
  .navbar-toggler-icon-x::before {
    transform: rotate(45deg);
  }
  
  .navbar-toggler-icon-x::after {
    transform: rotate(-45deg);
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        isNavbarOpen: false,
      };
    },
    methods: {
      toggleNavbar() {
        this.isNavbarOpen = !this.isNavbarOpen;
      },
      closeNavbar() {
        this.isNavbarOpen = false;
        let navbarCollapse = document.getElementById('navbarSupportedContent');
        navbarCollapse.classList.remove('show');
      },
    },
  };
  </script>