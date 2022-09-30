export const settings = {
  state: () => ({
    MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    OPEN_HOUR: '09:00',
    CLOSE_HOUR: '22:00',
    MIN_PLAYER_HEIGHT: 1.20,
    MAX_PLAYER_HEIGHT: 2.50,
    MIN_PLAYER_NUMBER: 1,
    MAX_PLAYER_NUMBER: 20,
    DEFAULT_POSITIONS: ['EXT', 'OP', 'CE', 'LIB', 'CO'],
    privacy: {
      nick: {
        extraInfo: 'Se usa en quedadas y tarjeta de jugador en pagina de equipo'
      },
      position: {
        extraInfo: 'Se usa cuando eres miembro del equipo. Necesario para colocar su tarjeta en el campo.'
      },
      number: {
        extraInfo: 'Se usa si eres miembro del equipo en tarjeta de jugador'
      },
      height: {
        extraInfo: 'Se usa si eres miembro del equipo en tarjeta de jugador'
      },
      dominantHand: {
        extraInfo: 'Se usa si eres miembro del equipo en tarjeta de jugador'
      },
      inTeamPerformance: {
        extraInfo: 'Se usa si eres miembro del equipo en tarjeta de jugador'
      },
      photo: {
        extraInfo: 'Se usa si eres miembro del equipo en tarjeta de jugador'
      }
    },
    workingHours: {
      monday: {
        label: 'Lunes',
        startHour: '16:00',
        endHour: '20:00',
        timeSlot: 2
      },
      saturday: {
        label: 'Sabado',
        startHour: '09:00',
        timeSlot: 3
      },
      sunday: {
        label: 'Domingo',
        startHour: '09:00',
        timeSlot: 3
      }
    },
    registered_teams: [
      {
        name: 'la-coracha',
        teams: ['guardians', 'warriors', 'artemisias']
      },
      {
        name: 'cartama',
        teams: ['a', 'b']
      },
      {
        name: 'just-voley',
        teams: ['a', 'b']
      }
    ]
  }),
  actions: {
  },
  mutations: {
    ChangeOpenHour (newHour) {
      this.state.OPEN_HOUR = newHour
    },
    ChangeCloseHour (newHour) {
      this.state.CLOSE_HOUR = newHour
    }
  },
  getters: {
    getMonths (state) {
      return state.MONTHS
    },
    getOpenHour (state) {
      return state.OPEN_HOUR
    },
    getCloseHour (state) {
      return state.CLOSE_HOUR
    },
    getMinPlayerHeight (state) {
      return state.MIN_PLAYER_HEIGHT
    },
    getMaxPlayerHeight (state) {
      return state.MAX_PLAYER_HEIGHT
    },
    getMinPlayerNumber (state) {
      return state.MIN_PLAYER_NUMBER
    },
    getMaxPlayerNumber (state) {
      return state.MAX_PLAYER_NUMBER
    },
    getPrivacyDescriptions (state) {
      return state.privacy
    },
    getWorkingHours (state) {
      return state.workingHours
    },
    getDefaultPositions (state) {
      return state.DEFAULT_POSITIONS
    },
    getRegisterdClubs (state) {
      return state.registered_teams.map(t => t.name)
    }
  }
}
