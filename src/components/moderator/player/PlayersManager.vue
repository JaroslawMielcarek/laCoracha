<template>
  <div class='container full-width'>
    <h3>Jugadores</h3>
    <p class='extra__message'>Administrar jugadores del club</p>
    <div class='grid'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'memberID'">ID</p>
        <p class='column sort' @click="sortBy = 'name'">Nick</p>
        <p class='column'>No.</p>
        <p class='column'>Género</p>
        <p class='column sort' @click="sortBy = 'team'">Equipo</p>
        <p class='column'></p>
      </div>
      <div class='list large'>
        <div class='list-row' v-if="!players.length">
          <p class="no-data">No hay jugadores para mostrar</p>
        </div>
        <div class='list-row' v-for="player in players" :key="player">
          <div class='action column'><button class='btn color' @click="setState(player, true)">Editar</button></div>
          <p class='column id'>{{ player.memberID || 'no data' }}</p>
          <p class='column name'>{{ player.nick ? player.nick.value : '' }}</p>
          <p class='column number'>{{ player.number? player.number.value : '' }}</p>
          <p class='column gender'>{{ player.isFemale ? 'Mujer' : 'Hombre' }}</p>
          <p class='column team'>{{ player.team }}</p>
          <div class='action column'><button class='btn danger' @click="removeElement('Player', player)">x</button></div>
        </div>
      </div>
    </div>
    <AddEditPlayer v-if="value" :value="value" :isEditing="isEditing" @clearForm="setState(undefined)" @submitForm="(acction, value) => submitForm(acction, value, setState(undefined))"/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import AddEditPlayer from '@/components/moderator/player/AddEditPlayer.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

const isEditing = ref(false)
const value = ref(undefined)
const sortBy = ref('memberID')
const store = useStore()

onMounted( () => { store.dispatch('fetchPlayers')})

const players = computed( () => {
  const list = store.getters.getPlayers
  if (sortBy.value === 'memberID') return sortListOfObjectsBy(list, 'memberID', false)
  if (sortBy.value === 'team') return sortListOfObjectsBy(list, 'team', false)
  if (sortBy.value === 'name') return sortListOfObjectsBy(list, 'nick', false)
  return list
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
  // max 375px 220 = 150 / 2 = 75
  grid-template-columns: 60px 30px minmax(60px, 1fr) 30px 60px minmax(80px, 1fr) 50px;

  .id,
  .name,
  .number,
  .gender,
  .team {
    margin-bottom: .1em;
  }
  .number,
  .gender{
    font-weight: 300;
  }
}
</style>
