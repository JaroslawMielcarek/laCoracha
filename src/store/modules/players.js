
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
    players: []
  }),
  actions: {
    removePlayer ({ commit, dispatch }, data) {
      return ModeratorService.remove('User', {_id: data._id})
        .then(response => {
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    updatePlayer ({ commit, dispatch }, data) {
      return ModeratorService.update('User', data)
        .then(response => {
          dispatch('fetchPlayers')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    fetchPlayers: ({ commit }) => {
      ModeratorService.getAll('Players')
        .then(response => { commit('setPlayersSuccess', response) })
        .catch(error => {
          commit('setPlayersFailure')
        })
    }
  },
  mutations: {
    setPlayersSuccess (state, players) {
      state.players = [...players]
      // state.failed = false
      console.log('setPlayersSuccess')
    },
    setPlayersFailure (state) {
      state.players = []
      // state.failed = true
      console.log('setPlayersFailure')
    }
  },
  getters: {
    getPlayers (state) { return state.players },
    getPlayersIDs (state) { return state.players.map(p => p.memberID) },
    getPlayerPreferedPositions: (state) => (_id) => { return state.players.filter(p => p._id === _id).positionsPlayed || [] },
    getDefaultPlayer () { return DEFAULT_PLAYER },
  }
}
