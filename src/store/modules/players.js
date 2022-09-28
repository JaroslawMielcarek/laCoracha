
import ModeratorService from '@/services/moderator.service.js'
// import AdminService from '@/services/admin.service.js'

export const players = {
  state: () => ({
    players: []
  }),
  actions: {
    // addPlayer ({ commit, dispatch }, data) {
    //   return AdminService.create('User', data)
    //     .then(response => {
    //       console.log('addUser response', response)
    //       // dispatch('updateStates', { root: true })
    //       dispatch('fetchPlayers')
    //       return Promise.resolve(response.message)
    //     })
    //     .catch(error => {
    //       if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
    //       return Promise.reject(error)
    //     })
    // },
    removePlayer ({ commit, dispatch }, data) {
      return ModeratorService.remove('User', {_id: data._id})
        .then(response => {
          console.log('removeUser response', response)
          // dispatch('updateStates', { root: true })
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
          console.log('updatePlayer response', response)
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
          console.log('FetchPlayers error', error.response)
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
    // getPlayer: (state) => (memberID) => { return state.players.find(p => parseInt(p.memberID) === parseInt(memberID)) },
    // getPlayerByID: (state) => (ID) => { return state.players.find(p => p.id === ID) },
    // AddEditPractice , PracticePlayersList , PlayersManager, AddEditTeam
    getPlayers (state) { return state.players },
    // AddEditPlayer
    getPlayersIDs (state) { return state.players.map(p => p.memberID) },
    // getPlayersOfTheTeam: (state) => (teamName) => { return state.players.filter(p => p.team === teamName) },
    getPlayerPreferedPositions: (state) => (_id) => { return state.players.filter(p => p._id === _id).positionsPlayed || [] }
  }
}
