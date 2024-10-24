<template>
  <div class="home">
    <div class="landing">
      <div class="landing-image image">
        <h1>Home</h1>
        <div class="landing-content">
          <h1 id="welcoming">Welcome to FortuneTrack,</h1>
          <p>Predict trends in Retail, Technology, Food & Beverages, and Healthcare</p>
          <div class="button-container">
            <button class="cta-button" @click="showLoginModal = true">Get Started</button>
            <button class="cta-button secondary" @click="goToReachMe">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>

    <section class="specializations">
      <h2 id="welcoming">Our Specializations:</h2>
      <ul id="sp">
        <li>Leveraging the latest data trends to drive actionable business insights.</li>
        <li>Utilizing real-time data from Google Trends and X (Twitter) for accurate forecasts.</li>
        <li>Transforming raw data into meaningful visualizations for strategic decision-making.</li>
        <li>Providing businesses with timely predictions to optimize product sales and market strategies.</li>
      </ul>
    </section>

<!-- Login Modal -->
<div v-if="showLoginModal" class="modal">
    <div class="modal-content">
      <h1>Wonderful To Have You Back</h1>
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
    
    goToReachMe() {
      this.$router.push({ name: 'about-me' })
    },
    
    goToRegistration() {
      this.$router.push({ name: 'sign-up' })
      this.closeModal()
    },
    
    async handleLogin() {
  try {
    await this.loginUser({
      emailAdd: this.emailAdd,  // Changed from email
      userPass: this.userPass   // Changed from password
    })
    
    // If login is successful, redirect
    this.$router.push({ name: 'predictions' })
    this.closeModal()
  } catch (error) {
    console.error('Login failed:', error)
  }
},
    
    handleForgotPassword() {
      this.$router.push({ name: 'reach-me' })
    },
    
    closeModal() {
      if (!this.isLoading) {
        this.showLoginModal = false
        this.email = ''
        this.password = ''
      }
    }
  },
  watch: {
    currentUser(newUser) {
      if (newUser) {
        // If user becomes logged in, close the modal
        this.closeModal()
      }
    }
  }
}
</script>


<style scoped>
.login-button:disabled,
.forgot-password:disabled,
.register-button:disabled,
.close-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
.home {
  color: #ffffff;
  font-family: Arial, sans-serif;
}

.landing {
  display: flex;
  height: 60vh;
}

.image {
  background-image: url('https://i.postimg.cc/wvGrsQYB/Header.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.landing-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  margin-top: 5%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 20px;
}

.landing-image {
  flex: 1;
  overflow: hidden;
}

.button-container {
  display: flex;
  gap: 20px;
}

.cta-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #4169E1;
  padding: 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 40%;
  transition: background-color 0.3s;
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

#welcoming {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 50px;
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

/* Modal Styles */
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
}

.modal-content {
  background: #4169E1;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
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
  color: #000;
  font-size: 24px;
  cursor: pointer;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .landing {
    flex-direction: column;
    height: auto;
  }

  .landing-content {
    padding: 40px 20px;
  }

  .landing h1 {
    font-size: 2em;
  }

  .landing p {
    font-size: 1em;
  }

  .button-container {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  #welcoming {
    font-size: 36px;
  }

  h1 {
    font-size: 28px;
  }

  p, #sp {
    font-size: 24px;
  }

  .cta-button {
    padding: 8px 15px;
    font-size: 0.9em;
  }

  .button-container {
    gap: 10px;
  }
}

@media (max-width: 400px) {
  .landing-content {
    padding: 20px;
    font-size: 14px;
  }

  #welcoming {
    font-size: 28px;
  }

  h1 {
    font-size: 22px;
  }

  p, #sp {
    font-size: 18px;
  }

  .cta-button {
    padding: 6px 12px;
    font-size: 0.8em;
  }

  .button-container {
    gap: 5px;
  }
}

@media (max-width: 300px) {
  .landing {
    flex-direction: column;
    height: auto;
  }

  .modal-content {
    width: 95%;
    padding: 15px;
  }

  .form-group input {
    padding: 6px;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    margin-bottom: 5px;
  }

  .close-button {
    font-size: 20px;
  }
}
</style>