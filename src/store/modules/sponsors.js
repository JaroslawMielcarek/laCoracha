import AdminService from '@/services/admin.service.js'

const DEFAULT_SPONSOR = {
  name: '',
  contribution: 0,
  isMain: false,
  link: '',
  logo: undefined
}

export const sponsors = {
  state: () => ({
    sponsors: [],
    isLoading: false,
    failed: false,
    errorMessage: ''
  }),
  actions: {
    addSponsor ({ commit, dispatch }, data) {
      commit('setSponsorsLoading', true)
      return AdminService.create('Sponsor', data)
        .then(response => {
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message) 
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    removeSponsor ({ commit, dispatch }, data) {
      commit('setSponsorsLoading', true)
      return AdminService.remove('Sponsor', data)
        .then(response => {
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    updateSponsor ({ commit, dispatch }, data) {
      commit('setSponsorsLoading', true)
      return AdminService.update('Sponsor', data)
        .then(response => {
          dispatch('fetchSponsors')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    fetchSponsors: ({ commit, dispatch }) => {
      commit('setSponsorsLoading', true)
      return AdminService.getAll('Sponsors')
        .then(response => { commit('setSponsorsSuccess', response) })
        .catch(error => { commit('setSponsorsFailure', error) })
    }
  },
  mutations: {
    setSponsorsLoading: (state, val) => { state.isLoading = val },
    setSponsorsSuccess (state, sponsors) {
      state.sponsors = sponsors
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setSponsorsSuccess')
    },
    setSponsorsFailure (state, error) {
      state.sponsors = []
      state.failed = true
      state.isLoading = false
      
      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setSponsorsFailure')
      }
    }
  },
  getters: {
    getSponsors (state) { return state.sponsors },
    getSponsorsNames (state) { return state.sponsors.map(s => s.name) },
    getDefaultSponsor () { return DEFAULT_SPONSOR },

    getSponsorsErrorMessage: (state) => state.errorMessage,
    getSponsorsLoadingState: (state) => state.isLoading,
    getSponsorsFailState: (state) => state.failed
  }
}
