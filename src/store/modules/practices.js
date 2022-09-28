import UserService from '@/services/user.service.js'
import ModeratorService from '@/services/moderator.service.js'
import { sortByDate, getByTimeRange } from '@/services/util/object'

export const practices = {
  state: () => ({
    defaultPractice: {
      dateTime: { date: '', time: '' },
      playersLimit: 12,
      // playersSubscribed: 0,
      // percentOcupied: 0,
      players: []
    },
    practices: []
  }),
  actions: {
    subscribeForPractice: ({ commit, dispatch }, data) => {
      return UserService.subscribe('Practice', data)
        .then(response => {
          dispatch('fetchPractices')
          return Promise.resolve(response.message)
          // dispatch('updateStates', { root: true })
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    addPractice: ({ commit, dispatch }, data) => {
      return ModeratorService.create('Practice', data)
        .then(response => {
          console.log('addPractice response', response)
          // dispatch('updateStates', { root: true })
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
      // commit('addPractice', data)
    },
    updatePractice: ({ commit, dispatch }, data) => {
      return ModeratorService.update('Practice', data)
        .then(response => {
          console.log('updatePractice response', response)
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
      // commit('updatePractice', data)
    },
    removePractice: ({ commit, dispatch }, data) => {
      return ModeratorService.remove('Practice', {_id: data._id})
        .then(response => {
          dispatch('fetchPractices')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
      // commit('removePractice', data)
    },
    fetchPractices: ({ commit }) => {
      UserService.getAll('Practices')
        .then(response => {
          commit('setPracticesSuccess', response)
          // return Promise.resolve(response.data)
        })
        .catch(error => {
          console.log('FetchPractices error', error.response.data.message)
          commit('setPracticesFailure')
          // return Promise.reject(error)
        })
    }
  },
  mutations: {
    setPracticesSuccess: (state, practices) => {
      state.practices = practices
      // state.failed = false
      console.log('setPracticesSuccess')
    },
    setPracticesFailure: (state) => {
      state.practices = []
      // state.failed = true
      console.log('setPracticesFailure')
    }
  },
  getters: {
    getPracticesOf: (state) => (timeRange) => {
      if (!state.practices.length || !timeRange) return []
      
      return sortByDate(getByTimeRange(state.practices, timeRange), 'dateTime', true)
    },
    getDefaultPractice: (state) => { return state.defaultPractice },
    getPractices: (state) => { return sortByDate(state.practices, 'dateTime', true) }
  }
}
