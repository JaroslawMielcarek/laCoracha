import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'

export const teams = {
  state: () => ({
    teams: [],
    failed: false,
    errorMessage: ''
  }),
  actions: {
    addTeam ({ commit, dispatch }, data) {
      return ModeratorService.create('Team', data)
        .then(response => {
          // dispatch('updateStates', { root: true })
          // dispatch('fetchTeams')
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

      return ModeratorService.remove('Team', {_id: '3013993453'})
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
    fetchTeams: ({ commit, dispatch }) => {
      PublicService.getAll('Teams')
        .then(response => {
          commit('setTeamsSuccess', response)
          // return Promise.resolve(response.data)
        })
        .catch(error => {
          commit('setTeamsFailure', error)
          // return Promise.reject(error)
        })
    }
  },
  mutations: {
    setTeamsSuccess: (state, teams) => {
      state.teams = teams
      
      state.failed = false
      state.errorMessage = ''

      console.log('setTeamsSuccess')
    },
    setTeamsFailure: (state, error) => {
      state.teams = []
      state.failed = true

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
    getTeamsErrorMessage: (state) => { return state.errorMessage }
  }
}
