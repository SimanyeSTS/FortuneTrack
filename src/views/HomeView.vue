<template>
  <div class="home">
    <div class="landing">
      <div class="landing-image image">
        <h1>Home</h1>
        <div class="landing-content">
          <h1 id="welcoming">Welcome to FortuneTrack,</h1>
          <p>Predict trends in Retail, Technology, Food & Beverages, and Healthcare</p>
          <div class="button-container">
            <button class="cta-button" @click="handleGetStarted">Get Started</button>
            <button class="cta-button secondary" @click="goToReachMe">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="specializations">
    <h2 id="welcoming">Our Specializations:</h2>
    <ul id="sp">
      <li>• Leveraging the latest data trends to drive actionable business insights.</li>
      <li>• Utilizing real-time data from Alpha Vantage for accurate forecasts.</li>
      <li>• Transforming raw data into meaningful visualizations for strategic decision-making.</li>
      <li>• Providing businesses and individuals with timely predictions to optimize product sales and market strategies.</li>
    </ul>
  </section>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="modal" @click.self="closeModal">

    <div class="modal-content">
      <h1>Wonderful to have you here!</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="emailAdd">Email:</label>
          <input 
            type="email" 
            id="emailAdd" 
            v-model="emailAdd" 
            required
            :disabled="isLoading"
          >
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="userPass" 
            v-model="userPass" 
            required
            :disabled="isLoading"
          >
        </div>
        <div class="button-group">
          <button 
            type="submit" 
            class="login-button"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
          <div class="links">
            <button 
              type="button" 
              class="forgot-password" 
              @click="handleForgotPassword"
              :disabled="isLoading"
            >
              Forgot Password?
            </button>
            <br>
            <button 
              type="button" 
              class="register-button" 
              @click="goToRegistration"
              :disabled="isLoading"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
      <button 
        class="close-button" 
        @click="closeModal"
        :disabled="isLoading"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  mounted() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      showLoginModal: false,
      emailAdd: '',
      userPass: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      currentUser: state => state.user
    })
  },
  methods: {
    ...mapActions(['loginUser']),
    
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    validatePassword(password) {
      return password.length >= 6
    },
    
    async handleLogin() {
      this.errorMessage = ''
      
      if (!this.validateEmail(this.emailAdd)) {
        await Swal.fire({
          title: 'Invalid Email',
          text: 'Please enter a valid email address',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#4169E1'
        })
        return
      }
      
      if (!this.validatePassword(this.userPass)) {
        await Swal.fire({
          title: 'Invalid Password',
          text: 'Password must be at least 6 characters long',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#4169E1'
        })
        return
      }
      
      try {
        await this.loginUser({
          emailAdd: this.emailAdd,
          userPass: this.userPass
        })
        
        await Swal.fire({
          title: 'Welcome Back!',
          text: 'Login successful',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
        
        this.$router.push({ name: 'predictions' })
        this.closeModal()
      } catch (error) {
        let errorMessage = ''
        let errorTitle = 'Login Failed'
        
        if (error.response) {
          const status = error.response.status
          
          switch (status) {
            case 401:
              errorTitle = 'Invalid Credentials'
              errorMessage = 'The email or password you entered is incorrect'
              break
            case 404:
              errorTitle = 'Account Not Found'
              errorMessage = 'No account exists with this email address'
              break
            case 429:
              errorTitle = 'Too Many Attempts'
              errorMessage = 'Please wait a few minutes before trying again'
              break
            case 503:
              errorTitle = 'Service Unavailable'
              errorMessage = 'Our servers are currently down. Please try again later'
              break
            default:
              errorMessage = 'An unexpected error occurred. Please try again'
          }
        } else if (error.message === 'Network Error') {
          errorTitle = 'Connection Error'
          errorMessage = 'Please check your internet connection and try again'
        }
        
        await Swal.fire({
          title: errorTitle,
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#4169E1',
          showCancelButton: true,
          cancelButtonText: 'Forgot Password?',
          cancelButtonColor: '#718096'
        }).then((result) => {
          if (!result.isConfirmed) {
            this.handleForgotPassword()
          }
        })
      }
    },
    
    handleForgotPassword() {
      this.$router.push({ name: 'reach-me' })
    },
    
    closeModal() {
      if (!this.isLoading) {
        this.showLoginModal = false
        this.emailAdd = ''
        this.userPass = ''
      }
    },

    handleGetStarted() {
      if (this.currentUser) {
        this.$router.push({ name: 'predictions' })
      } else {
        this.showLoginModal = true
      }
    },
    goToReachMe() {
      this.$router.push({ name: 'about-me' })
    },
    goToRegistration() {
      this.$router.push({ name: 'sign-up' })
    }
  }
}
</script>


<style scoped>
.home {
  color: #ffffff;
  font-family: Arial, sans-serif;
  width: 100%;
  overflow-x: hidden;
}

.landing {
  display: flex;
  min-height: 60vh;
  width: 100%;
}

.landing-image {
  flex: 1;
  position: relative;
  width: 100%;
  background-image: url('https://i.postimg.cc/wvGrsQYB/Header.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 60vh;
}

.landing-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

#welcoming {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: clamp(24px, 5vw, 50px);
  margin-bottom: 20px;
  word-wrap: break-word;
  max-width: 100%;
}

.landing-content p {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: clamp(16px, 3vw, 30px);
  margin-bottom: 30px;
  line-height: 1.4;
  max-width: 800px;
}

.button-container {
  display: flex;
  gap: clamp(10px, 2vw, 20px);
  flex-wrap: wrap;
  justify-content: center;
}

.cta-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #4169E1;
  padding: clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: clamp(14px, 2vw, 1em);
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.3s ease;
  min-width: 120px;
  white-space: nowrap;
}

button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}

.specializations {
  background-color: #000080;
  padding: 40px 20px;
  text-align: center;
}

.specializations h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.specializations ul {
  list-style-type: none;
  padding: 0;
}

.specializations li {
  font-size: 1.1em;
  margin-bottom: 15px;
}

h1 {
  margin-top: 1%;
  margin: 1%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

p, #sp {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
}

.modal-content {
  background: #4169E1;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  margin-top: 20px;
}

.login-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #002080;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}

.links {
  margin-top: 10px;
}

.forgot-password, .register-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 7px;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .landing {
    min-height: auto;
  }

  .landing-content {
    padding: 40px 15px;
  }

  .button-container {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 80%;
    max-width: 250px;
  }

  .specializations h2 {
    font-size: 1.5em;
  }

  .specializations li {
    font-size: 1em;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .landing-content {
    padding: 30px 10px;
  }
  
  #welcoming {
    margin-bottom: 15px;
  }

  .specializations {
    padding: 30px 15px;
  }

  p, #sp {
    font-size: 24px;
  }
}

@media (max-width: 320px) {
  .landing-content {
    padding: 20px 8px;
  }

  .cta-button {
    width: 90%;
    padding: 8px 12px;
    font-size: 14px;
  }

  #welcoming {
    font-size: 24px;
    word-wrap: break-word;
    text-align: center;
    margin: 0 auto;
  }

  .specializations ul {
    padding-left: 10px;
    font-size: 14px;
  }

  .specializations li {
    line-height: 1.5;
    font-size: 0.9em;
  }

  .modal-content {
    padding: 15px;
  }
}
</style>