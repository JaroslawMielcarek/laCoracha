<template>
  <div class='strikes' v-if="checkStrikes">
    <p>Tienes <b>{{ checkStrikes.qty }}</b>/3 strikes!</p>
    <p v-if="checkStrikes.lastStrike">Último strike obtenido en: <b>{{ isoDateToDayMonthYear(checkStrikes.lastStrike) }}</b></p>
  </div>
  <div class='practice-history'>
    <div v-if="currentUser.preferedPositions.length">
      <p class='extra-message'>Su preferencia de posición GUARDADA:</p>
      <span class='prefPosition' v-for="position in currentUser.preferedPositions" :key="position">{{ position.choosen }}</span>
    </div>
    <div v-else>
      <p class='extra-message'>Su preferencia de posición <b>no esta elegida</b>. Por favor eligue algunas <router-link to='/settings'>aqui</router-link></p>
    </div>
    <div class='practice-stats' v-if="currentUser.practices && currentUser.practices.attended">
      <p class='extra-message'>Estadísticas:</p>
      <p class='practice-total'> Asististe: 
        <span class='value'>{{ currentUser.practices.attended }}</span></p>
      <div class='practice-positions' v-for="(value, position) in currentUser.practices.positionsPlayed" :key="position">
        <p class='value'>{{ value }}</p>
        <p>{{ position }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { isoDateToDayMonthYear } from '@/services/util/time.js'

const store = useStore()
const currentUser = store.getters.getUser

onMounted( () => store.dispatch('fetchPractices'))

const checkStrikes = computed( () => {
  return (!currentUser || !currentUser.practices)
    ? false
    : currentUser.practices.strikes
})

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.strikes,
.practice-history {
  border: 1px dashed $blueDark;
  border-radius: 4px;
  padding: 14px;
  background-color: $white;
}
.strikes {
  b {
    color: red;
  }
}
.practice-history{
  margin-top: 14px;
}

.prefPosition {
  &::after {
    content: '>>';
    margin: 0 1ch;
  }
  &:last-of-type::after {
    display: none;
  }
}
.practice-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 1ch;
  margin-top: 14px;
}
.extra-message,
.practice-total{
  flex: 0 0 100%;
}
.extra-message {
  margin: 0;
}
.practice-total {
  margin: 4px 0;
}
.value {
  font-weight: 200;
}
.practice-positions {
  text-align: center;
  min-width: 5ch;

}

</style>
