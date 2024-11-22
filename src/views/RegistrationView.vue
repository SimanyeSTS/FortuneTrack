<template>
  <div class="account-management">
    <h1>Registration</h1>
    <p>Let's get you signed up now, shall we?</p>
    <form @submit.prevent="registerAccount">
      <div v-if="isLoading" class="spinner-container">
        <SpinnerComp />
      </div>
      <div v-else>
        <div class="form-group">
          <input placeholder="First Name" type="text" v-model="firstName" id="firstName" required />
        </div>
        <div class="form-group">
          <input placeholder="Last Name" type="text" v-model="lastName" id="lastName" required />
        </div>
        <div class="form-group">
          <input placeholder="Age" type="number" v-model="age" id="age" required />
        </div>
        <div class="form-group">
          <select v-model="gender" id="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <input placeholder="Email Address" type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <input placeholder="Password" type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <input placeholder="Profile Pic URL (Leave to use default)" type="url" v-model="profilePicUrl" id="profilePicUrl" />
        </div>
        <div class="button-group">
          <button class="register" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
        </div>
        <div v-if="formErrors.length" class="error-messages">
          <ul>
            <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SpinnerComp from '@/components/SpinnerComp.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    SpinnerComp,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      age: null,
      gender: '',
      email: '',
      password: '',
      profilePicUrl: '',
      formErrors: [],
    };
  },
  computed: {
    ...mapState(['isLoading']),
    isFormValid() {
      return (
        this.firstName?.length >= 2 &&
        this.lastName?.length >= 2 &&
        this.age >= 13 &&
        this.age <= 120 &&
        this.gender &&
        this.isEmailValid &&
        this.password?.length >= 6
      );
    },
    isEmailValid() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(this.email);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    async registerAccount() {
      this.formErrors = []; // Reset errors
      if (!this.isFormValid) {
        if (this.firstName.length < 2) {
          this.formErrors.push('First name must be at least 2 characters long.');
        }
        if (this.lastName.length < 2) {
          this.formErrors.push('Last name must be at least 2 characters long.');
        }
        if (this.age < 13) {
          this.formErrors.push('You must be at least 13 years old to register.');
        }
        if (this.age > 120) {
          this.formErrors.push('Please enter a valid age.');
        }
        if (!this.gender) {
          this.formErrors.push('Gender is required.');
        }
        if (!this.isEmailValid) {
          this.formErrors.push('Please enter a valid email address.');
        }
        if (this.password.length < 6 ) {
          this.formErrors.push('Password must be at least 6 characters long.');
        }
        return;
      }

      try {
        const userData = {
          firstName: this.firstName.trim(),
          lastName: this.lastName.trim(),
          userAge: parseInt(this.age),
          gender: this.gender,
          emailAdd: this.email.toLowerCase().trim(),
          userPass: this.password,
          userProfile: this.profilePicUrl.trim() || 'https://i.postimg.cc/G3QS51Yp/file-bn7j-Biea-KTk-Wmn3rxd-Spm25u.jpg',
        };

        await this.$store.dispatch('registerUser', userData);

        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'You have been registered successfully. Please login.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form
        this.resetForm();

        // Redirect to login
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Registration error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong during registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.age = null;
      this.gender = '';
      this.email = '';
      this.password = '';
      this.profilePicUrl = '';
      this.formErrors = [];
    },
  },
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.account-management {
  color: white;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 20px;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

p {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 50px;
}

.register {
  background-color: white;
  color: black;
  border: 2px solid #3668ff;
  padding: 6px 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.error-messages {
  color: red;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
}

button {
  border-radius: 20px;
}

button:hover {
  background-color: #4169E1;
  color: black;
  border: solid black;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .account-management {
    padding: 15px;
  }

  .form-group {
    margin-left: 0;
  }

  input, select {
    width: 100%;
  }

  .button-group {
    flex-direction: row;
    gap: 5px; /* Reduce space between buttons */
    justify-content: flex-end;
  }
}

@media (max-width: 400px) {
  h1 {
    font-size: 25px;
  }

  p {
    font-size: 18px;
  }

  .save, .delete {
    width: auto;
    padding: 5px 10px; /* Lower height and adjust padding */
  }

  .button-group {
    justify-content: space-between;
  }
}
</style>