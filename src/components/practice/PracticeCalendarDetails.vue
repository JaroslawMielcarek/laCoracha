<template>
  <div class='practiceDetails'>
    <span class="close" @click="handleClose" />
    <h3 class='header'><span class='small'>{{ getDate }}</span>{{ getDayOfWeek(date) }}<span class='small'>{{ time }}</span>
    </h3>
    <div class='row'>
      <h5 class="subHeader">Jugadores suscritos:</h5>
      <div :class="['player', { inQueue: isInQueue(player, this.value) }]" v-for="(player, index) in practiceDetails.players" :key="player">
        <label class='index'>{{ index + 1 }}</label>
        <span class="nick">{{ player.nick || 'Anonymous' }}:</span>
        <div class='preferedPosition__container'>
          <span class="preferedPosition" v-for="position in player.preferedPositions" :key="position">{{ position.choosen }}</span>
        </div>
      </div>
      <p class='extra__message inQueue'>Jugadores en cola</p>
    </div>
    <div class="row teams">
      <h5 class="subHeader">Equipos:</h5>
      <div class='teams__container' v-for="(team,index) of practiceDetails.teams" :key="team">
        <p>Equipo {{ index + 1 }}</p>
        <div class='position__container' v-for="position in team" :key="position">
          <label class='position'>{{ position.position }}:</label>
          <div class='players' >
            <span class='playerID' v-for="player of position.subscribed" :key="player">{{ player.nick || 'Anonymous' }}</span>
          </div>
        </div>
      </div>
    </div>
    <p v-if="error.length" class='error'>{{error}}</p>
    <button :class="['btn', 'full-width', isParticipating ? 'red' : 'color' ]" :disabled="!checkIfPracticeAvailable(practiceDetails, currentUser, isParticipating)" @click="toggleParticipation">{{ this.isParticipating ? 'Abandonar' : 'Unirse' }}</button>
  </div>
</template>

<script>
import { getDayOfWeek } from '@/services/util/time.js'
import { checkIfPracticeAvailable, isInQueue } from '@/services/util/practice.js'
import { setNotification } from '@/services/util/universal'

export default {
  emits: ['closeDetails'],
  props: {
    value: {
      type: Object,
      default () { return undefined }
    },
    isParticipating: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    getDayOfWeek,
    isInQueue,
    checkIfPracticeAvailable,
    handleClose () {
      this.$emit('closeDetails', JSON.parse(JSON.stringify({})))
    },
    toggleParticipation () {
      const practice = this.value
      const { _id, nick, practices, preferedPositions } = this.currentUser
      
      if(!preferedPositions || !preferedPositions.length) return this.error = 'Primero elige tus posiciones preferidas'

      this.$store.dispatch('subscribeForPractice', { _id: practice._id, player: { _id: _id, nick: nick.value, practices, preferedPositions } })
        .then(response => { 
          setNotification({
            name: 'subscribeForPractice response',
            text: response,
            typeOfNotification: 'success'
          })
          this.error = response 
        })
        .catch(err => { 
          setNotification({
            name: 'subscribeForPractice error',
            text: err,
            typeOfNotification: 'danger'
          })
        })
    }
  },
  watch: {
    error () {
      if (this.error) {
        const t = setTimeout(() => { this.error = ''; clearTimeout(t) }, 3000)
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.getUser
    },
    practiceDetails () {
      return this.value
    },
    date () {
      return this.practiceDetails.dateTime.date
    },
    getDate () {
      return new Date(this.date).getDate()
    },
    time () {
      return this.practiceDetails.dateTime.time
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.practiceDetails {
  background-color: $white;
  border: 1px solid rgba($blueDark, 0.4);
  border-radius: 4px;
  padding: 16px 8px 8px;
  position: relative;
  top: -6rem;
  max-width: 260px;
  margin: 0 auto;
  .header {
    margin-top: 0;
    .small {
      margin: 0 1ch;
    }
  }
}
.subHeader {
  margin: 0.4em 0;
}
.teams{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  .subHeader{
    grid-column: 1/-1;
    text-align: center;
  }
  .teams__container {
    border: 1px dashed rgba($blueDark, 0.4);
    padding: 4px;
  }
}
.position__container {
  display: flex;
}
.inQueue {
  font-weight: 300;
  color: rgba($dangerous, 0.4);
}
.player {
  display: grid;
  grid-template-columns: 1ch 1fr 20ch;
  grid-column-gap: 1ch;

  .index {
    grid-column: 1
    // margin-right: 1ch;
  }
  .nick {
    grid-column: 2;
    font-weight: 900;
  }
  .preferedPosition__container{
    grid-column: 3;
  }
}
.preferedPosition {
  font-size: 0.8em;
  font-weight: 300;
  &:first-of-type{
    margin-left: 1ch;
  }
  &::after{
    content: '->';
    display: inline-block;
    width: 2ch;
    text-align: center;
  }
  &:last-of-type::after{
    display: none;
  }
}
.position {
  font-weight: 900;
  margin-right: 1ch;
}
.players {
  display: inline-flex;
  flex-wrap: wrap;
  .playerID {
    margin-right: 1ch;
  }
}

@media (min-width: 600px) {
  .practiceDetails{
    position: absolute;
    left: 10vw;
  }
}

</style>
