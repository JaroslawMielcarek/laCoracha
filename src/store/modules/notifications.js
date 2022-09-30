
export const notifications = {
  state: () => ({
    notifications: [],
  }),
  actions: {
    addNotification ({ commit, dispatch }, data) {
      commit('addNotification', data)
      const t = setTimeout(() => {
        commit('removeNotification', data)
        clearTimeout(t)
      }, 3000)
    }
  },
  mutations: {
    addNotification (state, value) { state.notifications.unshift(value) },
    removeNotification (state) { state.notifications.pop() }
  },
  getters: {
    getNotifications (state) { return state.notifications },
  }
}
