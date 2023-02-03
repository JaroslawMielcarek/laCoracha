<template>
  <button class='btn white' @click="choosedValue = store.getters.getDefaultPractice">Agregar Quedada</button>
  <Table category="quedadas" v-model:showBy="showBy" :filterOptions="['Todo', 'Semana', 'Mes', 'Temporada']">
    <template v-slot:head>
      <div class='table-row'>
        <p class='column'></p>
        <p class='column'>Día de la semana</p>
        <p class='column'>Fecha</p>
        <p class='column'>Hora</p>
        <p class='column'>Jugadores</p>
        <p class='column'></p>
      </div>
    </template>
    <template v-slot:body>
      <div class='table-row' v-for="practice in practices" :key="practice">
        <p class='column'><button class='btn color' @click="setState(practice, true, true)">Editar</button></p>
        <p class='column'>{{ getDayOfWeek(practice.dateTime.date) }}</p>
        <p class='column'>{{ isoDateToDayMonthYear(practice.dateTime.date) }}</p>
        <p class='column'>{{ practice.dateTime.time }}</p>
        <p :class="['column',{ overLimit: practice.playersSubscribed > practice.playersLimit }]"><b>{{ practice.playersSubscribed }}</b>/{{ practice.playersLimit }}</p>
        <p class='column'><button class='btn danger' @click="removeElement('Practice', practice)">x</button></p>
      </div>
    </template>
  </Table>
  <AddEditData v-if="choosedValue" category="Quedada" :isEditing="isEditing" @submitForm="submitForm( isEditing ? 'updatePractice' : 'addPractice', choosedValue, setState(undefined))" @closeForm="setState(undefined)">
    <div class='row'>
      <span>Fecha y Hora:</span>
      <CustomDateTimeInput v-model="choosedValue.dateTime" :required="{ date: true, time: true }" @update:modelValue="checkIfExist"/>
    </div>
    <div class='row'> 
      <span>Límite de jugadores:</span>
      <CustomSelectInput class='short' v-model:value="choosedValue.playersLimit" :options="['6', '12', '18', '24']" placeholder="Eligue límite" :required="true"/>
    </div>
    <PracticePlayersList :playersSubscribed="choosedValue.players" :key="playersList" @addPlayer="addPlayer($event)" @removePlayer="removePlayer($event)"/>
    <div class='row legend__container'>
      <p class='extra__message'>Leyenda</p>
      <span class='legend single'>1 strike</span>
      <span class='legend doble'>2 strike</span>
      <span class='legend triple'>3 strike</span>
    </div>
  </AddEditData>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import AddEditData from '@/components/AddEditData.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import PracticePlayersList from '@/components/moderator/practice/PracticePlayersList.vue'
import { isoDateToDayMonthYear, getDayOfWeek } from '@/services/util/time.js'
import { submitForm, removeElement} from '@/services/util/universal.js'
import Table from '@/components/table/Table.vue'

onMounted( () => { store.dispatch('fetchPractices') })

const store = useStore()

const isEditing = ref(false)
const choosedValue = ref(undefined)
const showBy = ref('Todo')

const playersList = computed(() => store.getters.getPlayers)
const practices = computed( () => {
  if (showBy.value === 'Semana') return store.getters.getPracticesOf('week')
  if (showBy.value === 'Mes') return store.getters.getPracticesOf('month')
  if (showBy.value === 'Temporada') return store.getters.getPracticesOf('season')
  return store.getters.getPractices
})

function setState(val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}
function checkIfExist (value) {
  const existingPractices = store.getters.getPractices
  const result = existingPractices ? existingPractices.find(t => t.dateTime.date === value.date && t.dateTime.time === value.time) : undefined
  if (result) {
    alert('La quedada ya existe. Por favor, edite en su lugar')
    choosedValue.value.dateTime = { date: '', time: '' }
  }
}
function addPlayer (player) { choosedValue.value.players.push(player) }
function removePlayer (player) { choosedValue.value.players = choosedValue.value.players.filter(p => p._id !== player._id) }

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.short {
  max-width: 6ch;
}
.table-row {
  grid-template-columns: 60px repeat(3, 1fr) 60px 50px;
}
.legend__container {
  // display: flex;
  padding: 1rem 0;
}
.legend {
  display: inline-block;
  background-color: $white;
  box-shadow: 0 0 2px rgba($blueDark, .4);
  border-radius: 4px;
  margin-right: 2ch;
  padding: 4px 8px;
  font-size: .8rem;
  line-height: 1rem;
  &.single,
  &.doble,
  &.triple {
    border-right: 1px solid $dangerous;
  }
  &.doble,
  &.triple {
    border-bottom: 1px solid $dangerous;
  }
  &.triple {
    border-left: 1px solid $dangerous;
  }
}
</style>