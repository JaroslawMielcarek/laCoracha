<template>
  <div class='container full-width'>
    <h3>Calendar</h3>
    <p class='extra__message'>Administrar el calendario de partidos</p>
    <div>
      <span>Mostrar: </span>
      <CustomSelectInput v-model:value="showBy" :options="['Todo', 'Semana', 'Mes', 'Temporada']" placeholder="Eligue periodo" />
    </div>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column'>Local</p>
        <p class='column'>Visitor</p>
        <p class='column'>Fecha</p>
        <p class='column'>Ubicación</p>
        <p class='column'>Tipo</p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!matches.length">
          <p class="no-data">No hay partidos para mostrar</p>
        </div>
        <div class='list-row' v-for="match in matches" :key="match">
          <div class='action column'><button class='btn color' @click="setState(match, true)">Editar</button></div>
          <div class='column blocks'>
            <p class='title'>{{ match.homeTeam.clubName }}</p>
            <p class='team'>{{ match.homeTeam.teamName }}</p>
            <p class='gender'>{{ match.homeTeam.teamGender }}</p>
          </div>
          <div class='column blocks'>
            <p class='title'>{{ match.guestTeam.clubName }}</p>
            <p class='team'>{{ match.guestTeam.teamName }}</p>
            <p class='gender'>{{ match.guestTeam.teamGender }}</p>
          </div>
          <div class='column blocks'>
            <div class='date'>
              <p class='day'>{{ new Date(match.dateTime.date).getDate() }}</p>
              <p class='month'>{{ getMonthNameByNumber(match.dateTime.date).substring(0,3) }}</p>
              <p class='year'>{{ new Date(match.dateTime.date).getFullYear() }}</p>
            </div>
            <p class='time'>{{ match.dateTime.time }}</p>
          </div>
          <p class='column location'>{{ match.location }}</p>
          <p class='column type'>{{ match.friendly ? 'friendly' : match.league }}</p>
          <p class='action column'><button class='btn danger' @click="removeElement('Match', match)">x</button></p>
        </div>
      </div>
    </div>
    <button v-if="!value" class='btn white' @click="value = store.getters.getDefaultMatch">Agregar Partido</button>
    <AddEditMatch v-if="value" :value="value" :isEditing="isEditing" @clearForm="setState(undefined)" @submitForm="(acction,value) => submitForm(acction, value, setState(undefined))"/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import AddEditMatch from '@/components/moderator/match/AddEditMatch.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { getMonthNameByNumber } from '@/services/util/time.js'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

const isEditing = ref(false)
const value = ref(undefined)
const showBy = ref('Todo')

const store = useStore()

onMounted( () => { store.dispatch('fetchMatches')})

const matches = computed( () => {
  if (showBy.value === 'Semana') return store.getters.getMatchesOf('week')
  if (showBy.value === 'Mes') return store.getters.getMatchesOf('month')
  if (showBy.value === 'Temporada') return store.getters.getMatchesOf('season')
  return store.getters.getMatches
})

function setState(val, isEdit = false) {
  value.value = val
  isEditing.value = isEdit
}

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.list-head,
.list-row {
  // max 400px - 110 + 2fr
    grid-template-columns: 50px repeat(2, minmax(60px, 1fr)) minmax(40px, 1fr) minmax(80px, .5fr) minmax(40px, .5fr) 40px;
}
.title,
.team,
.gender,
.date, .date *,
.time {
  margin-bottom: .1em;
  font-size: inherit;
  text-align: center;
}
.team,
.gender {
  font-size: .8em;
}
.gender {
  color: rgba($blueDark, .4);
}
.date {
  .year {
    display: none;
  }
}
.team,
.gender,
.time,
.type {
  font-weight: 300;
}

@media (min-width: 600px) {
  .list-head,
  .list-row {
    // max 400px - 60 + 120 + 40 + 80 + 40 + 50
    grid-template-columns: 60px repeat(2, minmax(60px, 1fr)) minmax(40px, 1fr) minmax(80px, .5fr) minmax(40px, .5fr) 50px;
  }
  .team,
  .gender {
    font-size: 1em;
  }
  .date {
    .year {
      display: initial;
    }
  }
}
</style>
