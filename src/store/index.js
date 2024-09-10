import { createStore } from 'vuex'
import axios from 'axios'

const hostedData = "http://localhost:3001/"


export default createStore({
  state: {
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
    healthcarePrediction: null
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
    singleHealthcarePrediction: (state) => state.healthcarePrediction
  },
  mutations: {
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
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_USER: (state, newUser) => {
      state.users.push(newUser)
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
      state.user = null;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}users`)
        if (response.status === 200) {
          commit('SET_USERS', response.data.results)
        } else {
          throw new Error(`Failed to fetch users: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchUser({ commit }, UserID) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}user/${UserID}`)
        if (response.status === 200) {
          commit('SET_USER', response.data.result)
        } else {
          throw new Error(`Failed to fetch user: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRetail({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/retail-data`)
        if (response.status === 200) {
          commit('SET_RETAIL', response.data.results)
        } else {
          throw new Error(`Failed to fetch retail: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRetailPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/retail/${id}`)
        if (response.status === 200) {
          commit('SET_RETAIL_PREDICTION', response.data.result)
        } else {
          throw new Error(`Failed to fetch retail prediction: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchTechnology({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/technology-data`)
        if (response.status === 200) {
          commit('SET_TECHNOLOGY', response.data.results)
        } else {
          throw new Error(`Failed to fetch technology: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchTechnologyPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/technology/${id}`)
        if (response.status === 200) {
          commit('SET_TECHNOLOGY_PREDICTION', response.data.result)
        } else {
          throw new Error(`Failed to fetch technology prediction: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchFoodAndBeverages({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/food-and-beverages-data`)
        if (response.status === 200) {
          commit('SET_FOOD_AND_BEVERAGES', response.data.results)
        } else {
          throw new Error(`Failed to fetch food and beverages: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchFoodAndBeveragesPrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/food-and-beverages/${id}`)
        if (response.status === 200) {
          commit('SET_FOOD_AND_BEVERAGES_PREDICTION', response.data.result)
        } else {
          throw new Error(`Failed to fetch food and beverages prediction: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchHealthcare({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/healthcare-data`)
        if (response.status === 200) {
          commit('SET_HEALTHCARE', response.data.results)
        } else {
          throw new Error(`Failed to fetch healthcare: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchHealthcarePrediction({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${hostedData}from/db/healthcare/${id}`)
        if (response.status === 200) {
          commit('SET_HEALTHCARE_PREDICTION', response.data.result)
        } else {
          throw new Error(`Failed to fetch healthcare prediction: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async registerUser({ commit }, userData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}user/register`, userData)
        if (response.status === 201) {
          commit('SET_USER', response.data.result)
        } else {
          throw new Error(`Failed to register user: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateUser({ commit }, { id, userData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}user/${id}`, userData)
        if (response.status === 200) {
          commit('SET_USER', response.data.result)
        } else {
          throw new Error(`Failed to update user: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteUser({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`${hostedData}user/${id}`)
        commit('SET_USER', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createRetail({ commit }, retailData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/retail-data`, retailData)
        if (response.status === 201) {
          commit('SET_RETAIL', response.data.results)
        } else {
          throw new Error(`Failed to create retail: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateRetail({ commit }, { id, retailData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/retail/${id}`, retailData)
        if (response.status === 200) {
          commit('SET_RETAIL', response.data.results)
        } else {
          throw new Error(`Failed to update retail: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteRetail({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`${hostedData}from/db/retail/${id}`)
        commit('SET_RETAIL', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createTechnology({ commit }, technologyData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/technology-data`, technologyData)
        if (response.status === 201) {
          commit('SET_TECHNOLOGY', response.data.results)
        } else {
          throw new Error(`Failed to create technology: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateTechnology({ commit }, { id, technologyData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/technology/${id}`, technologyData)
        if (response.status === 200) {
          commit('SET_TECHNOLOGY', response.data.results)
        } else {
          throw new Error(`Failed to update technology: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteTechnology({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`${hostedData}from/db/technology/${id}`)
        commit('SET_TECHNOLOGY', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createFoodAndBeverages({ commit }, foodAndBeveragesData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/food-and-beverages-data`, foodAndBeveragesData)
        if (response.status === 201) {
          commit('SET_FOOD_AND_BEVERAGES', response.data.results)
        } else {
          throw new Error(`Failed to create food and beverages: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateFoodAndBeverages({ commit }, { id, foodAndBeveragesData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/food-and-beverages/${id}`, foodAndBeveragesData)
        if (response.status === 200) {
          commit('SET_FOOD_AND_BEVERAGES', response.data.results)
        } else {
          throw new Error(`Failed to update food and beverages: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteFoodAndBeverages({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`${hostedData}from/db/food-and-beverages/${id}`)
        commit('SET_FOOD_AND_BEVERAGES', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createHealthcare({ commit }, healthcareData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}to/db/healthcare-data`, healthcareData)
        if (response.status === 201) {
          commit('SET_HEALTHCARE', response.data.results)
        } else {
          throw new Error(`Failed to create healthcare: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateHealthcare({ commit }, { id, healthcareData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.patch(`${hostedData}from/db/healthcare/${id}`, healthcareData)
        if (response.status === 200) {
          commit('SET_HEALTHCARE', response.data.results)
        } else {
          throw new Error(`Failed to update healthcare: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteHealthcare({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(`${hostedData}from/db/healthcare/${id}`)
        commit('SET_HEALTHCARE', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async loginUser({ commit }, loginData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${hostedData}user/login`, loginData)
        if (response.status === 200) {
          commit('SET_USER', response.data.user)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        } else {
          throw new Error(`Failed to login: ${response.statusText}`)
        }
      } catch (error) {
        commit('SET_ERROR', error.message)
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
          delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
          console.error(error)
        } finally {
          commit('SET_LOADING', false)
        }
      }
  },
  modules: {}
})