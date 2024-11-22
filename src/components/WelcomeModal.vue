<template>
    <div v-if="modelValue" class="modal">
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
  export default {
    name: 'WelcomeModal',
    props: {
      modelValue: {
        type: Boolean,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue', 'login', 'forgot-password', 'register'],
    data() {
      return {
        emailAdd: '',
        userPass: ''
      }
    },
    methods: {
      handleLogin() {
        this.$emit('login', {
          type: 'welcome',
          emailAdd: this.emailAdd,
          userPass: this.userPass
        });
      },
      closeModal() {
        this.$emit('update:modelValue', false);
        this.emailAdd = '';
        this.userPass = '';
      },
      handleForgotPassword() {
        this.$emit('forgot-password');
      },
      goToRegistration() {
        this.$emit('register');
      }
    },
    watch: {
      modelValue(newVal) {
        if (!newVal) {
          this.emailAdd = '';
          this.userPass = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Same styles as LoginModal.vue */
  .modal {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    right: 0!important;
    bottom: 0!important;
    background: rgba(0, 0, 0, 0.7)!important;
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    z-index: 1000!important;
  }
  
  .modal-content {
    background: #4169E1!important;
    padding: 20px!important;
    border-radius: 8px!important;
    width: 400px!important;
    text-align: center!important;
  }
  
  button:hover {
    background-color: #1249ef!important;
    color: black!important;
    border: solid black!important;
  }
  
  .form-group {
    margin-bottom: 15px!important;
  }
  
  .form-group label {
    display: block!important;
    margin-bottom: 5px!important;
  }
  
  .form-group input {
    width: 100%!important;
    padding: 10px!important;
    border: 1px solid #ccc!important;
    border-radius: 4px!important;
  }
  
  .button-group {
    margin-top: 20px!important;
  }
  
  .login-button {
    background-color: white!important;
    color: #4169E1!important;
    border: 2px solid #002080!important;
    padding: 10px 20px!important;
    cursor: pointer!important;
    border-radius: 4px!important;
    transition: background-color 0.3s!important;
  }
  
  .login-button:hover {
    background-color: #1249ef!important;
    color: black!important;
    border: solid black!important;
  }
  
  .links {
    margin-top: 10px!important;
  }
  
  .forgot-password, .register-button {
    background: none!important;
    border: none!important;
    color: white!important;
    cursor: pointer!important;
    text-decoration: underline!important;
  }
  
  .close-button {
    background: none!important;
    border: none!important;
    color: #000!important;
    font-size: 24px!important;
    cursor: pointer!important;
  }
  
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    .modal-content {
      width: 90%!important;
    }
  }
  
  @media (max-width: 400px) {
    .modal-content {
      padding: 15px!important;
    }
  }
  </style>