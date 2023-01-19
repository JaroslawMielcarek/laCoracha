<template>
  <div class='practiceDetails'>
    <span class="close" @click="handleClose" />
    <h3 class='header'><span class='small'>{{ getDayOfMonth }}</span>{{ getDayOfWeek(date) }}<span class='small'>{{ time }}</span>
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
    <p v-if="error.length" class='error'>{{ error }}</p>
    <button :class="['btn', 'full-width', isParticipating ? 'red' : 'color' ]" :disabled="!checkIfPracticeAvailable(practiceDetails, currentUser, isParticipating)" @click="toggleParticipation">{{ isParticipating ? 'Abandonar' : 'Unirse' }}</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch, computed } from 'vue'
import { getDayOfWeek } from '@/services/util/time.js'
import { checkIfPracticeAvailable, isInQueue } from '@/services/util/practice.js'
import { setNotification } from '@/services/util/universal'

const store = useStore()
const emit = defineEmits(['closeDetails'])
const props = defineProps({ value: {type: Object, default: undefined}, isParticipating: {type: Boolean, default: false} })
const currentUser = store.getters.getUser

const error = ref('')

const practiceDetails = computed( () => props.value )
const date = computed( () => practiceDetails.value.dateTime.date )
const getDayOfMonth = computed( () => new Date(date.value).getDate() )
const time = computed( () => practiceDetails.value.dateTime.time )

function handleClose () { emit('closeDetails', {}) }
function toggleParticipation () {
  const practice = props.value
  const { _id, nick, practices, preferedPositions } = currentUser
  
  if (!preferedPositions || !preferedPositions.length) return error.value = 'Primero elige tus posiciones preferidas'

  store.dispatch('subscribeForPractice', { _id: practice._id, player: { _id: _id, nick: nick.value, practices, preferedPositions } })
    .then(response => { 
      setNotification({
        name: 'subscribeForPractice response',
        text: response,
        typeOfNotification: 'success'
      })
      error.value = response 
    })
    .catch(err => { 
      setNotification({
        name: 'subscribeForPractice error',
        text: err,
        typeOfNotification: 'danger'
      })
    })
}

watch(error, (newValue) => { const t = setTimeout(() => { error.value = ''; clearTimeout(t) }, 3000) })

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
