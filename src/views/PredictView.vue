<template>
  <div class="predict-view">
    <SpinnerComp v-if="isLoading" />
    <div v-else>
      <h1>Predict</h1>
      <div class="button-container">
        <button class="acc" @click="redirectToAccount">Account</button>
        <button class="logout">Logout</button>
      </div>
      <div v-for="(sector, sectorIndex) in sectors" :key="sectorIndex" class="sector-charts">
        <h2>{{ sector.name }}</h2>
        <div v-for="(data, dataIndex) in sector.data" :key="dataIndex" class="chart-container-wrapper">
          <div class="chart-container">
            <MainLineChart :chartData="prepareChartData(data)" />
          </div>
          <MainSideWindow :data="data" :sector="sector.name" />
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal">
      <div class="modal-content">
        <h1>Wonderful To Have You Back!</h1>
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
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainLineChart from '@/components/MainLineChart.vue'
import MainSideWindow from '@/components/MainSideWindow.vue'
import SpinnerComp from '@/components/SpinnerComp.vue'

export default defineComponent({
  name: 'PredictView',
  components: {
    MainLineChart,
    MainSideWindow,
    SpinnerComp
  },
  data() {
    return {
      showLoginModal: false,
      emailAdd: '',
      userPass: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    redirectToAccount() {
      const currentUser   = this.$store.state.user;

      if (!currentUser  ) {
        this.showLoginModal = true;
        return;
      }

      if (currentUser .userRole.toLowerCase() === 'admin') {
        this.$router.push({ name: 'admin-dashboard' });
      } else {
        this.$router.push({ name: 'user-dashboard' });
      }
    },
    async handleLogin() {
      try {
        await this.$store.dispatch('loginUser ', {
          emailAdd: this.emailAdd,
          userPass: this.userPass
        });

        this.showLoginModal = false;
        this.emailAdd = '';
        this.userPass = '';

        if (this.$store.state.user.userRole.toLowerCase() === 'admin') {
          this.$router.push({ name: 'admin-dashboard' });
        } else {
          this.$router.push({ name: 'user-dashboard' });
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    closeModal() {
      this.showLoginModal = false;
      this .emailAdd = '';
      this.userPass = '';
    }
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);

    const sectors = computed(() => [
      { name: 'Retail', data: store.state.retail },
      { name: 'Technology', data: store.state.technology },
      { name: 'Food and Beverages', data: store.state.foodAndBeverages },
      { name: 'Healthcare', data: store.state.healthcare }
    ]);

    const prepareChartData = (data) => {
      return {
        labels: ['Earnings Growth', 'Revenue', 'Analyst Target Price', 'Week 52 High'],
        datasets: [
          {
            label: data.Symbol,
            data: [
              parseFloat(data.QuarterlyEarningsGrowthYOY) * 100, 
              parseFloat(data.RevenueTTM) / 1e9, 
              parseFloat(data.AnalystTargetPrice),
              parseFloat(data['52WeekHigh'])
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

    onMounted(() => {
      store.dispatch('fetchRetail');
      store.dispatch('fetchTechnology');
      store.dispatch('fetchFoodAndBeverages');
      store.dispatch('fetchHealthcare');
    });

    return {
      isLoading,
      error,
      sectors,
      prepareChartData
    };
  }
});
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
}

.modal-content {
  background: #4169E1;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  margin-top: 20px;
}

.login-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #002080;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}

.links {
  margin-top: 10px;
}

.forgot-password, .register-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
}

.close-button {
  background: none;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
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

button {
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
}

button:hover {
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
    width: 90%; /* Full width on smaller screens */
  }
}

@media (max-width: 400px) {
  .modal-content {
    padding: 15px; /* Less padding on smaller screens */
  }
}
</style>