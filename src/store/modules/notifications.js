import PublicService from '@/services/public.service.js'
import ModeratorService from '@/services/moderator.service.js'

export const notifications = {
  state: () => ({
    notifications: [],
  }),
  actions: {
    addNotification ({ commit, dispatch }, data) {
      commit('addNotification', data)
      setTimeout(() => {
        commit('removeNotification', data)
      }, 3000)
    }
  },
  mutations: {
    addNotification (state, value) {
      state.notifications.unshift(value)

      console.log('setNotificationSuccess')
    },
    removeNotification (state, value) {
      // state.notifications = state.notifications.filter(n => n !== value)
      state.notifications.pop()
    }
  },
  getters: {
    getNotifications (state) { return state.notifications },
  }
}
