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
      <div class="table-wrapper" id="table-users">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.UserID">
              <td><img :src="user.userProfile" alt="Profile" class="profile-img"></td>
              <td>{{ user.UserID }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.userAge }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.userRole }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>{{ formatDate(user.updatedAt) }}</td>
              <td>
                <button @click="showEditModal('user', user)" class="edit-btn"><i class="bi bi-pencil"></i></button>
                <button @click="confirmDelete('user', user.UserID)" class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scroll-arrows-horizontal">
        <div class="left-arrow" @click="scrollLeft('users')">
          <font-awesome-icon icon="arrow-left" style="color: white;" />
        </div>
        <div class="right-arrow" @click="scrollRight('users')">
          <font-awesome-icon icon="arrow-right" style="color: white;" />
        </div>
      </div>
    </div>

    <!-- Stock Tables (Retail, Technology, F&B, Healthcare) -->
    <template v-for="type in stockTypes" :key="type.name">
      <div class="table-section">
        <div class="section-header">
          <h2>{{ type.title }} Management</h2>
          <button @click="showAddModal(type.name)" class="add-btn">Add New {{ type.title }}</button>
        </div>
        <div class="table-wrapper" :id="`table-${type.name}`">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Symbol</th>
                <th>Asset Type</th>
                <th>Name</th>
                <th>Description</th>
                <th>CIK</th>
                <th>Exchange</th>
                <th>Currency</th>
                <th>Country</th>
                <th>Sector</th>
                <th>Industry</th>
                <th>Address</th>
                <th>Official Site</th>
                <th>Fiscal Year End</th>
                <th>Latest Quarter</th>
                <th>Market Capitalization</th>
                <th>EBITDA</th>
                <th>PE Ratio</th>
                <th>PEG Ratio</th>
                <th>Book Value</th>
                <th>Dividend Per Share</th>
                <th>Dividend Yield</th>
                <th>EPS</th>
                <th>Revenue Per Share TTM</th>
                <th>Profit Margin</th>
                <th>Operating Margin TTM</th>
                <th>Return on Assets TTM</th>
                <th>Return on Equity TTM</th>
                <th>Revenue TTM</th>
                <th>Gross Profit TTM</th>
                <th>Diluted EPS TTM</th>
                <th>Quarterly Earnings Growth YOY</th>
                <th>Quarterly Revenue Growth YOY</th>
                <th>Analyst Target Price</th>
                <th>Analyst Rating Strong Buy</th>
                <th>Analyst Rating Buy</th>
                <th>Analyst Rating Hold</th>
                <th>Analyst Rating Sell</th>
                <th>Analyst Rating Strong Sell</th>
                <th>Trailing PE</th>
                <th>Forward PE</th>
                <th>Price to Sales Ratio TTM</th>
                <th>Price to Book Ratio</th>
                <th>EV to Revenue</th>
                <th>EV to EBITDA</th>
                <th>Beta</th>
                <th>52W High</th>
                <th>52W Low</th>
                <th>50-Day Moving Average</th>
                <th>200-Day Moving Average</th>
                <th>Shares Outstanding</th>
                <th>Dividend Date</th>
                <th>Ex-Dividend Date</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getStockData(type.name)" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.Symbol }}</td>
                <td>{{ item.AssetType }}</td>
                <td>{{ item.Name }}</td>
                <td class="description-cell">{{ item.Description }}</td>
                <td>{{ item.CIK }}</td>
                <td>{{ item.Exchange }}</td>
                <td>{{ item.Currency }}</td>
                <td>{{ item.Country }}</td>
                <td>{{ item.Sector }}</td>
                <td>{{ item.Industry }}</td>
                <td class="description-cell">{{ item.Address }}</td>
                <td><a :href="item.OfficialSite" target="_blank">{{ item.OfficialSite }}</a></td>
                <td>{{ item.FiscalYearEnd }}</td>
                <td>{{ item.LatestQuarter }}</td>
                <td>{{ formatCurrency(item.MarketCapitalization) }}</td>
                <td>{{ formatCurrency(item.EBITDA) }}</td>
                <td>{{ item.PERatio }}</td>
                <td>{{ item.PEGRatio }}</td>
                <td>{{ item.BookValue }}</td>
                <td>{{ item.DividendPerShare }}</td>
                <td>{{ item.DividendYield }}%</td>
                <td>{{ item.EPS }}</td>
                <td>{{ item.RevenuePerShareTTM }}</td>
                <td>{{ item.ProfitMargin }}%</td>
                <td>{{ item.OperatingMarginTTM }}%</td>
                <td>{{ item.ReturnOnAssetsTTM }}%</td>
                <td>{{ item.ReturnOnEquityTTM }}%</td>
                <td>{{ formatCurrency(item.RevenueTTM) }}</td>
                <td>{{ formatCurrency(item.GrossProfitTTM) }}</td>
                <td>{{ item.DilutedEPSTTM }}</td>
                <td>{{ item.QuarterlyEarningsGrowthYOY }}%</td>
                <td>{{ item.QuarterlyRevenueGrowthYOY }}%</td>
                <td>{{ item.AnalystTargetPrice }}</td>
                <td>{{ item.AnalystRatingStrongBuy }}</td>
                <td>{{ item.AnalystRatingBuy }}</td>
                <td>{{ item.AnalystRatingHold }}</td>
                <td>{{ item.AnalystRatingSell }}</td>
                <td>{{ item.AnalystRatingStrongSell }}</td>
                <td>{{ item.TrailingPE }}</td>
                <td>{{ item.ForwardPE }}</td>
                <td>{{ item.PriceToSalesRatioTTM }}</td>
                <td>{{ item.PriceToBookRatio }}</td>
                <td>{{ item.EVToRevenue }}</td>
                <td>{{ item.EVToEBITDA }}</td>
                <td>{{ item.Beta }}</td>
                <td>{{ formatCurrency(item.Week52High) }}</td>
                <td>{{ formatCurrency(item.Week52Low) }}</td>
                <td>{{ item.Day50MovingAverage }}</td>
                <td>{{ item.Day200MovingAverage }}</td>
                <td>{{ item.SharesOutstanding }}</td>
                <td>{{ item.DividendDate }}</td>
                <td>{{ item.ExDividendDate }}</td>
                <td>{{ item.CreatedAt }}</td>
                <td>
                  <button @click="showEditModal(type.name, item)" class="edit-btn"><i class="bi bi-pencil"></i></button>
                  <button @click=" confirmDelete(type.name, item.id)" class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="scroll-arrows-horizontal">
          <div class="left-arrow" @click="scrollLeft(type.name)">
            <font-awesome-icon icon="arrow-left" style="color: white;" />
          </div>
          <div class="right-arrow" @click="scrollRight(type.name)">
            <font-awesome-icon icon="arrow-right" style="color: white;" />
          </div>
        </div>
      </div>
    </template>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <form @submit.prevent="handleSubmit" class="modal-form">
          <!-- User Form Fields -->
          <div v-if="selectedType === 'user'" class="form-grid">
            <div class="form-group">
              <label>First Name</label>
              <input v-model="formData.firstName" required>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input v-model="formData.lastName" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="formData.emailAdd" type="email" required>
            </div>
            <div class="form-group">
              <label>Age</label>
              <input v-model="formData.userAge" type="number" required>
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select v-model="formData.gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Role</label>
              <select v-model="formData.userRole" required>
                <option value="User   ">User   </option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label>Profile Image URL</label>
              <input v-model="formData.userProfile">
            </div>
            <div class="form-group" v-if="!isEditing">
              <label>Password</label>
              <input v-model="formData.userPass" type="password" required>
            </div>
          </div>

          <!-- Stock Form Fields -->
          <div v-else class="form-grid">
            <div class="form-group">
              <label>Symbol</label>
              <input v-model="formData.Symbol" required>
            </div>
            <div class="form-group">
              <label>Name</label>
              <input v-model="formData.Name" required>
            </div>
            <div class="form-group">
              <label>Asset Type</label>
              <input v-model="formData.AssetType" required>
            </div>
            <div class="form-group">
              <label>Exchange</label>
              <input v-model="formData.Exchange" required>
            </div>
            <div class="form-group">
              <label>Currency</label>
              <input v-model="formData.Currency" required>
            </div>
            <div class="form-group">
              <label>Country</label>
              <input v-model="formData.Country">
            </div>
            <div class="form-group">
              <label>Sector</label>
              <input v-model="formData.Sector" required>
            </div>
            <div class="form-group">
              <label>Industry</label>
              <input v-model="formData.Industry" required>
            </div>
            <div class="form-group">
              <label>Market Capitalization</label>
              <input v-model="formData.MarketCapitalization" type="number" required>
            </div>
            <div class="form-group">
              <label>PE Ratio</label>
              <input v-model="formData.PERatio" type="number">
            </div>
            <div class="form-group">
              <label>Dividend Yield</label>
              <input v-model="formData.DividendYield " type="number">
            </div>
            <div class="form-group">
              <label>Beta</label>
              <input v-model="formData.Beta" type="number">
            </div>
            <div class="form-group">
              <label>52 Week High</label>
              <input v-model="formData.Week52High" type=" number">
            </div>
            <div class="form-group">
              <label>52 Week Low</label >
              <input v-model="formData.Week52Low" type="number">
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-btn">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SweetAlert from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowLeft, faArrowRight);

export default {
  components: {
    FontAwesomeIcon
  },
  name: 'AdminDashboardView',
  data() {
    return {
      showModal: false,
      isEditing: false,
      selectedType: '',
      selectedId: null,
      formData: {},
      modalTitle: '',
      stockTypes: [
        { name: 'retail', title: 'Retail' },
        { name: 'technology', title: 'Technology' },
        { name: 'foodAndBeverages', title: 'Food & Beverages' },
        { name: 'healthcare', title: 'Healthcare' }
      ]
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
  mounted() {
    window.scrollTo(0, 0)
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
      if (!value) return '$0';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    },

    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    },

    getStockData(type) {
      return this[type] || [];
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
      this. formData = {};
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
          const methodName = `delete${type.charAt(0).toUpperCase() + type.slice(1)}`;
          await this[methodName](id);
          await SweetAlert.fire('Deleted!', 'The record has been deleted.', 'success');
          await this.fetchData();
        } catch (error) {
          await SweetAlert.fire('Error!', 'Failed to delete the record.', 'error ');
        }
      }
    },

    async handleSubmit() {
      try {
        const action = this.isEditing ? 'update' : 'create';
        const capitalizedType = this.selectedType.charAt(0).toUpperCase() + this.selectedType.slice(1);
        const methodName = `${action}${capitalizedType}`;
        
        if (this.isEditing) {
          await this[methodName]({ id: this.selectedId, ...this.formData });
        } else {
          await this[methodName ](this.formData);
        }
        
        await SweetAlert.fire('Success!', 'Record has been saved.', 'success');
        this.closeModal();
        await this.fetchData();
      } catch (error) {
        await SweetAlert.fire('Error!', 'Failed to save the record.', 'error');
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
    },
    scrollLeft(type) {
      const tableWrapper = document.querySelector(`#table-${type}`);
      tableWrapper.scrollLeft -= 100; // Scroll left by 100 pixels
      tableWrapper.scroll({
        left: tableWrapper.scrollLeft,
        behavior: 'smooth'
      });
    },
    scrollRight(type) {
      const tableWrapper = document.querySelector(`#table-${type}`);
      tableWrapper.scrollLeft += 100; // Scroll right by 100 pixels
      tableWrapper.scroll({
        left: tableWrapper.scrollLeft,
        behavior: 'smooth'
      });
    },
  },
  async created() {
    await this.fetchData();
  }
};
</script>

<style scoped>
.scroll-arrows-horizontal {
  display: flex;
  justify-content: space-between;
  position: relative;  
  padding: 10px 20px; 
  background: rgba(0, 0, 0, 0.5); /* Change to a darker background for better visibility */
  border-radius: 0 0 8px 8px; 
  margin-top: -8px; 
}

.left-arrow, .right-arrow {
  cursor: pointer;
  font-size: 24px;
  padding: 10px; /* Increase padding for better clickability */
  background: rgba(255, 255, 255, 0.2); /* Light background for contrast */
  border-radius: 4px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.3s ease; 
}

.left-arrow:hover, .right-arrow:hover {
  background: rgba(255, 255, 255, 0.4); /* Lighter background on hover */
  transform: scale(1.1); 
}

.left-arrow i, .right-arrow i {
  color: white; /* Ensure icons are white for visibility */
}

.description-cell {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
img {
  width: 40px!important;
  height: 40px!important;
  border-radius: 50%!important;
  object-fit: cover!important;
  margin-right: 10px!important;
}

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
  color: white ;
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

/* Improved Responsive Table Styling */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

table {
  min-width: 300px; /* Ensure minimum width for small screens */
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

/* Add vertical lines between columns */
th, td {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-align: left;
}

th:last-child, td:last-child {
  border-right: none; /* Remove right border from last column */
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
  margin-bottom: 5px ;
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

  .scroll-arrows-horizontal {
    display: none;
  }
}

/* Ultra-small device responsiveness */
@media (max-width: 300px) {
  .admin-management {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 30px;
  }

  th, td {
    padding: 8px;
    font-size: 10px;
  }

  .edit-btn, .delete-btn, .add-btn {
    padding: 4px 8px;
    font-size: 10px;
  }
}

/* Small device responsiveness */
@media (min-width: 301px) and (max-width: 576px) {
  .admin-management {
    padding: 15px;
  }

  h1 {
    font-size: 26px;
  }

  h2 {
    font-size: 22px;
  }

  p {
    font-size: 40px;
  }

  th, td {
    padding: 10px;
    font-size: 12px;
  }
}

/* Horizontal scrollbar styling */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.scroll-arrows-horizontal {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.left-arrow, .right-arrow {
  cursor: pointer;
  font-size: 24px;
  transition: opacity 0.2s ease;
}

.left-arrow:hover, .right-arrow:hover {
  opacity: 0.8;
}
</style>