<template>
    <div v-if="modelValue" class="modal" @click.self="closeModal">
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
  
  button:hover {
    background-color: #1249ef!important;
    color: black!important;
    border: solid black!important;
  }
  
  .form-group {
    margin-bottom: 15px;
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
  margin-top: 20px;
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
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 7px;
}
  
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 600px) {
    .modal-content {
      width: 95%!important;
    }
  }
  </style>