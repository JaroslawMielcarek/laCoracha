<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Actualizar' : 'Añadir nueva' }} Quedada</h4>
    <div class='row'>
      <span>Fecha y Hora:</span>
      <CustomDateTimeInput v-model="entry.dateTime" :required="{ date: true, time: true }" @update:modelValue="checkIfExist"/>
      <span>Límite de jugadores:</span>
      <CustomSelectInput v-model:value="entry.playersLimit" :options="['6', '12', '18', '24']" placeholder="Eligue límite" :required="true"/>
    </div>
    <PracticePlayersList :playersSubscribed="entry.players" :key="playersList" @addPlayer="addPlayer($event)" @removePlayer="removePlayer($event)"/>
    <div class='row legend__container'>
      <p class='extra__message'>Leyenda</p>
      <span class='legend single'>1 strike</span>
      <span class='legend doble'>2 strike</span>
      <span class='legend triple'>3 strike</span>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{ isEditing ? 'Actualizar' : 'Añadir' }}</button>
      <p class='btn text' @click="emit('clearForm', {}) ">Clear</p>
    </div>
  </form>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch} from 'vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import { isEmptyObject } from '@/services/util/object.js'
import PracticePlayersList from '@/components/moderator/practice/PracticePlayersList.vue'

const store = useStore()
const emit = defineEmits(['clearForm', 'submitForm'])
const props = defineProps({
  value: {type: Object, default: undefined},
  isEditing: {type: Boolean, default: false}
})

const entry = ref(
  isEmptyObject(props.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultPractice))
    : JSON.parse(JSON.stringify(props.value))
)
watch(props, (newValue) => {
  entry.value = isEmptyObject(newValue.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultPractice))
    : JSON.parse(JSON.stringify(newValue.value))
})

const playersList = computed(() => store.getters.getPlayers)

function checkIfExist (value) {
  const existingPractices = store.getters.getPractices
  const result = existingPractices.find(t => t.dateTime.date === value.date && t.dateTime.time === value.time)
  if (result) {
    alert('La quedada ya existe. Por favor, edite en su lugar')
    entry.value.dateTime = { date: '', time: '' }
  }
}
function addPlayer (player) { entry.value.players.push(player) }
function removePlayer (player) { entry.value.players = entry.value.players.filter(p => p._id !== player._id) }
function submitForm () { return emit('submitForm', props.isEditing ? 'updatePractice' : 'addPractice', entry.value) }
    
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
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
