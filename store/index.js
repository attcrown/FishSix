// store/index.js
export const state = () => ({
    firstName: '',
    lastName: ''
  })
  
  export const mutations = {
    SET_FIRST_NAME(state, firstName) {
      state.firstName = firstName
    },
    SET_LAST_NAME(state, lastName) {
      state.lastName = lastName
    }
  }
  
  export const actions = {
    updateFirstName({ commit }, firstName) {
      commit('SET_FIRST_NAME', firstName)
    },
    updateLastName({ commit }, lastName) {
      commit('SET_LAST_NAME', lastName)
    }
  }
  