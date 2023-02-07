import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'
import { getByTimeRange, sortByDate } from '@/services/util/object'

const DEFAULT_CATEGORY = {
  feminino: {
    maxPlaces: 16,
    currentEnrolled: 0,
    list: []
  },
  masculino: {
    maxPlaces: 16,
    currentEnrolled: 0,
    list: []
  }
}

export const enrolled = {
  state: () => ({
    enrolled: [],
    isLoading: false,
  }),
  actions: {
    addEnrollmentCategory ({ commit, dispatch }, data) {
      commit('setEnrolledLoading', true)
      return ModeratorService.create('Enrolled', data)
        .then(response => {
          dispatch('fetchEnrolled')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    // addMatch ({ commit, dispatch }, data) {
    //   commit('setMatchLoading', true)
    //   return ModeratorService.create('Match', data)
    //     .then(response => {
    //       dispatch('fetchMatches')
    //       return Promise.resolve(response.message)
    //     })
    //     .catch(error => {
    //       return (error.response.data && error.response.data.message)
    //         ? Promise.reject(error.response.data.message)
    //         : Promise.reject(error)
    //     })
    // },
    removeCandidate ({ commit, dispatch }, data) {
      commit('setEnrolledLoading', true)
      return ModeratorService.remove('Candidate', {_id: data._id, gender: data.gender})
        .then(response => {
          dispatch('fetchEnrolled')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    removeEnrollmentCategory ({ commit, dispatch }, data) {
      commit('setEnrolledLoading', true)
      return ModeratorService.remove('Enrolled', {_id: data._id})
        .then(response => {
          dispatch('fetchEnrolled')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },

    updateCandidate ({ commit, dispatch }, data) {
      commit('setEnrolledLoading', true)
      return ModeratorService.update('Candidate', { _id: data._id, gender: data.gender, wasContacted: data.wasContacted, contactedBy: data.contactedBy, comments: data.comments })
        .then(response => {
          dispatch('fetchEnrolled')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    updateEnrollmentCategory ({ commit, dispatch }, data) {
      commit('setEnrolledLoading', true)
      return ModeratorService.update('Enrolled', data)
        .then(response => {
          dispatch('fetchEnrolled')
          return Promise.resolve(response.message)
        })
        .catch(error => {
          return (error.response.data && error.response.data.message)
            ? Promise.reject(error.response.data.message)
            : Promise.reject(error)
        })
    },
    fetchEnrolled: ({ commit }) => {
      commit('setEnrolledLoading', true)
      return ModeratorService.getAll('Enrolled')
        .then(response => { commit('setEnrolledSuccess', response) })
        .catch(error => { commit('setEnrolledFailure', error) })
    }
  },
  mutations: {
    setEnrolledLoading: (state, val) => { state.isLoading = val },
    setEnrolledSuccess (state, value) {
      state.enrolled = [...value]
      state.failed = false
      state.isLoading = false
      state.errorMessage = ''
      console.log('setEnrolledSuccess')
    },
    setEnrolledFailure (state, error) {
      state.enrolled = []
      state.failed = true
      state.isLoading = false
      
      if (!error.response) {
        state.errorMessage = 'Hay un problema para conectarse a la base de datos'
      } else if (error.response) {
        console.log('Error', error.response)
      } else {
        console.log('setEnrolledFailure')
      }
    },
  },
  getters: {


    getEnrolled: (state) => state.enrolled,
    getEnrolledOf: (state) => (category) => state[category],
    
    // getMatches (state) { return sortByDate(state.matches, 'dateTime', true) },

    getEnrolledErrorMessage: (state) => state.errorMessage,
    getEnrolledLoadingState: (state) => state.isLoading,
    getEnrolledFailState: (state) => state.failed
  }
}
