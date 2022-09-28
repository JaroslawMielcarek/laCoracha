import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'
import { getByTimeRange, sortByDate } from '@/services/util/object'

export const matches = {
  state: () => ({
    matches: [],
    failed: false,
    errorMessage: ''
  }),
  actions: {
    addMatch ({ commit, dispatch }, data) {
      return ModeratorService.create('Match', data)
        .then(response => {
          // commit('addMatch', data)
          console.log('addMatch response', response)
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    removeMatch ({ commit, dispatch }, data) {
      return ModeratorService.remove('Match', {_id: data._id})
        .then(response => {
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    updateMatch ({ commit, dispatch }, data) {
      return ModeratorService.update('Match', data)
        .then(response => {
          // commit('updateMatch', data)
          console.log('updateMatch response', response)
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    fetchMatches: ({ commit }) => {
      return PublicService.getAll('Matches')
        .then(response => {
          commit('setMatchesSuccess', response)
          // return Promise.resolve(response.data)
        })
        .catch(error => {
          commit('setMatchesFailure', error)
          // return Promise.reject(error)
        })
    }
  },
  mutations: {
    setMatchesSuccess (state, matches) {
      state.matches = matches
      state.failed = false
      state.errorMessage = ''
      console.log('setMatchesSuccess')
    },
    setMatchesFailure (state, error) {
      state.matches = []
      state.failed = true
      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setMatchesFailure')
      }
    },
  },
  getters: {
    getMatchesOf: (state) => (timeRange) => {
      if (!state.matches.length || !timeRange) return []
      
      return sortByDate(getByTimeRange(state.matches, timeRange), 'dateTime', true)
    },
    getMatches (state) { return sortByDate(state.matches, 'dateTime', true) },
    getMatchesErrorMessage (state) { return state.errorMessage }
  }
}
