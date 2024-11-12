<template>
  <div class="account-management">
    <h1>Account Management</h1>
    <p v-if="current">Welcome, {{ current.firstName }}! <br> Feel free to make adjustments.</p>
    
    <div v-if="loading" class="text-center">
      Loading profile data...
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form v-if="!loading && current" @submit.prevent="saveAccount">
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

    <div v-if="!current" class="text-center">
      Please log in to view your profile.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  name: 'User  DashboardView',
  
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
      current: state => state.user
    })
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    if (this.current) {
      this.initializeForm();
    } else {
      this.$router.push('/user');
    }
  },

  methods: {
    ...mapActions(['updateUserProfile']),

    initializeForm() {
      this.formData = {
        firstName: this.current.firstName || '',
        lastName: this.current.lastName || '',
        userAge: this.current.userAge !== undefined ? this.current.userAge : null,
        gender: this.current.gender || '',
        emailAdd: this.current.emailAdd || '',
        userPass: '',
        userProfile: this.current.userProfile || this.defaultProfilePic,
      };
    },

    async saveAccount() {
      try {
        this.loading = true;
        this.error = null;

        const payload = { ...this.formData };
        if (!payload.userPass) {
          delete payload.userPass;
        }

        await this.updateUserProfile({
          userId: this.current.UserID,
          userData: payload
        });

        this.initializeForm();
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile';
      } finally {
        this.loading = false;
      }
    },

    async deleteAccount() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this account!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        this.loading = true;
        await this.$store.dispatch('deleteUser', this.current.UserID); // Removed space after deleteUser
        this.$router.push('/');
      } catch (error) {
        this.error = 'Failed to delete account. Please try again.';
        console.error('Delete account error:', error);
      } finally {
        this.loading = false;
      }
    }
  });
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
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