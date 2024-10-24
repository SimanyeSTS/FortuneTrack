<template>
  <div class="account-management">
    <h1>Account Management</h1>
    <p>Feel free to make adjustments.</p>
    <form @submit.prevent="saveAccount">
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
        <button class="delete" type="button" @click="deleteAccount">Delete Account</button>
        <button class="save" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      age: null,
      gender: '',
      email: '',
      password: '',
      profilePicUrl: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    saveAccount() {
      console.log('Account saved:', {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        gender: this.gender,
        email: this.email,
        password: this.password,
        profilePicUrl: this.profilePicUrl || 'default-url',
      });
    },
    deleteAccount() {
      console.log('Account deleted');
    },
  },
}
</script>

<style scoped>
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

.save, .delete {
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
