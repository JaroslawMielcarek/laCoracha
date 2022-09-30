import AuthService from '@/services/auth/auth.service.js'
import UserService from '@/services/user.service.js'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  // if true then access is by auth/
  // namespaced: true,
  state: initialState,
  actions: {
    refreshToken ({ commit }, accessToken) {
      commit('refreshToken', accessToken)
    },
    login ({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register ({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    },
    updateUserBasicInfo ({ commit }, data) {
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
    refreshToken (state, accessToken) {
      state.status.loggedIn = true
      state.user = { ...state.user, accessToken: accessToken }
    },
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess (state) { state.status.loggedIn = false },
    registerFailure (state) { state.status.loggedIn = false },
    updateUserBasicInfo (state, values) { state.user = { ...state.user, ...values } }
  },
  getters: {
    getStatus (state) { return state.status.loggedIn },
    getUsername (state) { return (state.user) ? state.user.username : 'Not logged in' },
    getUser (state) { return (state.user) ? state.user : null },
    getUserID (state) { return (state.user) ? state.user.id : null },
    getUserRoles (state) { return (state.user) ? state.user.roles : null },
    getUserGender (state) { return (state.user) ? state.user.isFemale : false }
  }
}
