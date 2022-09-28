import AdminService from '@/services/admin.service.js'

export const sponsors = {
  state: () => ({
    sponsors: [],
  }),
  actions: {
    addSponsor ({ commit, dispatch }, data) {
      return AdminService.create('Sponsor', data)
        .then(response => {
          // dispatch('updateStates', { root: true })
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    removeSponsor ({ commit, dispatch }, data) {
      return AdminService.remove('Sponsor', data)
        .then(response => {
          // dispatch('updateStates', { root: true })
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    updateSponsor ({ commit, dispatch }, data) {
      return AdminService.update('Sponsor', data)
        .then(response => {
          // dispatch('updateStates', { root: true })
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          if (error.response.data && error.response.data.message) return Promise.reject(error.response.data.message)
          return Promise.reject(error)
        })
    },
    fetchSponsors: ({ commit, dispatch }) => {
      return AdminService.getAll('Sponsors')
        .then(response => {
          commit('setSponsorsSuccess', response)
          // return Promise.resolve(response.data)
        })
        .catch(error => {
          commit('setSponsorsFailure', error)
          // return Promise.reject(error)
        })
    }
  },
  mutations: {
    setSponsorsSuccess (state, sponsors) {
      state.sponsors = sponsors

      console.log('setSponsorsSuccess')
    },
    setSponsorsFailure (state, error) {
      state.sponsors = []
      
      console.log('setSponsorsFailure')
    }
  },
  getters: {
    getSponsors (state) { return state.sponsors },
    getSponsorsNames (state) { return state.sponsors.map(s => s.name) },
  }
}
