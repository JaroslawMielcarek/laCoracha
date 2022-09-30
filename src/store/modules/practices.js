import UserService from '@/services/user.service.js'
import ModeratorService from '@/services/moderator.service.js'
import { sortByDate, getByTimeRange } from '@/services/util/object'


const DEFAULT_PRACTICE = {
  dateTime: { date: '', time: '' },
  playersLimit: 12,
  players: []
}

export const practices = {
  state: () => ({
    practices: [],
    isLoading: false,
    failed: false,
    errorMessage: ''
  }),
  actions: {
    subscribeForPractice: ({ commit, dispatch }, data) => {
      commit('setLoading', true)
      return UserService.subscribe('Practice', data)
        .then(response => {
          dispatch('fetchPractices')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    addPractice: ({ commit, dispatch }, data) => {
      commit('setLoading', true)
      return ModeratorService.create('Practice', data)
        .then(response => {
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    updatePractice: ({ commit, dispatch }, data) => {
      commit('setLoading', true)
      return ModeratorService.update('Practice', data)
        .then(response => {
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    removePractice: ({ commit, dispatch }, data) => {
      commit('setLoading', true)
      return ModeratorService.remove('Practice', {_id: data._id})
        .then(response => {
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    fetchPractices: ({ commit }) => {
      UserService.getAll('Practices')
        .then(response => { commit('setPracticesSuccess', response) })
        .catch(error => { commit('setPracticesFailure', error) })
    }
  },
  mutations: {
    setLoading: (state, val) => { state.isLoading = val },
    setPracticesSuccess: (state, practices) => {
      state.practices = practices
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setPracticesSuccess')
    },
    setPracticesFailure: (state) => {
      state.practices = []
      state.failed = true
      state.isLoading = false
      
      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setSponsorsFailure')
      }
      console.log('setPracticesFailure')
    }
  },
  getters: {
    getPracticesOf: (state) => (timeRange) => {
      return (!state.practices.length || !timeRange) 
        ? []
        : sortByDate(getByTimeRange(state.practices, timeRange), 'dateTime', true)
    },
    getDefaultPractice: () => { return DEFAULT_PRACTICE },
    getPractices: (state) => { return sortByDate(state.practices, 'dateTime', true) },

    getPracticesErrorMessage: (state) => state.errorMessage,
    getPracticesLoadingState: (state) => state.isLoading,
    getPracticesFailState: (state) => state.failed
  }
}
