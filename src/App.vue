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
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    FooterComp
  },
  computed: {
    ...mapGetters(['current']), // Get the current user from Vuex
  },
  mounted() {
    this.setupInactivityTimer();
    window.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.clearInactivityTimer();
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
  methods: {
    setupInactivityTimer() {
      // Only set up the timer if there is a logged-in user
      if (this.current) {
        this.clearInactivityTimer();
        this.timeout = setTimeout(() => this.showLogoutWarning(), 600000);

        // Event listeners for desktop and mobile interaction
        window.addEventListener('mousemove', this.resetTimer);
        window.addEventListener('keypress', this.resetTimer);
        window.addEventListener('touchstart', this.resetTimer);
        window.addEventListener('touchmove', this.resetTimer);
        window.addEventListener('scroll', this.resetTimer);
      }
    },

    resetTimer() {
      this.clearInactivityTimer();
      this.timeout = setTimeout(() => this.showLogoutWarning(), 600000);
    },

    clearInactivityTimer() {
      clearTimeout(this.timeout);
    },

    showLogoutWarning() {
      let countdown = 30;
      Swal.fire({
        title: 'Inactivity Warning',
        html: `<p>You will be logged out in <strong>${countdown}</strong> seconds due to inactivity.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Stay Logged In',
        allowOutsideClick: false,
        didOpen: () => {
          const interval = setInterval(() => {
            countdown--;
            const content = Swal.getHtmlContainer();
            if (content && countdown > 0) {
              content.querySelector('strong').textContent = countdown.toString();
            } else if (countdown <= 0) {
              clearInterval(interval);
              this.handleLogout();
              Swal.close();
            }
          }, 1000);
          this.countdownInterval = interval;
        },
        willClose: () => {
          clearInterval(this.countdownInterval);
        },
        customClass: {
          popup: 'inactivity-modal'
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
      this.$store.dispatch('logoutUser')
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    },

    handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        // User has switched tabs/apps (consider starting the timer)
        this.resetTimer();
      } else {
        // User has returned to the app (reset the timer)
        this.resetTimer();
      }
    }
  }
}
</script>

<style>
/* Basic styling for the layout */
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

/* Styling for SweetAlert2 on smaller screens */
.inactivity-modal {
  font-size: 16px; /* Adjust font size for mobile readability */
  max-width: 90%; /* Limit modal width on small screens */
}

@media (max-width: 768px) {
  /* Adjustments for mobile devices */
  /* .wrapper {
    padding: 0 10px;
  } */

  /* .inactivity-modal {
    font-size: 14px; Slightly smaller font size for better fit 
  } */

  /* footer {
    padding-bottom: 20px;
  } */
}
</style>

<style src="@/assets/css/style.css"></style>
