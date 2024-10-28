<template>
  <div class="account-management">
    <h1>Account Management</h1>
    <p v-if="currentUser">Welcome, {{ currentUser.firstName }}! <br> Feel free to make adjustments.</p>
    
    <!-- Show loading state -->
    <div v-if="loading" class="text-center">
      Loading profile data...
    </div>
    
    <!-- Show error message if any -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form v-if="!loading && currentUser" @submit.prevent="saveAccount">
      <div class="form-group">
        <input 
          placeholder="First Name" 
          type="text" 
          v-model="formData.firstName" 
          id="firstName" 
          required 
        />
      </div>
      <div class="form-group">
        <input 
          placeholder="Last Name" 
          type="text" 
          v-model="formData.lastName" 
          id="lastName" 
          required 
        />
      </div>
      <div class="form-group">
        <input 
          placeholder="Age" 
          type="number" 
          v-model="formData.userAge" 
          id="age" 
          required 
        />
      </div>
      <div class="form-group">
  <select v-model="formData.gender" id="gender" required>
    <option value="" disabled>Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>
      <div class="form-group">
        <input 
          placeholder="Email Address" 
          type="email" 
          v-model="formData.emailAdd" 
          id="email" 
          required 
        />
      </div>
      <div class="form-group">
        <input 
          placeholder="New Password (leave empty to keep current)" 
          type="password" 
          v-model="formData.userPass" 
          id="password" 
        />
      </div>
      <div class="form-group">
        <input 
          placeholder="Profile Pic URL" 
          type="url" 
          v-model="formData.userProfile" 
          id="profilePicUrl" 
        />
      </div>
      
      <!-- Preview current profile picture -->
      <div class="profile-preview" v-if="formData.userProfile">
        <img :src="formData.userProfile" alt="Profile Preview" 
          class="profile-image"
          @error="handleImageError"
        />
      </div>

      <div class="button-group">
        <button 
          class="delete" 
          type="button" 
          @click="deleteAccount"
          :disabled="loading"
        >
          Delete Account
        </button>
        <button 
          class="save" 
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>

    <div v-if="!currentUser" class="text-center">
      Please log in to view your profile.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserDashboardView',
  
  data() {
  return {
    loading: false,
    error: null,
    defaultProfilePic: 'https://i.postimg.cc/G3QS51Yp/file-bn7j-Biea-KTk-Wmn3rxd-Spm25u.jpg',
    formData: {
      firstName: '',
      lastName: '',
      userAge: null,
      gender: '',
      emailAdd: '',
      userPass: '',
      userProfile: '',
    }
  }
},

  computed: {
    ...mapState({
      currentUser: state => state.user
    })
  },

  created() {

    if (this.currentUser) {
      this.initializeForm();
    } else {
      this.$router.push('/user');
    }
  },

  methods: {
    ...mapActions(['updateUserProfile']),

    initializeForm() {
  this.formData = {
    firstName: this.currentUser .firstName || '',
    lastName: this.currentUser .lastName || '',
    userAge: this.currentUser .userAge !== undefined ? this.currentUser .userAge : null,
    gender: this.currentUser .gender || '',
    emailAdd: this.currentUser .emailAdd || '',
    userPass: '',
    userProfile: this.currentUser .userProfile || this.defaultProfilePic,
  };
},

    async saveAccount() {
      try {
        this.loading = true;
        this.error = null;

        // Remove empty password from payload if not changed
        const payload = { ...this.formData };
        if (!payload.userPass) {
          delete payload.userPass;
        }

        await this.updateUserProfile({
          userId: this.currentUser.UserID,
          userData: payload
        });

        // Re-initialize form with updated data
        this.initializeForm();
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile';
      } finally {
        this.loading = false;
      }
    },

    async deleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
          this.loading = true;
          await this.$store.dispatch('deleteUser', this.currentUser.UserID);
          this.$router.push('/logout');
        } catch (error) {
          this.error = 'Failed to delete account. Please try again.';
        } finally {
          this.loading = false;
        }
      }
    },

    handleImageError(e) {
      e.target.src = 'https://i.postimg.cc/G3QS51Yp/file-bn7j-Biea-KTk-Wmn3rxd-Spm25u.jpg';
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}

.profile-preview {
  margin: 15px 0;
  text-align: center;
}

.profile-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  border: 3px solid white;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button:hover {
  background-color: #3668ff;
  color: white;
  border: solid black;
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
  .profile-image {
    max-width: 100px;
    max-height: 100px;
  }

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
