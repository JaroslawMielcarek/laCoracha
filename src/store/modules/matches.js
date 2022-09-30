import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'
import { getByTimeRange, sortByDate } from '@/services/util/object'

const DEFAULT_MATCH = {
  league: '',
  dateTime: {
    date: '',
    time: ''
  },
  location: '',
  friendly: false,
  homeTeam: {
    clubName: '',
    teamName: '',
    teamGender: '',
    wonSets: null
  },
  guestTeam: {
    clubName: '',
    teamName: '',
    teamGender: '',
    wonSets: null
  }
}

export const matches = {
  state: () => ({
    matches: [],
    isLoading: false,
    failed: false,
    errorMessage: ''
  }),
  actions: {
    addMatch ({ commit, dispatch }, data) {
      commit('setLoading', true)
      return ModeratorService.create('Match', data)
        .then(response => {
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    removeMatch ({ commit, dispatch }, data) {
      commit('setLoading', true)
      return ModeratorService.remove('Match', {_id: data._id})
        .then(response => {
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    updateMatch ({ commit, dispatch }, data) {
      commit('setLoading', true)
      return ModeratorService.update('Match', data)
        .then(response => {
          dispatch('fetchMatches')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    fetchMatches: ({ commit }) => {
      commit('setLoading', true)
      return PublicService.getAll('Matches')
        .then(response => { commit('setMatchesSuccess', response) })
        .catch(error => { commit('setMatchesFailure', error) })
    }
  },
  mutations: {
    setLoading: (state, val) => { state.isLoading = val },
    setMatchesSuccess (state, matches) {
      state.matches = matches
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setMatchesSuccess')
    },
    setMatchesFailure (state, error) {
      state.matches = []
      state.failed = true
      state.isLoading = false
      
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
      return (!state.matches.length || !timeRange) 
        ? []
        : sortByDate(getByTimeRange(state.matches, timeRange), 'dateTime', true)
    },
    getMatches (state) { return sortByDate(state.matches, 'dateTime', true) },
    getDefaultMatch () { return DEFAULT_MATCH },

    getMatchesErrorMessage: (state) => state.errorMessage,
    getMatchesLoadingState: (state) => state.isLoading,
    getMatchesFailState: (state) => state.failed
  }
}
