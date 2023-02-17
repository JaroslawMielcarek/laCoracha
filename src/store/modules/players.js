
import ModeratorService from '@/services/moderator.service.js'

const DEFAULT_PLAYER = {
  memberID: '',
  nick: {
    value: '',
    permisionGranted: false
  },
  number: {
    value: '',
    permisionGranted: false
  },
  position: {
    value: '',
    permisionGranted: false
  },
  height: {
    value: '',
    permisionGranted: false
  },
  dominantHand: {
    value: '',
    permisionGranted: false
  },
  isFemale: false,
  preferedPositions: [],
  inTeamPerformance: {
    attack: {
      good: 0,
      bad: 0,
      percent: 0,
      prevPercent: 0
    },
    recieve: {
      good: 0,
      bad: 0,
      percent: 0,
      prevPercent: 0
    },
    set: {
      good: 0,
      bad: 0,
      percent: 0,
      prevPercent: 0
    },
    block: {
      good: 0,
      bad: 0,
      percent: 0,
      prevPercent: 0
    },
    serve: {
      good: 0,
      bad: 0,
      percent: 0,
      prevPercent: 0
    }
  },
  practices: {
    attended: 0,
    strikes: {
      qty: 0,
      lastStrike: ''
    },
    positionsPlayed: {
      EXT: 0,
      CO: 0,
      OP: 0,
      LIB: 0,
      CE: 0
    }
  },
  preferedHours: {
    monday: {},
    saturday: {},
    sunday: {}
  }
}

export const players = {
  state: () => ({
    players: [],
    isLoading: false,
    failed: false,
    errorMessage: ''
  }),
  actions: {
    updatePlayer ({ commit, dispatch }, data) {
      commit('setPlayersLoading', true)
      return ModeratorService.update('User', data)
        .then(response => {
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    removePlayer ({ commit, dispatch }, data) {
      commit('setPlayersLoading', true)
      return ModeratorService.remove('User', {_id: data._id})
        .then(response => {
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    fetchPlayers: ({ commit }) => {
      commit('setPlayersLoading', true)
      ModeratorService.getAll('Players')
        .then(response => { commit('setPlayersSuccess', response) })
        .catch(error => { commit('setPlayersFailure', error) })
    }
  },
  mutations: {
    setPlayersLoading: (state, val) => { state.isLoading = val },
    setPlayersSuccess (state, players) {
      state.players = [...players]
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setPlayersSuccess')
    },
    setPlayersFailure (state, error) {
      state.players = []
      state.failed = true
      state.isLoading = false
      
      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setSponsorsFailure')
      }
      console.log('setPlayersFailure')
    }
  },
  getters: {
    getPlayers (state) { return state.players },
    getPlayersIDs (state) { return state.players.map(p => p.memberID) },
    getPlayerPreferedPositions: (state) => (_id) => { return state.players.filter(p => p._id === _id).positionsPlayed || [] },
    getDefaultPlayer () { return DEFAULT_PLAYER },

    getPlayersErrorMessage: (state) => state.errorMessage,
    getPlayersLoadingState: (state) => state.isLoading,
    getPlayersFailState: (state) => state.failed
  }
}
