import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const hostedData = "http://localhost:3001/"

const handleError = (commit, error) => {
  const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred'
  commit('SET_ERROR', errorMessage)
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
  })
}

export default createStore({
  state: {
    growthMetricsData: null,
    financialPerformanceData: null,
    profitabilityMetricsData: null,
    efficiencyMetricsData: null,
    valuationMetricsData: null,
    analystExpectationsData: null,
    stockPerformanceData: null,
    analystTargetPriceData: null,
    users: [],
    user: null,
    error: null,
    isLoading: false,
    retail: [],
    retailPrediction: null,
    technology: [],
    technologyPrediction: null,
    foodAndBeverages: [],
    foodAndBeveragesPrediction: null,
    healthcare: [],
    healthcarePrediction: null,
    allSectorsData: [],
    symbolData: null
  },
  getters: {
    allUsers: (state) => state.users,
    currentUser: (state) => state.user,
    allRetail: (state) => state.retail,
    singleRetailPrediction: (state) => state.retailPrediction,
    allTechnology: (state) => state.technology,
    singleTechnologyPrediction: (state) => state.technologyPrediction,
    allFoodAndBeverages: (state) => state.foodAndBeverages,
    singleFoodAndBeveragesPrediction: (state) => state.foodAndBeveragesPrediction,
    allHealthcare: (state) => state.healthcare,
    singleHealthcarePrediction: (state) => state.healthcarePrediction,
    allSectorsData: (state) => state.allSectorsData,
    getSymbolData: (state) => state.symbolData,
  },
  mutations: {
    SET_GROWTH_METRICS_DATA(state, data) {
      state.growthMetricsData = data;
    },
    SET_FINANCIAL_PERFORMANCE_DATA(state, data) {
      state.financialPerformanceData = data;
    },
    SET_PROFITABILITY_METRICS_DATA(state, data) {
      state.profitabilityMetricsData = data;
    },
    SET_EFFICIENCY_METRICS_DATA(state, data) {
      state.efficiencyMetricsData = data;
    },
    SET_VALUATION_METRICS_DATA(state, data) {
      state.valuationMetricsData = data;
    },
    SET_ANALYST_EXPECTATIONS_DATA(state, data) {
      state.analystExpectationsData = data;
    },
    SET_STOCK_PERFORMANCE_DATA(state, data) {
      state.stockPerformanceData = data;
    },
    SET_ANALYST_TARGET_PRICE_DATA(state, data) {
      state.analystTargetPriceData = data;
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_RETAIL(state, retail) {
      state.retail = retail
    },
    SET_RETAIL_PREDICTION(state, retailPrediction) {
      state.retailPrediction = retailPrediction
    },
    SET_TECHNOLOGY(state, technology) {
      state.technology = technology
    },
    SET_TECHNOLOGY_PREDICTION(state, technologyPrediction) {
      state.technologyPrediction = technologyPrediction
    },
    SET_FOOD_AND_BEVERAGES(state, foodAndBeverages) {
      state.foodAndBeverages = foodAndBeverages
    },
    SET_FOOD_AND_BEVERAGES_PREDICTION(state, foodAndBeveragesPrediction) {
      state.foodAndBeveragesPrediction = foodAndBeveragesPrediction
    },
    SET_HEALTHCARE(state, healthcare) {
      state.healthcare = healthcare
    },
    SET_HEALTHCARE_PREDICTION(state, healthcarePrediction) {
      state.healthcarePrediction = healthcarePrediction
    },
    SET_ALL_SECTORS_DATA(state, allSectorsData) {
      state.allSectorsData = allSectorsData
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_USER: (state, newUser) => {
      state.users.push(newUser)
    },
    SET_SYMBOL_DATA(state, data) {
      state.symbolData = data;
      state.growthMetricsData = data.growthMetrics;
      state.financialPerformanceData = data.financialPerformance;
      state.profitabilityMetricsData = data.profitabilityMetrics;
      state.efficiencyMetricsData = data.efficiencyMetrics;
      state.valuationMetricsData = data.valuationMetrics;
      state.analystExpectationsData = data.analystExpectations;
      state.stockPerformanceData = data.stockPerformance;
      state.analystTargetPriceData = data.analystTargetPrice;
    },
    UPDATE_USER: (state, updatedUser) => {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    REMOVE_USER: (state, id) => {
      state.users = state.users.filter(user => user.id !== id)
    },
    ADD_RETAIL: (state, newRetail) => {
      state.retail.push(newRetail)
    },
    UPDATE_RETAIL: (state, updatedRetail) => {
      const index = state.retail.findIndex(retail => retail.id === updatedRetail.id)
      if (index !== -1) {
        state.retail.splice(index, 1, updatedRetail)
      }
    },
    REMOVE_RETAIL: (state, id) => {
      state.retail = state.retail.filter(retail => retail.id !== id)
    },
    ADD_TECHNOLOGY: (state, newTechnology) => {
      state.technology.push(newTechnology)
    },
    UPDATE_TECHNOLOGY: (state, updatedTechnology) => {
      const index = state.technology.findIndex(tech => tech.id === updatedTechnology.id)
      if (index !== -1) {
        state.technology.splice(index, 1, updatedTechnology)
      }
    },
    REMOVE_TECHNOLOGY: (state, id) => {
      state.technology = state.technology.filter(tech => tech.id !== id)
    },
    ADD_FOOD_AND_BEVERAGES: (state, newFoodAndBeverages) => {
      state.foodAndBeverages.push(newFoodAndBeverages)
    },
    UPDATE_FOOD_AND_BEVERAGES: (state, updatedFoodAndBeverages) => {
      const index = state.foodAndBeverages.findIndex(food => food.id === updatedFoodAndBeverages.id)
      if (index !== -1) {
        state.foodAndBeverages.splice(index, 1, updatedFoodAndBeverages)
      }
    },
    REMOVE_FOOD_AND_BEVERAGES: (state, id) => {
      state.foodAndBeverages = state.foodAndBeverages.filter(food => food.id !== id)
    },
    ADD_HEALTHCARE: (state, newHealthcare) => {
      state.healthcare.push(newHealthcare)
    },
    UPDATE_HEALTHCARE: (state, updatedHealthcare) => {
      const index = state.healthcare.findIndex(healthcare => healthcare.id === updatedHealthcare.id)
      if (index !== -1) {
        state.healthcare.splice(index, 1, updatedHealthcare)
      }
    },
    REMOVE_HEALTHCARE: (state, id) => {
      state.healthcare = state.healthcare.filter(healthcare => healthcare.id !== id)
    },
    LOGIN_USER: (state, user) => {
      state.user = user
    },
    LOGOUT_USER: (state) => {
      state.user = null
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}users`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_USERS', data)
        } else {
          throw new Error(`Failed to fetch users: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchUser({ commit }, UserID) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}user/${UserID}`)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_USER', data)
        } else {
          throw new Error(`Failed to fetch user: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRetail({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/retail-data`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_RETAIL', data)
        } else {
          throw new Error(`Failed to fetch retail: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRetailPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/retail/${id}`)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_RETAIL_PREDICTION', data)
        } else {
          throw new Error(`Failed to fetch retail prediction: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchTechnology({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/technology-data`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_TECHNOLOGY', data)
        } else {
          throw new Error(`Failed to fetch technology: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchTechnologyPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/technology/${id}`)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_TECHNOLOGY_PREDICTION', data)
        } else {
          throw new Error(`Failed to fetch technology prediction: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchFoodAndBeverages({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/food-and-beverages-data`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_FOOD_AND_BEVERAGES', data)
        } else {
          throw new Error(`Failed to fetch food and beverages: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchFoodAndBeveragesPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/food-and-beverages/${id}`)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_FOOD_AND_BEVERAGES_PREDICTION', data)
        } else {
          throw new Error(`Failed to fetch food and beverages prediction: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchHealthcare({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/healthcare-data`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_HEALTHCARE', data)
        } else {
          throw new Error(`Failed to fetch healthcare: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchHealthcarePrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/healthcare/${id}`)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_HEALTHCARE_PREDICTION', data)
        } else {
          throw new Error(`Failed to fetch healthcare prediction: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchAllSectorsData({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/all-predictions`)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_ALL_SECTORS_DATA', data)
        } else {
          throw new Error(`Failed to fetch all sectors data: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async registerUser({ commit }, userData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}user/register`, userData)
        const data = response.data?.result || response.data
        if (response.status === 201 && data) {
          commit('SET_USER', data)
          toast.success('User registered successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to register user: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateUser({ commit }, { id, userData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}user/${id}`, userData)
        const data = response.data?.result || response.data
        if (response.status === 200 && data) {
          commit('SET_USER', data)
          toast.success('User updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to update user: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteUser({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.delete(`${hostedData}user/${id}`)
        if (response.status === 200) {
          commit('SET_USER', null)
          toast.success('User deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to delete user: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createRetail({ commit }, retailData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/retail-data`, retailData)
        const data = response.data?.results || response.data
        if (response.status === 201 && data) {
          commit('SET_RETAIL', data)
          toast.success('Retail data created successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to create retail: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateRetail({ commit }, { id, retailData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/retail/${id}`, retailData)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_RETAIL', data)
          toast.success('Retail data updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to update retail: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteRetail({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.delete(`${hostedData}from/db/retail/${id}`)
        if (response.status === 200) {
          commit('SET_RETAIL', null)
          toast.success('Retail data deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to delete retail: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createTechnology({ commit }, technologyData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/technology-data`, technologyData)
        const data = response.data?.results || response.data
        if (response.status === 201 && data) {
          commit('SET_TECHNOLOGY', data)
          toast.success('Technology data created successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to create technology: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateTechnology({ commit }, { id, technologyData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/technology/${id}`, technologyData)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_TECHNOLOGY', data)
          toast.success('Technology data updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to update technology: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteTechnology({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.delete(`${hostedData}from/db/technology/${id}`)
        if (response.status === 200) {
          commit('SET_TECHNOLOGY', null)
          toast.success('Technology data deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to delete technology: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createFoodAndBeverages({ commit }, foodAndBeveragesData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/food-and-beverages-data`, foodAndBeveragesData)
        const data = response.data?.results || response.data
        if (response.status === 201 && data) {
          commit('SET_FOOD_AND_BEVERAGES', data)
          toast.success('Food and beverages data created successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to create food and beverages: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateFoodAndBeverages({ commit }, { id, foodAndBeveragesData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/food-and-beverages/${id}`, foodAndBeveragesData)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_FOOD_AND_BEVERAGES', data)
          toast.success('Food and beverages data updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to update food and beverages: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteFoodAndBeverages({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.delete(`${hostedData}from/db/food-and-beverages/${id}`)
        if (response.status === 200) {
          commit('SET_FOOD_AND_BEVERAGES', null)
          toast.success('Food and beverages data deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to delete food and beverages: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createHealthcare({ commit }, healthcareData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/healthcare-data`, healthcareData)
        const data = response.data?.results || response.data
        if (response.status === 201 && data) {
          commit('SET_HEALTHCARE', data)
          toast.success('Healthcare data created successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to create healthcare: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateHealthcare({ commit }, { id, healthcareData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/healthcare/${id}`, healthcareData)
        const data = response.data?.results || response.data
        if (response.status === 200 && data) {
          commit('SET_HEALTHCARE', data)
          toast.success('Healthcare data updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to update healthcare: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteHealthcare({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.delete(`${hostedData}from/db/healthcare/${id}`)
        if (response.status === 200) {
          commit('SET_HEALTHCARE', null)
          toast.success('Healthcare data deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to delete healthcare: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async loginUser({ commit }, loginData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}user/login`, loginData)
        const data = response.data
        if (response.status === 200 && data.user) {
          commit('SET_USER', data.user)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          toast.success('Logged in successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        } else {
          throw new Error(`Failed to login: ${response.statusText || response.status}`)
        }
      } catch (error) {
        handleError(commit, error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logoutUser({ commit }) {
      commit('SET_LOADING', true)
      try {
        await axios.post(`${hostedData}user/logout`)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        commit('SET_USER', null)
        delete axios.defaults.headers.common['Authorization']
        toast.success('Logged out successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      } catch (error) {
        console.error(error)
        toast.error('Failed to logout', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchSymbolData({ commit }, { symbol, sector }) {
      commit('SET_LOADING', true);
      try {
        let response;
        switch(sector) {
          case 'Retail':
            response = await axios.get(`${hostedData}from/db/retail/${symbol}`);
            break;
          case 'Technology':
            response = await axios.get(`${hostedData}from/db/technology/${symbol}`);
            break;
          case 'Food and Beverages':
            response = await axios.get(`${hostedData}from/db/food-and-beverages/${symbol}`);
            break;
          case 'Healthcare':
            response = await axios.get(`${hostedData}from/db/healthcare/${symbol}`);
            break;
          default:
            throw new Error('Invalid sector');
        }
        const data = response.data?.result || response.data;
    if (response.status === 200 && data) {
      commit('SET_SYMBOL_DATA', data);
    } else {
      throw new Error(`Failed to fetch symbol data: ${response.statusText || response.status}`);
    }
  } catch (error) {
    handleError(commit, error);
  } finally {
    commit('SET_LOADING', false);
  }
}
  },
  modules: {}
})