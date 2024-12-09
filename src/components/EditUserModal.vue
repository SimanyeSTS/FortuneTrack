  <template>
    <div class="admin-modal">
      <div class="admin-modal-content">
        <h1>A little admin touch is never wrong!</h1>
        <div class="modal-scroll-container">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="firstName">First Name:</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="firstName" 
                required
                :disabled="isLoading"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="lastName" 
                required
                :disabled="isLoading"
              />
            </div>
            <div class="form-group">
              <label for="userAge">Age:</label>
              <input 
                type="number" 
                id="userAge" 
                v-model="userAge" 
                required
                :disabled="isLoading"
              />
            </div>
            <div class="form-group">
              <label for="gender">Gender:</label>
              <select v-model="gender" id="gender" required :disabled="isLoading">
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="emailAdd">Email Address:</label>
              <input 
                type="email" 
                id="emailAdd" 
                v-model="emailAdd" 
                required
                :disabled="isLoading"
              />
            </div>
            <div class="form-group">
              <label for="userPass">Password:</label>
              <input 
                type="password" 
                id="userPass" 
                v-model="userPass" 
                placeholder="Leave empty to keep current"
                :disabled="isLoading"
              />
            </div>
            <div class="form-group">
           <label for="userProfile">Profile Picture URL:</label>
           <input 
           type="url" 
           id="userProfile" 
           v-model="userProfile" 
           placeholder="Leave to use default"
          :disabled="isLoading"
          @input="handleProfileUrlInput"
           />
            </div>
            <div class="form-group">
              <label for="userRole">Role:</label>
              <select v-model="userRole" id="userRole" required :disabled="isLoading">
                <option value="" disabled>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User </option>
              </select>
            </div>
            <div class="button-group">
              <button 
                type="submit" 
                class="save-button"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Updating...' : 'Update User' }}
              </button>
            </div>
          </form>
        </div>
        <button 
          class="close-button" 
          @click="$emit('close')"
          :disabled="isLoading"
        >
          &times;
        </button>
      </div>
    </div>
  </template>

  <script>
  import { mapActions } from 'vuex';
  import Swal from 'sweetalert2';

  export default {
    props: {
      user: Object,
      isLoading: Boolean
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        userAge: null,
        gender: '',
        emailAdd: '',
        userPass: '',
        userProfile: '',
        userRole: ''
      };
    },
    watch: {
      user: {
        handler(newUser ) {
          if (newUser) {
            this.populateForm(newUser);
          }
        },
        immediate: true
      }
    },
    methods: {
  ...mapActions(['updateUserProfile']),

  populateForm(user) {
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.userAge = user.userAge !== undefined ? user.userAge : null;
    this.gender = user.gender || '';
    this.emailAdd = user.emailAdd || '';
    this.userProfile = user.userProfile || '';
    this.userRole = user.userRole || '';
  },

  hasChanges() {
    return (
      this.firstName.trim() !== this.user.firstName ||
      this.lastName.trim() !== this.user.lastName ||
      parseInt(this.userAge) !== parseInt(this.user.userAge) ||
      this.gender !== this.user.gender ||
      this.emailAdd.trim().toLowerCase() !== this.user.emailAdd.toLowerCase() ||
      this.userProfile.trim() !== this.user.userProfile ||
      this.userRole !== this.user.userRole ||
      this.userPass.trim() !== ''
    );
  },

  validateImageUrl(url) {
  if (!url) return true;
  try {
    const urlObj = new URL(url);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => urlObj.pathname.toLowerCase().endsWith(ext));
  } catch {
    return false;
  }
},

  async updateUser() {
    if (this.userProfile && !this.validateImageUrl(this.userProfile)) {
    await Swal.fire({
      icon: 'error',
      title: 'Invalid Profile Picture URL',
      text: 'Please enter a valid image URL (must end with .jpg, .jpeg, .png, .gif, .webp, or .svg)',
    });
    return;
  }
    if (!this.hasChanges()) {
      Swal.fire({
        icon: 'info',
        title: 'No Changes Made',
        text: 'No updates were detected. Please make changes before saving.',
      });
      return;
    }

    const userId = this.user.UserID;

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'User ID is undefined.',
      });
      return;
    }

    const userData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      userAge: parseInt(this.userAge),
      gender: this.gender,
      emailAdd: this.emailAdd.toLowerCase().trim(),
      userProfile:
        this.userProfile.trim() ||
        'https://i.postimg.cc/G3QS51Yp/file-bn7j-Biea-KTk-Wmn3rxd-Spm25u.jpg',
      userRole: this.userRole.trim(),
    };

    if (this.userPass) {
      userData.userPass = this.userPass;
    }

    try {
      await this.updateUserProfile({ userId, userData });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User updated successfully.',
      });

      this.$emit('data-updated');
      this.$emit('close');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update user. Please try again.',
      });
    }
  },

  handleProfileUrlInput(event) {
  this.userProfile = event.target.value;
}
}
  }

  </script>

  <style scoped>
  .admin-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1)!important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  h1 {
    text-align: center;
  }

  .admin-modal-content {
    background: #4169E1;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
    height: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    max-height: 600px;
    min-height: 400px;
  }

  .modal-scroll-container {
    overflow-y: auto;
    margin-right: -10px;
    padding-right: 10px;
    flex-grow: 1;
  }

  .modal-scroll-container::-webkit-scrollbar {
    width: 8px;
  }

  .modal-scroll-container::-webkit-scrollbar-track {
    background: #2d5bd7;
    border-radius: 4px;
  }

  .modal-scroll-container::-webkit-scrollbar-thumb {
    background: #1a3c9e;
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: rgb(45, 43, 43);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  .form-group input,
  .form-group select, .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }

  .form-group input:disabled,
  .form-group select:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .save-button {
    background-color: white;
    color: #4169E1;
    border: 2px solid #002080;
    padding: 10px 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .save-button:hover {
    background-color: #1249ef;
    color: black;
    border: solid black;
  }

  .save-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .close-button {
    background: none;
    border: none;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    margin-top: 10px;
    transition: color 0.3s;
  }

  .close-button:hover {
    color: black;
    background: #0f3dc6;
    border: solid black;
  }

  .close-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  h1 {
    margin: 0 0 20px 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 24px;
  }

  /* Media Queries */
  @media (max-width: 450px) {
  /* .admin-modal-content {
    width: 90vw; 
    height: auto;
    padding: 15px;
    max-height: 85vh;
  } */

  .form-group input,
  .form-group select {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
  }
  }

  @media (max-width: 300px) {
  /* .admin-modal-content {
    padding: 10px;
  } */

  .form-group {
    margin-bottom: 10px;
  }

  .save-button {
    padding: 8px 16px;
  }

  .close-button {
    font-size: 20px;
  }
  }
  </style>