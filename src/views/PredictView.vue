<template>
  <div class="predict-view">
    <!-- Always visible header -->
    <h1>Predict</h1>

    <!-- Always visible account/logout buttons -->
    <div class="button-container">
      <button class="acc" @click="redirectToAccount">
        <img v-if="currentUser  && currentUser .userProfile" :src="currentUser .userProfile" class="profile-picture" alt="Profile">
        <span v-if="currentUser ">{{ currentUser .firstName }}</span>
        <span v-else>Account</span>
      </button>
      <button class="logout" @click="handleLogoutOrLogin">
        <img v-if="currentUser  && currentUser .userProfile" :src="currentUser .userProfile" class="profile-picture" alt="Profile">
        {{ currentUser  ? 'Logout' : 'Login' }}
      </button>
    </div>

    <!-- Always visible PredictionFilters -->
    <PredictionFilters 
      :sectors="sectors"
      @filter-change="handleFilterChange"
    />

    <!-- Content Container -->
    <div class="content-container">
      <!-- Spinner -->
      <div v-if="isLoading" class="spinner-container">
        <SpinnerComp2 />
      </div>

      <!-- Main Content -->
      <div v-else class="all-charts">
        <template v-if="sortedAndFilteredData.length > 0">
          <div v-for="(group, index) in groupedData" :key="index" class="sector-group">
            <h2 v-if="group.items.length > 0">{{ group.sector }}</h2>
            <div v-for="data in group.items" :key="data.Symbol" class="chart-container-wrapper">
              <div class="chart-container">
                <MainLineChart :chartData="prepareChartData(data)" />
              </div>
              <MainSideWindow :data="data" :sector="group.sector" />
            </div>
          </div>
          <ChatBot2 />
        </template>
        <div v-else class="no-results">
          No results found for your search criteria
        </div>
      </div>
    </div>


    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal">
      <div class="modal-content">
        <h1>You are not logged in, please login to continue!</h1>
        <form @submit.prevent="() => handleLogin('login')">
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

    <!-- Welcome Modal -->
    <div v-if="showWelcomeModal" class="modal">
      <div class="modal-content">
        <h1>Wonderful to have you here!</h1>
        <form @submit.prevent="() => handleLogin('welcome')">
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
  </div>
</template>


<script>
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainLineChart from '@/components/MainLineChart.vue'
import MainSideWindow from '@/components/MainSideWindow.vue'
import SpinnerComp2 from '@/components/SpinnerComp2.vue'
import PredictionFilters from '@/components/PredictionFilters.vue'
import ChatBot2 from '@/components/ChatBot2.vue';
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'PredictView',
  components: {
    MainLineChart,
    MainSideWindow,
    SpinnerComp2,
    PredictionFilters,
    ChatBot2
  },
  data() {
    return {
      showLoginModal: false,
      showWelcomeModal: false,
      emailAdd: '',
      userPass: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    redirectToAccount() {
      if (!this.currentUser) {
        this.showLoginModal = true;
        return;
      }

      if (this.currentUser.userRole.toLowerCase() === 'admin') {
        this.$router.push({ name: 'admin-dashboard' });
      } else {
        this.$router.push({ name: 'user-dashboard' });
      }
    },

    handleLogoutOrLogin() {
      if (!this.currentUser) {
        this.showWelcomeModal = true;
      } else {
        this.confirmLogout();
      }
    },

    async handleLogin(modalType) {
      try {
        this.$store.commit('SET_LOADING', true);
        await this.$store.dispatch('loginUser', {
          emailAdd: this.emailAdd,
          userPass: this.userPass
        });

        await Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in.',
          icon: 'success',
          timer: 1500
        });

        this.closeModal();

        if (modalType === 'welcome') {
          return;
        } else {
          if (this.currentUser.userRole.toLowerCase() === 'admin') {
            this.$router.push({ name: 'admin-dashboard' });
          } else {
            this.$router.push({ name: 'user-dashboard' });
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
        await Swal.fire({
          title: 'Error',
          text: error.message || 'Failed to log in. Please try again.',
          icon: 'error'
        });
      } finally {
        this.$store.commit('SET_LOADING', false);
      }
    },

    async confirmLogout() {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You will be logged out of your account",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout',
          cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          await this.logoutUser();
          await Swal.fire(
            'Logged Out!',
            'You have been successfully logged out.',
            'success'
          );
        }
      } catch (error) {
        console.error('Logout confirmation error:', error);
        await Swal.fire(
          'Error',
          'There was a problem logging out. Please try again.',
          'error'
        );
      }
    },

    async logoutUser() {
      try {
        await this.$store.dispatch('logoutUser');
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },

    closeModal() {
      this.showLoginModal = false;
      this.showWelcomeModal = false;
      this.emailAdd = '';
      this.userPass = '';
    },

    handleForgotPassword() {
      this.$router.push({ name: 'reach-me' });
    },

    goToRegistration() {
      this.$router.push({ name: 'sign-up' });
    },
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);
    const sectors = computed(() => [
      { name: 'Retail', data: store.state.retail },
      { name: 'Technology', data: store.state.technology },
      { name: 'Food and Beverages', data: store.state.foodAndBeverages },
      { name: 'Healthcare', data: store.state.healthcare }
    ]);

    const sortedAndFilteredData = ref([]);
    const currentFilters = ref({
      searchQuery: '',
      selectedCategory: '',
      sortBy: ''
    });

    const groupedData = computed(() => {
      const groups = [];
      const sectorNames = new Set(sortedAndFilteredData.value.map(item => item.sector));
      
      sectorNames.forEach(sectorName => {
        groups.push({
          sector: sectorName,
          items: sortedAndFilteredData.value.filter(item => item.sector === sectorName)
        });
      });
      
      return groups;
    });

    const handleFilterChange = ({ searchQuery, selectedCategory, sortBy }) => {
      currentFilters.value = { searchQuery, selectedCategory, sortBy };
      applyFiltersAndSort();
    };

    const applyFiltersAndSort = () => {
      let allData = [];
      sectors.value.forEach(sector => {
        sector.data.forEach(item => {
          allData.push({
            ...item,
            sector: sector.name
          });
        });
      });

      if (currentFilters.value.searchQuery) {
        const query = currentFilters.value.searchQuery.toLowerCase();
        allData = allData.filter(item => 
          (item.Symbol && item.Symbol.toLowerCase().includes(query)) || 
          (item.Name && item.Name.toLowerCase().includes(query))
        );
      }

      if (currentFilters.value.selectedCategory) {
        allData = allData.filter(item => 
          item.sector === currentFilters.value.selectedCategory
        );
      }

      if (currentFilters.value.sortBy) {
        allData = sortData(allData, currentFilters.value.sortBy);
      }

      sortedAndFilteredData.value = allData;
    };

    const sortData = (data, sortBy) => {
      return [...data].sort((a, b) => {
        let result = 0;
        switch(sortBy) {
          case 'priceAsc':
            result = safeParseFloat(a.AnalystTargetPrice) - safeParseFloat(b.AnalystTargetPrice);
            break;
          case 'priceDesc':
            result = safeParseFloat(b.AnalystTargetPrice) - safeParseFloat(a.AnalystTargetPrice);
            break;
          case 'growthAsc':
            result = safeParseFloat(a.QuarterlyEarningsGrowthYOY) - safeParseFloat(b.QuarterlyEarningsGrowthYOY);
            break;
          case 'growthDesc':
            result = safeParseFloat(b.QuarterlyEarningsGrowthYOY) - safeParseFloat(a.QuarterlyEarningsGrowthYOY);
            break;
          case 'revenueAsc':
            result = safeParseFloat(a.RevenueTTM) - safeParseFloat(b.RevenueTTM);
            break;
          case 'revenueDesc':
            result = safeParseFloat(b.RevenueTTM) - safeParseFloat(a.RevenueTTM);
            break;
          case 'alphabetical':
            result = (a.Name || '').localeCompare(b.Name || '');
            break;
          case 'alphabeticalDesc':
            result = (b.Name || '').localeCompare(a.Name || '');
            break;
        }
        return result;
      });
    };

    const safeParseFloat = (value) => {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    };

    watch(sectors, () => {
      applyFiltersAndSort();
    }, { immediate: true });

    onMounted(() => {
      store.dispatch('fetchRetail');
      store.dispatch('fetchTechnology');
      store.dispatch('fetchFoodAndBeverages');
      store.dispatch('fetchHealthcare');
    });

    const prepareChartData = (data) => {
  const Week52High = data['52WeekHigh'] !== null ? data['52WeekHigh'] : data['Week52High'];

  return {
    labels: ['Earnings Growth', 'Revenue', 'Analyst Target Price', 'Week 52 High'],
    datasets: [
      {
        label: data.Symbol,
        data: [
          parseFloat(data.QuarterlyEarningsGrowthYOY) * 100,
          parseFloat(data.RevenueTTM) / 1e9,
          parseFloat(data.AnalystTargetPrice),
          parseFloat(Week52High)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
};

    return {
      isLoading,
      sectors,
      sortedAndFilteredData,
      groupedData,
      handleFilterChange,
      prepareChartData
    };
  }
});
</script>



<style scoped>
.content-container {
  margin-top: 20px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; 
  margin-top: 100px;
}

.predict-view {
  padding: 20px;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.no-results {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-align: center;
  color: white;
  padding: 2rem;
  font-size: 1.2rem;
}

.sector-group {
  margin-bottom: 3rem;
}

.profile-picture {
  width: 25px!important;
  height: 25px!important;
  border-radius: 50%!important;
  object-fit: cover!important;
  margin-right: 10px!important;
}

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
  color: black!important;;
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
  cursor: pointer !important;
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

.predict-view {
  padding: 20px;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
  margin-bottom: 2rem;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 25px;
  text-align: center;
  margin-bottom: 1.5rem;
}

.sector-charts {
  margin-bottom: 3rem;
}

.chart-container-wrapper {
  display: flex;
  align-items: stretch;
  margin-bottom: 2rem;
  width: 100%;
  min-height: 400px;
  gap: 0;
}

.chart-container {
  flex:  1;
  height: 400px;
  margin-right: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 20px;
  top: 6rem;
  z-index: 100;
}

.acc, .logout {
  background-color: white;
  color: black;
  border: 2px solid #3668ff;
  padding: 8px !important;
  width: 8rem !important;
  margin-bottom: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.logout:hover {
  background-color: #3668ff;
  color: white;
  border: solid black;
}

.acc:hover {
  background-color: #3668ff;
  color: white;
  border: solid black;
}

@media (max-width: 1024px) {
  .chart-container-wrapper {
    flex-direction: column;
    align-items: center;
    min-height: auto;
  }

  .chart-container {
    width: 100%;
    margin-bottom: 1rem;
  }

  .button-container {
    position: static;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%!important; /* Full width on smaller screens */
  }
}

@media (max-width: 400px) {
  .modal-content {
    padding: 15px!important; /* Less padding on smaller screens */
  }
}
</style>