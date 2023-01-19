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
    <AddEditData v-if="choosedValue" category="Jugador" :isEditing="isEditing" @submitForm="submitForm( isEditing ? 'updatePlayer' : 'addPlayer', setInTeamPerformancePercents(choosedValue.value), setState(undefined))" @closeForm="setState(undefined)">
      <div class='row grid-row'>
        <div class='column'>
          <h5>Lo esencial</h5>
          <div class='row'>
            <CustomInput v-model:value="choosedValue.memberID" placeholder='ID' :required='true' @update:value="checkIfExist"/>
            <CustomInput v-model:value="choosedValue.nick.value" placeholder='Nick' />
            <CustomInput v-model:value="choosedValue.number.value" pattern='^[0-9]*$' hint='Solo números permitidos' placeholder='Numero'/>
          </div>
          <div class='row toggle'>
            <label class='mujer label__inline'>Mujer:</label>
            <ToggleSlider  :checked="choosedValue.isFemale" @toggled="choosedValue.isFemale = !choosedValue.isFemale"/>
          </div>
          <p class='team'>Equipo: <span class='value'>{{ choosedValue.team ? choosedValue.team : "No pertenece a ninguno" }}</span></p>
        </div>
        <div class='column'>
          <PlayerPractices v-if="choosedValue.practices" v-model:value="choosedValue.practices" />
        </div>
      </div>
      <ImagePrevWithRemoveVue v-if="choosedValue.photo && choosedValue.photo.value" :image="file" @removeLogo="choosedValue.photo.value=undefined"/>
      <CustomUploadFile v-else text="Photo" :file="file" :sizeLimit="200000" @fileChoosed="(val) => choosedValue.photo.value = val"/>

      <PlayerPerformance v-if="choosedValue.team" v-model:value="choosedValue.inTeamPerformance" />
    </AddEditData>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import AddEditData from '../../AddEditData.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import PlayerPerformance from '@/components/moderator/player/PlayerPerformance.vue'
import PlayerPractices from '@/components/moderator/player/PlayerPractices.vue'
import CustomInput from '@/components/CustomInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

const isEditing = ref(false)
const choosedValue = ref(undefined)
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
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}

const file = computed( () =>  choosedValue.value.photo && choosedValue.value.photo.value ? choosedValue.value.photo.value : {} )

function setInTeamPerformancePercents (player) {
  // We take old player object and we update current player object
  // prevPercent with old percent
  for (const [name, prop] of Object.entries(player.inTeamPerformance)) {
    choosedValue.value.prevPercent = choosedValue.value.inTeamPerformance[name].percent
  }
  return player
}
function checkIfExist (value) {
  const existingValues = store.getters.getPlayersIDs
  const result = existingValues.find(t => t.toString().toLowerCase() === value.toString().toLowerCase())
  if (result) {
    alert('El ID ya existe. Por favor, edite en su lugar')
    choosedValue.value.id = ''
  }
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
.team {
  .value {
    color: $blueDark;
  }
}
.column {
  display: inline-block;
  margin-right: 20px;
  &:last-of-type{
    margin-right: 0;
  }
}
.grid-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.mujer {
  margin-right: 1ch;
}
.toggle {
  display: flex;
  align-items: center;
}
</style>