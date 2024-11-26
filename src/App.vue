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
    FooterComp,
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
        'wheel', 'click',
      ],
      lastActivityTime: null,
    };
  },
  computed: {
    ...mapGetters(['current']),
    isLoggedIn() {
      return this.current !== null && this.current !== undefined;
    },
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        this.setupInactivityTracking();
        this.setupTokenChecking();
      } else {
        this.removeInactivityTracking();
        this.removeTokenChecking();
      }
    },
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
    ...mapActions(['checkTokenExpiration', 'autoLogout', 'refreshAccessToken']),

    async setupTokenChecking() {
      this.removeTokenChecking();

      this.tokenCheckInterval = setInterval(async () => {
        if (this.isLoggedIn) {
          try {
            const tokenExpired = await this.$store.dispatch('checkTokenExpiration');
            if (tokenExpired) {
              await this.$store.dispatch('refreshAccessToken');
            }
          } catch (error) {
            Swal.fire({
              title: 'Session Error',
              text: 'Your session could not be refreshed. Please log in again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
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
      this.removeInactivityTracking();

      this.resetEvents.forEach(eventName => {
        window.addEventListener(eventName, this.resetInactivityTimer, { passive: true });
      });

      this.lastActivityTime = Date.now();
      this.startInactivityTimer();
    },

    removeInactivityTracking() {
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
        this.inactivityTimeout = null;
      }

      this.resetEvents.forEach(eventName => {
        window.removeEventListener(eventName, this.resetInactivityTimer);
      });
    },

    startInactivityTimer() {
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      this.inactivityTimeout = setTimeout(() => {
        const timeSinceLastActivity = Date.now() - this.lastActivityTime;
        if (this.isLoggedIn && timeSinceLastActivity >= this.INACTIVITY_DURATION) {
          this.showLogoutWarning();
        }
      }, this.INACTIVITY_DURATION);
    },

    resetInactivityTimer() {
      this.lastActivityTime = Date.now();
      if (!this.isLoggedIn) return;
      this.startInactivityTimer();
    },

    showLogoutWarning() {
      if (!this.isLoggedIn) return;

      let countdown = this.WARNING_DURATION / 1000;

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
          this.warningInterval = setInterval(() => {
            countdown--;
            const content = Swal.getHtmlContainer();
            if (content && countdown > 0) {
              content.querySelector('strong').textContent = countdown.toString();
            } else {
              clearInterval(this.warningInterval);
              this.handleLogout();
            }
          }, 1000);
        },
        willClose: () => {
          clearInterval(this.warningInterval);
        },
        preConfirm: () => {
          this.resetInactivityTimer();
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer || result.isDenied) {
          this.handleLogout();
        } else if (result.isConfirmed) {
          this.resetInactivityTimer();
        }
      });
    },

    handleLogout() {
      if (this.isLoggedIn) {
        this.$store.dispatch('autoLogout')
          .then(() => {
            this.removeInactivityTracking();
            this.removeTokenChecking();
            this.$router.push('/');
          })
          .catch(() => {
            Swal.fire({
              title: 'Logout Failed',
              text: 'An error occurred while logging you out. Redirecting to login page.',
              icon: 'error',
              confirmButtonText: 'OK',
            }).then(() => {
              this.$router.push('/');
            });
          });
      }
    },
  },
};
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
</style>

<style src="@/assets/css/style.css"></style>