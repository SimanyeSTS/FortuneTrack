<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid p-0">
      <router-link class="navbar-brand p-0" to="/">
        <img src="https://i.postimg.cc/2jBN8jdG/Fortune-Track-Logo.png" alt="logo" class="img-fluid" loading="lazy">
      </router-link>
      <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarSupportedContent" :aria-expanded="isNavbarOpen" aria-label="Toggle navigation">
        <div class="hamburger-icon" :class="{ 'is-active': isNavbarOpen }">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ show: isNavbarOpen }">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index" :style="getItemAnimationStyle(index)">
            <router-link class="nav-link" :to="item.to" @click="closeNavbar" active-class="active">
              {{ item.name }}
            </router-link>
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

.navbar-nav {
  gap: 20px;
}

.nav-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-item a {
  white-space: nowrap;
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
  padding: 0.5rem;
}

.hamburger-icon {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-icon .line {
  width: 100%;
  height: 2.4px;
  background-color: black;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

.hamburger-icon.is-active .line:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-icon.is-active .line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-icon.is-active .line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar-nav {
    flex-direction: column;
    gap: 10px;
  }
  .nav-item {
    margin-left: 1%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      isNavbarOpen: false,
      navItems: [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Predict', to: '/predict' },
        { name: 'Reach Me', to: '/contact' }
      ]
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
    getItemAnimationStyle(index) {
      return this.isNavbarOpen
        ? { animationDelay: `${index * 0.1}s` }
        : { opacity: 0, transform: 'translateY(20px)' };
    }
  }
};
</script>