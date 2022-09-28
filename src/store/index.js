import { createStore } from 'vuex'
import { matches } from './modules/matches.js'
import { teams } from './modules/teams.js'
import { players } from './modules/players.js'
import { auth } from './modules/auth.js'
import { settings } from './modules/settings.js'
import { practices } from './modules/practices.js'
import { universal } from './modules/universal.js'
import { sponsors } from './modules/sponsors.js'
import { notifications } from './modules/notifications.js'

const store = createStore({
  modules: {
    settings,
    matches,
    teams,
    players,
    practices,
    universal,
    sponsors,
    notifications,
    auth
  },
  actions: {
    updateStates (context) {
      Promise.all(
        [
          context.dispatch('fetchMatches'),
          context.dispatch('fetchTeams'),
          context.dispatch('fetchPlayers'),
          context.dispatch('fetchPractices')
        ]
      ).then(() => Promise.resolve())
      // context.dispatch('fetchMatches')
      // context.dispatch('fetchTeams')
      // context.dispatch('fetchPlayers')
      // context.dispatch('fetchPractices')
    }
  }
})

export default store
