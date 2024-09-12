<template>
  <div class="account-management">
    <h1>Account Management</h1>
    <br>
    <p>Feel free to make adjustments.</p>
    <br>
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
      <button class="delete" type="button" @click="deleteAccount">Delete Account</button>
      <button class="save" type="submit">Save</button>
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
  methods: {
    saveAccount() {
      // Logic to save account
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
      // Logic to delete account
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
  margin-left: 20% !important;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, select {
    width: 80% !important;
  padding: 10px;
  width: 100%;
  right: 20% !important;
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: black;
    font-size: 20px;
}

h1{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
}

p{
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 50px;
}

.save{
    background-color: white;
    color: black;
    border: 2px solid #3668ff;
    padding: 8px !important;
    width: 6rem !important;
    margin-bottom: 10px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 1em;
    cursor: pointer;
    border-radius: 20%;
    transition: background-color 0.3s;
    margin-left: 70% !important;
}
</style>