import AuthService from '@/services/auth/auth.service.js'
import UserService from '@/services/user.service.js'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  // if true then access is by auth/
  // namespaced: true,
  state: { 
    ...initialState,
    isLoading: false,
    failed: false,
    errorMessage: ''
  },
  actions: {
    refreshToken ({ commit }, accessToken) {
      commit('refreshToken', accessToken)
    },
    login ({ commit }, user) {
      commit('setAuthLoading', true)
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure', error)
          return Promise.reject(error)
        }
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register ({ commit }, user) {
      commit('setAuthLoading', true)
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure', error)
          return Promise.reject(error)
        }
      )
    },
    updateUserBasicInfo ({ commit }, data) {
      commit('setAuthLoading', true)
      return UserService.updateUserData(data).then(
        response => {
          commit('updateUserBasicInfo', response)
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    setAuthLoading: (state, val = false) => { state.isLoading = val },
    refreshToken (state, accessToken) {
      state.status.loggedIn = true
      state.user = { ...state.user, accessToken: accessToken }
    },
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
    },
    loginFailure (state, error) {
      state.status.loggedIn = false
      state.user = null
      state.failed = true
      state.isLoading = false

      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        state.errorMessage = error.response.data.message
        console.log('Error', error.response)
      } else {
        console.log('setSponsorsFailure')
      }
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess (state) { 
      state.status.loggedIn = false
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
    },
    registerFailure (state, error) { 
      state.status.loggedIn = false
      state.failed = true
      state.isLoading = false

      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setSponsorsFailure')
      }
    },
    updateUserBasicInfo (state, values) { state.user = { ...state.user, ...values } }
  },
  getters: {
    getStatus (state) { return state.status.loggedIn },
    getUsername (state) { return (state.user) ? state.user.username : 'Not logged in' },
    getUser (state) { return (state.user) ? state.user : null },
    getUserID (state) { return (state.user) ? state.user.id : null },
    getUserRoles (state) { return (state.user) ? state.user.roles : null },
    getUserGender (state) { return (state.user) ? state.user.isFemale : false },

    getAuthErrorMessage: (state) => state.errorMessage,
    getAuthLoadingState: (state) => state.isLoading,
    getAuthFailState: (state) => state.failed
  }
}
