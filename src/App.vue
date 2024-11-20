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
  data() {
    return {
      inactivityTimeout: null,
      warningInterval: null,
      INACTIVITY_DURATION: 600000, // 10 minutes
      WARNING_DURATION: 30000, // 30 seconds warning
    }
  },
  computed: {
    ...mapGetters(['current']), // Get the current user from Vuex
  },
  mounted() {
    // Only set up listeners if a user is logged in
    if (this.current) {
      this.setupInactivityTracking();
    }
  },
  beforeUnmount() {
    this.removeInactivityTracking();
  },
  methods: {
    setupInactivityTracking() {
      // Remove any existing listeners to prevent duplicates
      this.removeInactivityTracking();

      // List of events that reset the inactivity timer
      const resetEvents = [
        'mousedown', 'mousemove', 'keydown', 
        'scroll', 'touchstart', 'touchmove', 
        'wheel', 'click'
      ];

      // Add event listeners for each reset event
      resetEvents.forEach(eventName => {
        window.addEventListener(eventName, this.resetInactivityTimer, { passive: true });
      });

      // Set initial inactivity timeout
      this.resetInactivityTimer();
    },

    removeInactivityTracking() {
      // Clear existing timers
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }
      if (this.warningInterval) {
        clearInterval(this.warningInterval);
      }

      // Remove all event listeners
      const resetEvents = [
        'mousedown', 'mousemove', 'keydown', 
        'scroll', 'touchstart', 'touchmove', 
        'wheel', 'click'
      ];

      resetEvents.forEach(eventName => {
        window.removeEventListener(eventName, this.resetInactivityTimer);
      });
    },

    resetInactivityTimer() {
      // Clear existing timeout
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      // If no logged-in user, do nothing
      if (!this.current) {
        return;
      }

      // Set new timeout for inactivity
      this.inactivityTimeout = setTimeout(() => {
        this.showLogoutWarning();
      }, this.INACTIVITY_DURATION);
    },

    showLogoutWarning() {
      // Ensure user is still logged in
      if (!this.current) return;

      let countdown = this.WARNING_DURATION / 1000; // Convert to seconds

      // Show SweetAlert warning
      Swal.fire({
        title: 'Inactivity Warning',
        html: `<p>You will be logged out in <strong>${countdown}</strong> seconds due to inactivity.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Stay Logged In',
        cancelButtonText: 'Logout',
        allowOutsideClick: false,
        timer: this.WARNING_DURATION,
        timerProgressBar: true,
        didOpen: () => {
          // Countdown interval
          this.warningInterval = setInterval(() => {
            countdown--;
            const content = Swal.getHtmlContainer();
            if (content && countdown > 0) {
              content.querySelector('strong').textContent = countdown.toString();
            } else {
              // Stop interval and logout
              clearInterval(this.warningInterval);
              this.handleLogout();
            }
          }, 1000);
        },
        willClose: () => {
          // Clear interval on modal close
          clearInterval(this.warningInterval);
        },
        preConfirm: () => {
          // Reset timer if 'Stay Logged In' is clicked
          this.resetInactivityTimer();
        },
        customClass: {
          popup: 'inactivity-modal'
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer || result.isDenied) {
          // Automatically logout if timer expires or user chooses to logout
          this.handleLogout();
        } else if (result.isConfirmed) {
          // User wants to stay logged in
          this.resetInactivityTimer();
        }
      });
    },

    handleLogout() {
      // Ensure we have a logged-in user before attempting logout
      if (this.current) {
        this.$store.dispatch('logoutUser')
          .then(() => {
            // Clear any remaining tracking
            this.removeInactivityTracking();
            // Redirect to home/login page
            this.$router.push('/');
          })
          .catch((error) => {
            console.error("Logout failed:", error);
            // Fallback redirect even if logout fails
            this.$router.push('/');
          });
      }
    }
  }
}
</script>

<style>
/* Keep existing styles */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #000080; 
}

html, body {
  height: 100%;
  margin: 0; 
}

body {
  background-color: #000080;
}

footer {
  margin-top: auto;
}

/* Responsive modal styling */
@media (max-width: 768px) {
  /* Mobile-specific adjustments can be added here */
}
</style>

<style src="@/assets/css/style.css"></style>