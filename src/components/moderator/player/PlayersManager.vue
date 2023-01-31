<template>
  <p class='extra-message'>Administrar jugadores del club</p>
  <Table category="jugadores">
    <template v-slot:head>
      <div class='table-row'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'memberID'">ID</p>
        <p class='column sort' @click="sortBy = 'name'">Nick</p>
        <p class='column'>No.</p>
        <p class='column'>Género</p>
        <p class='column sort' @click="sortBy = 'team'">Equipo</p>
        <p class='column'></p>
      </div>
    </template>
    <template v-slot:body>
      <div class='table-row' v-for="player in players" :key="player">
        <div class='action column'><button class='btn color' @click="setState(player, true)">Editar</button></div>
        <p class='column id'>{{ player.memberID || 'no data' }}</p>
        <p class='column name'>{{ player.nick ? player.nick.value : '' }}</p>
        <p class='column number'>{{ player.number? player.number.value : '' }}</p>
        <p class='column gender'>{{ player.isFemale ? 'Mujer' : 'Hombre' }}</p>
        <p class='column team'>{{ player.team }}</p>
        <div class='action column'><button class='btn danger' @click="removeElement('Player', player)">x</button></div>
      </div>
    </template>

  </Table>
  <AddEditData v-if="choosedValue" category="Jugador" :isEditing="isEditing" @submitForm="submit" @closeForm="setState(undefined)">
    <div class='grid-row'>
      <div>
        <h5>Lo esencial</h5>
        <div class='row'>
          <p class='team'>ID: <span class='value'>{{ choosedValue.memberID }}</span></p>
        </div>
        <div class='row'>
          <p>Nick: </p>
          <CustomInput v-model:value="choosedValue.nick.value" placeholder='Nick' />
        </div>
        <div class='row'>
          <p>Number: </p>
          <CustomInput v-model:value="choosedValue.number.value" pattern='^[0-9]*$' hint='Solo números permitidos' placeholder='Numero'/>
        </div>
        <div class='row toggle'>
          <label class='mujer label__inline'>Mujer:</label>
          <ToggleSlider  :checked="choosedValue.isFemale" @toggled="choosedValue.isFemale = !choosedValue.isFemale"/>
        </div>
        <p class='team'>Equipo: <span class='value'>{{ choosedValue.team ? choosedValue.team : "No pertenece a ninguno" }}</span></p>
      </div>
      <div>
        <PlayerPractices v-if="choosedValue.practices" v-model:value="choosedValue.practices" />
      </div>
    </div>
    <div class='grid-row'>
      <ImagePrevWithRemoveVue v-if="choosedValue.photo && choosedValue.photo.value" :image="file" @removeLogo="choosedValue.photo.value=undefined"/>
      <CustomUploadFile v-else text="Photo" :file="file" :sizeLimit="200000" @fileChoosed="(val) => choosedValue.photo.value = val"/>
    </div>
    <PlayerPerformance v-if="choosedValue.team" v-model:value="choosedValue.inTeamPerformance" />
  </AddEditData>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import AddEditData from '@/components/AddEditData.vue'
import CustomInput from '@/components/CustomInput.vue'
import PlayerPerformance from '@/components/moderator/player/PlayerPerformance.vue'
import PlayerPractices from '@/components/moderator/player/PlayerPractices.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { submitForm, removeElement } from '@/services/util/universal.js'
import Table from '@/components/table/Table.vue'

const isEditing = ref(false)
const choosedValue = ref(undefined)
const sortBy = ref('memberID')
const store = useStore()

onMounted( () => { store.dispatch('fetchPlayers')})

const file = computed( () =>  choosedValue.value.photo && choosedValue.value.photo.value ? choosedValue.value.photo.value : {} )
const players = computed( () => {
  const list = store.getters.getPlayers
  if (sortBy.value === 'memberID') return sortListOfObjectsBy(list, 'memberID', false)
  if (sortBy.value === 'team') return sortListOfObjectsBy(list, 'team', false)
  if (sortBy.value === 'name') return sortListOfObjectsBy(list, 'nick', false)
  return list
})

async function submit(){
  if (await submitForm(isEditing.value ? 'updatePlayer' : 'addPlayer', setInTeamPerformancePercents(choosedValue.value))) setState(undefined)
}
function setState(val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}
function setInTeamPerformancePercents (player) {
  // We take old player object and we update current player object
  // prevPercent with old percent
  for (const [name, prop] of Object.entries(player.inTeamPerformance)) {
    prop.prevPercent = player.inTeamPerformance[name].percent
  }
  return player
}

</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1ch;
  margin-bottom: 0.4rem;
  input {
    max-width: 16ch;
  }
}
input {
  max-width: 16ch;
}
.table-row {
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
.grid-row {
  display: grid;
  grid-template-columns: auto;
  gap: 14px;
  margin-bottom: 14px;
}
.mujer {
  margin-right: 1ch;
}
.toggle {
  display: flex;
  align-items: center;
}


@media screen and (min-width: 740px) {
  .row {
    max-width: 200px;
  }
  .grid-row {
    grid-template-columns: auto auto;
  }

}
</style>
