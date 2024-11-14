<template>
  <div class="wrapper">
    <NavBar />
    <router-view />
    <FooterComp />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  components: {
    NavBar,
    FooterComp
  },
  mounted() {
    this.setupInactivityTimer();
  },
  beforeUnmount() {
    this.clearInactivityTimer();
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),

    setupInactivityTimer() {
      this.clearInactivityTimer(); 
      this.timeout = setTimeout(() => this.showLogoutWarning(), 600000);

      window.addEventListener('mousemove', this.resetTimer);
      window.addEventListener('keypress', this.resetTimer);
      window.addEventListener('touchstart', this.resetTimer);
    },
    
    resetTimer() {
      this.clearInactivityTimer();
      this.timeout = setTimeout(() => this.showLogoutWarning(), 600000);
    },

    clearInactivityTimer() {
      clearTimeout(this.timeout);
    },

    showLogoutWarning() {
  let countdown = 60;
  Swal.fire({
    title: 'Inactivity Warning',
    text: `You will be logged out in ${countdown} seconds due to inactivity.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Logout',
    cancelButtonText: 'Stay Logged In',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      const interval = setInterval(() => {
        countdown--;
        Swal.getContent().querySelector('p').textContent = `You will be logged out in ${countdown} seconds due to inactivity.`;
        if (countdown <= 0) {
          clearInterval(interval);
          this.handleLogout();
        }
      }, 1000);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.handleLogout();
    } else {
      this.resetTimer();
    }
  });
},

    handleLogout() {
      this.logoutUser();
      this.$router.push('/');
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0; 
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background-color: #000080; 
}

body {
  background-color: #000080;
}

footer {
  margin-top: auto;
}
</style>

<style src="@/assets/css/style.css"></style>