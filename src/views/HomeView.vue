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
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="button-group">
            <button type="submit" class="login-button">Login</button>
            <button type="button" class="forgot-password" @click="handleForgotPassword">Forgot Password</button>
            <button type="button" class="register-button" @click="goToRegistration">Register</button>
          </div>
        </form>
        <button class="close-button" @click="showLoginModal = false">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      showLoginModal: false,
      email: '',
      password: ''
    }
  },
  methods: {
    goToReachMe() {
      this.$router.push({ name: 'about-me' })
    },
    goToRegistration() {
      this.$router.push({ name: 'sign-up' })
      this.showLoginModal = false
    },
    handleLogin() {
      // Implement login logic here
      console.log('Login attempted with:', this.email, this.password)
      // Reset form and close modal after login attempt
      this.email = ''
      this.password = ''
      this.showLoginModal = false
    },
    handleForgotPassword() {
      // Implement forgot password logic here
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
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
}
</style>