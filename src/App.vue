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
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
  components: {
    NavBar,
    FooterComp
  },
  data() {
    return {
      inactivityTimeout: null,
      tokenCheckInterval: null,
      INACTIVITY_DURATION: 15 * 60 * 1000, // 15 minutes
      WARNING_DURATION: 30 * 1000, // 30 seconds warning
      TOKEN_CHECK_INTERVAL: 5 * 60 * 1000, // Check token every 5 minutes
      resetEvents: [
        'mousedown', 'mousemove', 'keydown', 
        'scroll', 'touchstart', 'touchmove', 
        'wheel', 'click'
      ],
      lastActivityTime: null
    }
  },
  computed: {
    ...mapGetters(['current']),
    isLoggedIn() {
      return this.current !== null && this.current !== undefined;
    }
  },
  watch: {
    // Reset tracking when login state changes
    isLoggedIn(newValue) {
      if (newValue) {
        this.setupInactivityTracking();
        this.setupTokenChecking();
      } else {
        this.removeInactivityTracking();
        this.removeTokenChecking();
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.setupInactivityTracking();
      this.setupTokenChecking();
    }
  },
  beforeUnmount() {
    this.removeInactivityTracking();
    this.removeTokenChecking();
  },
  methods: {
    ...mapActions(['checkTokenExpiration', 'autoLogout']),

    setupTokenChecking() {
      this.removeTokenChecking();

      this.tokenCheckInterval = setInterval(async () => {
        if (this.isLoggedIn) {
          const tokenExpired = await this.$store.dispatch('checkTokenExpiration');
          if (tokenExpired) {
            this.handleLogout();
          }
        }
      }, this.TOKEN_CHECK_INTERVAL);
    },

    removeTokenChecking() {
      if (this.tokenCheckInterval) {
        clearInterval(this.tokenCheckInterval);
        this.tokenCheckInterval = null;
      }
    },

    setupInactivityTracking() {
      // Remove any existing listeners first
      this.removeInactivityTracking();

      // Add new event listeners
      this.resetEvents.forEach(eventName => {
        window.addEventListener(eventName, this.resetInactivityTimer, { passive: true });
      });

      // Initialize last activity time
      this.lastActivityTime = Date.now();

      // Start the initial inactivity timer
      this.startInactivityTimer();
    },

    removeInactivityTracking() {
      // Clear existing timeout
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
        this.inactivityTimeout = null;
      }

      // Remove all event listeners
      this.resetEvents.forEach(eventName => {
        window.removeEventListener(eventName, this.resetInactivityTimer);
      });
    },

    startInactivityTimer() {
      // Clear any existing timeout
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      // Set new timeout for inactivity
      this.inactivityTimeout = setTimeout(() => {
        // Check if user is still logged in and actually inactive
        const timeSinceLastActivity = Date.now() - this.lastActivityTime;
        if (this.isLoggedIn && timeSinceLastActivity >= this.INACTIVITY_DURATION) {
          this.showLogoutWarning();
        }
      }, this.INACTIVITY_DURATION);
    },

    resetInactivityTimer() {
      // Update last activity time
      this.lastActivityTime = Date.now();

      // If no logged-in user, do nothing
      if (!this.isLoggedIn) {
        return;
      }

      // Restart the inactivity timer
      this.startInactivityTimer();
    },

    showLogoutWarning() {
      // Ensure user is still logged in
      if (!this.isLoggedIn) return;

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
      if (this.isLoggedIn) {
        this.$store.dispatch('autoLogout')
          .then(() => {
            // Clear any remaining tracking
            this.removeInactivityTracking();
            this.removeTokenChecking();
            // Redirect to home/login page after successful logout
            this.$router.push('/');
          })
          .catch((error) => {
            console.error("Logout failed:", error);
            // Fallback redirect even if logout fails
            this.$router.push('/');
          });
      }
    },
  }
}
</script>

<style>
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