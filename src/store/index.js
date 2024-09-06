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
        const response = await axios.get(`${hostedData}api/retail-data`)
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
        const response = await axios.get(`${hostedData}api/retail/${id}`)
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
        const response = await axios.get(`${hostedData}api/technology-data`)
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
        const response = await axios.get(`${hostedData}api/technology/${id}`)
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
        const response = await axios.get(`${hostedData}api/food-and-beverages`)
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
        const response = await axios.get(`${hostedData}api/food-and-beverages-data/${id}`)
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
        const response = await axios.get(`${hostedData}api/healthcare`)
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
        const response = await axios.get(`${hostedData}api/healthcare/${id}`)
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
    }
  },
  modules: {}
})