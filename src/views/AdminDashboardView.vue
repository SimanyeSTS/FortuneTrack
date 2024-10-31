<template>
  <div class="admin-management">
    <h1>Admin Dashboard</h1>
    <p v-if="current">Hi {{ current.firstName }}! <br> You're in control.</p>
    
    <div v-if="loading" class="text-center">
      Loading data...
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Users Table Section -->
    <div class="table-section">
      <div class="section-header">
        <h2>Users Management</h2>
        <button @click="showAddModal('user')" class="add-btn">Add New User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.UserID">
            <td>{{ user.UserID }}</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.emailAdd }}</td>
            <td>{{ user.userAge }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.userRole }}</td>
            <td>
              <button @click="showEditModal('user', user)" class="edit-btn">Update</button>
              <button @click="confirmDelete('user', user.UserID)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Retail Table Section -->
    <div class="table-section">
      <div class="section-header">
        <h2>Retail Management</h2>
        <button @click="showAddModal('retail')" class="add-btn">Add New Retail</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Sector</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in retail" :key="item.id">
            <td>{{ item.Symbol }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ formatCurrency(item.MarketCapitalization) }}</td>
            <td>{{ item.Sector }}</td>
            <td>{{ item.Industry }}</td>
            <td>
              <button @click="showEditModal('retail', item)" class="edit-btn">Update</button>
              <button @click="confirmDelete('retail', item.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Technology Table Section -->
    <div class="table-section">
      <div class="section-header">
        <h2>Technology Management</h2>
        <button @click="showAddModal('technology')" class="add-btn">Add New Technology</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Sector</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in technology" :key="item.id">
            <td>{{ item.Symbol }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ formatCurrency(item.MarketCapitalization) }}</td>
            <td>{{ item.Sector }}</td>
            <td>{{ item.Industry }}</td>
            <td>
              <button @click="showEditModal('technology', item)" class="edit-btn">Update</button>
              <button @click="confirmDelete('technology', item.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Food and Beverages Table Section -->
    <div class="table-section">
      <div class="section-header">
        <h2>Food & Beverages Management</h2>
        <button @click="showAddModal('foodAndBeverages')" class="add-btn">Add New F&B</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Sector</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in foodAndBeverages" :key="item.id">
            <td>{{ item.Symbol }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ formatCurrency(item.MarketCapitalization) }}</td>
            <td>{{ item.Sector }}</td>
            <td>{{ item.Industry }}</td>
            <td>
              <button @click="showEditModal('foodAndBeverages', item)" class="edit-btn">Update</button>
              <button @click="confirmDelete('foodAndBeverages', item.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Healthcare Table Section -->
    <div class="table-section">
      <div class="section-header">
        <h2>Healthcare Management</h2>
        <button @click="showAddModal('healthcare')" class="add-btn">Add New Healthcare</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Sector</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in healthcare" :key="item.id">
            <td>{{ item.Symbol }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ formatCurrency(item.MarketCapitalization) }}</td>
            <td>{{ item.Sector }}</td>
            <td>{{ item.Industry }}</td>
            <td>
              <button @click="showEditModal('healthcare', item)" class="edit-btn">Update</button>
              <button @click="confirmDelete('healthcare', item.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Dynamic form fields based on selectedType -->
          <div v-if="selectedType === 'user'">
            <input v-model="formData.firstName" placeholder="First Name" required>
            <input v-model="formData.lastName" placeholder="Last Name" required>
            <input v-model="formData.emailAdd" type="email" placeholder="Email" required>
            <input v-model="formData.userAge" type="number" placeholder="Age" required>
            <select v-model="formData.gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select v-model="formData.userRole" required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div v-else>
            <input v-model="formData.Symbol" placeholder="Symbol" required>
            <input v-model="formData.Name" placeholder="Name" required>
            <input v-model="formData.MarketCapitalization" type="number" placeholder="Market Cap" required>
            <input v-model="formData.Sector" placeholder="Sector" required>
            <input v-model="formData.Industry" placeholder="Industry" required>
            <input v-model="formData.Description" placeholder="Description">
            <input v-model="formData.Exchange" placeholder="Exchange">
            <input v-model="formData.Currency" placeholder="Currency">
          </div>
          <button type="submit" class="submit-btn">{{ isEditing ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SweetAlert from 'sweetalert2';

export default {
  name: 'AdminDashboardView',
  data() {
    return {
      showModal: false,
      isEditing: false,
      selectedType: '',
      selectedId: null,
      formData: {},
      modalTitle: ''
    };
  },
  computed: {
    ...mapState({
      current: state => state.user,
      users: state => state.users,
      retail: state => state.retail,
      technology: state => state.technology,
      foodAndBeverages: state => state.foodAndBeverages,
      healthcare: state => state.healthcare,
      loading: state => state.isLoading,
      error: state => state.error
    })
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'fetchRetail',
      'fetchTechnology',
      'fetchFoodAndBeverages',
      'fetchHealthcare',
      'createRetail',
      'updateRetail',
      'deleteRetail',
      'createTechnology',
      'updateTechnology',
      'deleteTechnology',
      'createFoodAndBeverages',
      'updateFoodAndBeverages',
      'deleteFoodAndBeverages',
      'createHealthcare',
      'updateHealthcare',
      'deleteHealthcare'
    ]),
    
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    },

    showAddModal(type) {
      this.selectedType = type;
      this.isEditing = false;
      this.formData = {};
      this.modalTitle = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      this.showModal = true;
    },

    showEditModal(type, item) {
      this.selectedType = type;
      this.isEditing = true;
      this.selectedId = item.id || item.UserID;
      this.formData = { ...item };
      this.modalTitle = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.formData = {};
      this.selectedType = '';
      this.selectedId = null;
    },

    async confirmDelete(type, id) {
      const result = await SweetAlert.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        try {
          switch (type) {
            case 'retail':
              await this.deleteRetail(id);
              break;
            case 'technology':
              await this.deleteTechnology(id);
              break;
            case 'foodAndBeverages':
              await this.deleteFoodAndBeverages(id);
              break;
            case 'healthcare':
              await this.deleteHealthcare(id);
              break;
          }
          SweetAlert.fire('Deleted!', 'The record has been deleted.', 'success');
        } catch (error) {
          SweetAlert.fire('Error!', 'Failed to delete the record.', 'error');
        }
      }
    },

    async handleSubmit() {
      try {
        const action = this.isEditing ? 'update' : 'create';
        const capitalizedType = this.selectedType.charAt(0).toUpperCase() + this.selectedType.slice(1);
        const methodName = `${action}${capitalizedType}`;
        
        if (this.isEditing) {
          await this[methodName]({ id: this.selectedId, [`${this.selectedType}Data`]: this.formData });
        } else {
          await this[methodName](this.formData);
        }
        
        this.closeModal();
        await this.fetchData();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },

    async fetchData() {
      try {
        await Promise.all([
          this.fetchUsers(),
          this.fetchRetail(),
          this.fetchTechnology(),
          this.fetchFoodAndBeverages(),
          this.fetchHealthcare()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  async created() {
    await this.fetchData();
  }
};
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

.admin-management {
  color: white;
  padding: 20px;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 25px;
}

p {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 50px;
}

.table-section {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-family: 'Montserrat', sans-serif!important;
  font-weight: 900!important;
}

th, td {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  background-color: rgba(255, 255, 255, 0.05);
  font-weight: bold;
}

.edit-btn, .delete-btn, .add-btn {
  padding: 6px 12px;
  margin: 0 4px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
}

.add-btn:hover {
  background-color: #28852b;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.edit-btn:hover {
  background-color: #0472cc;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #de2e21;
}

/* Modal styles */
.modal-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .admin-management {
    padding: 15px;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
</style>