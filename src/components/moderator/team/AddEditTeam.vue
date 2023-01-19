<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Actualizar' : 'Añadir nuevo' }} Equipo</h4>
    <ImagePrevWithRemoveVue v-if="entry.logo" :image="entry.logo" @removeLogo="entry.logo=undefined"/>
    <div v-else>
      <CustomUploadFile text="LOGO" :file="entry.logo" :sizeLimit="200000" @fileChoosed="(val) => entry.logo = val"/>
    </div>
    <div class='row'>
      <CustomInput v-if="!isEditing" v-model:value="entry.name" placeholder='Nombre' :required='true' @update:value="checkIfExist"/>
      <CustomInput v-model:value="entry.league" placeholder='Liga'/>
      <CustomSelectInput class='component' v-model:value="entry.gender" :options="['Female', 'Male', 'Mix']" placeholder="Eligue Género"  :required='true'/>
      <textarea class='component' v-model="entry.description" placeholder="Añadir descriptión del equipo"></textarea>

      <div class='list'>
        <template v-for="player in players" :key="player">
          <PlayerToggle :player="player" :onList="checkIfInTeam(player)" @togglePlayer="togglePlayer($event)"/>
        </template>
      </div>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{ isEditing ? 'Actualizar' : 'Añadir' }}</button>
      <p class='btn text' @click="emit('clearForm', {})">Clear</p>
    </div>
  </form>
  {{ entry }}
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch, defineEmits, defineProps } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { isEmptyObject } from '@/services/util/object.js'
import PlayerToggle from './PlayerToggle.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'

const store = useStore()
const emit = defineEmits(['clearForm', 'submitForm'])
const props = defineProps({
  value: {type: Object, default: undefined},
  isEditing: {type: Boolean, default: false}
})

const entry = ref(
  isEmptyObject(props.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultTeam))
    : JSON.parse(JSON.stringify(props.value))
)
watch(props, (newValue) => {
  entry.value = isEmptyObject(newValue.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultTeam))
    : JSON.parse(JSON.stringify(newValue.value))
})

const players = computed( () => {
  if (props.value.gender === 'Female') return store.getters.getPlayers.filter(p => p.isFemale && (!p.team || p.team === props.value.name))
  if (props.value.gender === 'Male') return store.getters.getPlayers.filter(p => !p.isFemale && (!p.team || p.team === props.value.name))
  return store.getters.getPlayers.filter(p => !p.team || p.team === props.value.name)
})

function checkIfInTeam (player) { return entry.value.players.includes(player._id) }
function checkIfExist (value) {
  const existingTeams = store.getters.getTeamsNames
  if (existingTeams.find(t => t === value)) {
    alert('El equipo ya existe. Por favor, edite en su lugar')
    entry.value.name = ''
  }
}
function togglePlayer (playerID) {
  const playerExist = entry.value.players.find(p => p === playerID)
  playerExist
    ? entry.value.players = entry.value.players.filter(p => p !== playerID)
    : entry.value.players.push(playerID)
}
function submitForm () { return emit('submitForm', props.isEditing.value ? 'updateTeam' : 'addTeam', entry.value) }

</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
textarea {
  resize: vertical;
}
</style>
