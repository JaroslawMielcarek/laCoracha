import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'

const DEFAULT_TEAM = {
  logo: undefined,
  name: '',
  feminino: false,
  league: '',
  players: []
}

export const teams = {
  state: () => ({
    teams: [],
    isLoading: false,
    failed: false,
    errorMessage: ''
  }),
  actions: {
    addTeam ({ commit, dispatch }, data) {
      commit('setTeamsLoading', true)
      return ModeratorService.create('Team', data)
        .then(response => {
          dispatch('fetchTeams')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    updateTeam ({ commit, dispatch }, data) {
      commit('setTeamsLoading', true)
      return ModeratorService.update('Team', data)
        .then(response => {
          // dispatch('updateStates', { root: true })
          dispatch('fetchTeams')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    removeTeam ({ commit, dispatch }, data) {
      commit('setTeamsLoading', true)
      return ModeratorService.remove('Team', {_id: data._id})
        .then(response => {
          dispatch('fetchTeams')
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    fetchTeams: ({ commit, dispatch }) => {
      commit('setTeamsLoading', true)
      PublicService.getAll('Teams')
        .then(response => { commit('setTeamsSuccess', response) })
        .catch(error => { commit('setTeamsFailure', error) })
    }
  },
  mutations: {
    setTeamsLoading: (state, val) => { state.isLoading = val },
    setTeamsSuccess: (state, teams) => {
      state.teams = teams
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setTeamsSuccess')
    },
    setTeamsFailure: (state, error) => {
      state.teams = []
      state.failed = true
      state.isLoading = false

      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setTeamsFailure')
      }
    }
  },
  getters: {
    getTeams: (state) => { return state.teams },
    getTeamsNames: (state) => { return state.teams.map(t => t.name) },
    getDefaultTeam () { return DEFAULT_TEAM },

    getTeamsErrorMessage: (state) => state.errorMessage,
    getTeamsLoadingState: (state) => state.isLoading,
    getTeamsFailState: (state) => state.failed
  }
}
