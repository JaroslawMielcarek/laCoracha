<template>
  <div class='container full-width'>
    <h3>Equipos</h3>
    <p class='extra__message'>Administrar equipos de club</p>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'name'">Nombre</p>
        <p class='column sort' @click="sortBy = 'league'">Liga</p>
        <p class='column sort' @click="sortBy = 'gender'">Género</p>
        <p class='column'>Logo</p>
        <p class='column'>Jugadores</p>
        <p class='column'></p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!teams.length">
          <p class="no-data">No hay equipos para mostrar</p>
        </div>
        <div class='list-row' v-for="team in teams" :key="team">
          <p class='column'><button class='btn color' @click="setState(team, true)">Editar</button></p>
          <p class='column'>{{ team.name }}</p>
          <p class='column'>{{ team.league }}</p>
          <p class='column'>{{ team.gender }}</p>
          <p class='column'>{{ team.logo? 'Sí' : 'No' }}</p>
          <p :class="['column',{overLimit: team.players.length > maxPlayers}]"><b>{{ team.players.length }}</b>/{{ maxPlayers }}</p>
          <p class='column'><button class='btn danger' @click="removeElement('Team', team)">x</button></p>
        </div>
      </div>
    </div>
    <button v-if="!choosedValue" class='btn white' @click="choosedValue = store.getters.getDefaultTeam">Agregar Equipo</button>
    <AddEditData v-else category="Equipo" :isEditing="isEditing" @submitForm="submitForm( isEditing ? 'updateTeam' : 'addTeam', choosedValue, setState(undefined))" @closeForm="setState(undefined)">
      <ImagePrevWithRemoveVue v-if="choosedValue.logo" :image="choosedValue.logo" @removeLogo="choosedValue.logo=undefined"/>
      <div v-else>
        <CustomUploadFile text="LOGO" :file="choosedValue.logo" :sizeLimit="200000" @fileChoosed="(val) => choosedValue.logo = val"/>
      </div>
      <div class='row'>
        <CustomInput v-if="!isEditing" v-model:value="choosedValue.name" placeholder='Nombre' :required='true' @update:value="checkIfExist"/>
        <CustomInput v-model:value="choosedValue.league" placeholder='Liga'/>
        <CustomSelectInput class='component' v-model:value="choosedValue.gender" :options="['Female', 'Male', 'Mix']" placeholder="Eligue Género"  :required='true'/>
        <textarea class='component' v-model="choosedValue.description" placeholder="Añadir descriptión del equipo"></textarea>

        <div class='list-players'>
          <template v-for="player in players" :key="player">
            <PlayerToggle :player="player" :onList="checkIfInTeam(player)" @togglePlayer="togglePlayer($event)"/>
          </template>
        </div>
      </div>
    </AddEditData>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import AddEditData from '../AddEditData.vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import PlayerToggle from './PlayerToggle.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

const store = useStore()

const isEditing = ref(false)
const choosedValue = ref(undefined)
const sortBy = ref('name')

const teams = computed( () => {
  const list = store.getters.getTeams
  if (sortBy === 'name') return sortListOfObjectsBy(list, 'name', false)
  if (sortBy === 'league') return sortListOfObjectsBy(list, 'league', false)
  if (sortBy === 'gender') return sortListOfObjectsBy(list, 'gender', false)
  return list
})
const maxPlayers = computed( () => store.getters.getMaxPlayersInTeam )
const players = computed( () => {
  if (choosedValue.value.gender === 'Female') return store.getters.getPlayers.filter(p => p.isFemale && (!p.team || p.team === choosedValue.value.name))
  if (choosedValue.value.gender === 'Male') return store.getters.getPlayers.filter(p => !p.isFemale && (!p.team || p.team === choosedValue.value.name))
  return store.getters.getPlayers.filter(p => !p.team || p.team === choosedValue.value.name)
})

function setState (val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}
function checkIfInTeam (player) { return choosedValue.value.players.includes(player._id) }
function checkIfExist (value) {
  const existingTeams = store.getters.getTeamsNames
  if (existingTeams.find(t => t === value)) {
    alert('El equipo ya existe. Por favor, edite en su lugar')
    choosedValue.value.name = ''
  }
}
function togglePlayer (playerID) {
  const playerExist = choosedValue.value.players.find(p => p === playerID)
  playerExist
    ? choosedValue.value.players = choosedValue.value.players.filter(p => p !== playerID)
    : choosedValue.value.players.push(playerID)
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.list-head,
.list-row {
  grid-template-columns: 60px repeat(3, 1fr) 60px 40px 50px;
}
.list-players {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
textarea {
  resize: vertical;
}
</style>
