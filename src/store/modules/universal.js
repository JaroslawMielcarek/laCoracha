
export const universal = {
  actions: {
  },
  getters: {
    // general
    getTwoWeeksAround: (state, commit, rootState) => (category) => {
      const newList = JSON.parse(JSON.stringify(rootState[category][category]))
      const currDay = new Date(new Date().setHours(0, 0, 0, 0))
      const twoWeeksBefore = new Date(currDay).setDate(currDay.getDate() - 14)
      const twoWeeksAfter = new Date(currDay).setDate(currDay.getDate() + 14)
      return newList.filter(e => twoWeeksBefore <= new Date(e.dateTime.date) && new Date(e.dateTime.date) <= twoWeeksAfter)
    }
  }

}
