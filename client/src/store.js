import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerForm: false,
    loginForm: false,
    profile: null,
    addForm: false
  },
  mutations: {
    register (state, register) {
      state.registerForm = register
    },
    login (state, login) {
      state.loginForm = login
    },
    cancel (state, cancel) {
      state.registerForm = false
      state.loginForm = false
    },
    profile (state, profileInfo) {
      state.profile = profileInfo
    },
    addNew (state, addForm) {
      state.addForm = addForm
    }
  },
  actions: {
    registerform ({ commit }, payload) {
      commit('register', payload)
      commit('login', false)
    },
    loginform ({ commit }, payload) {
      commit('login', payload)
      commit('register', false)
    },
    cancelAll ({ commit }, payload) {
      commit('cancel')
    },
    profileInfo ({ commit }, payload) {
      commit('profile', payload)
    },
    addForm ({ commit }, payload) {
      commit('addNew', payload)
    }
  }
})
