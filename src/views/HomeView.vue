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
  .image{
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

  .landing-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  .cta-button:hover {
    background-color: #4169E1;
    color: black;
    border: solid black;
  }

  .cta-button.secondary {
    background-color: white;
    border: 2px solid #4169E1;
  }

  .cta-button.secondary:hover {
    background-color: #4169E1;
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

  #welcoming{
    font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      color: white;
      font-size: 50px;
  }

  h1{
    margin-top: 1%;
    margin: 1%;
    font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      color: white;
      font-size: 30px;
  }

  p, #sp{
    font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      color: white;
      font-size: 30px;
  }

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

  .modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
  border-radius: 5px;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 5px;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.login-button,
.forgot-password,
.register-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button {
  background-color: #4169E1;
  color: white;
}

.forgot-password,
.register-button {
  background-color: #f0f0f0;
  color: #333;
}

/* Add these to your existing media query */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    margin-bottom: 10px;
  }
}
</style>