<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Actualizar' : 'Añadir nuevo'}} Jugador</h4>
    <div class='row grid-row'>
      <div class='column'>
        <h5>Lo esencial</h5>
        <div class='row'>
          <CustomInput v-model:value="entry.memberID" placeholder='ID' :required='true' @update:value="checkIfExist"/>
          <CustomInput v-model:value="entry.nick.value" placeholder='Nick' />
          <CustomInput v-model:value="entry.number.value" pattern='^[0-9]*$' hint='Solo números permitidos' placeholder='Numero'/>
        </div>
        <div class='row toggle'>
          <label class='mujer label__inline'>Mujer:</label>
          <ToggleSlider  :checked="entry.isFemale" @toggled="entry.isFemale = !entry.isFemale"/>
        </div>
        <p class='team'>Equipo: <span class='value'>{{ entry.team ? entry.team : "No pertenece a ninguno"}}</span></p>
      </div>
      <div class='column'>
        <PlayerPractices v-if="entry.practices" v-model:value="entry.practices" />
      </div>
    </div>
    <ImagePrevWithRemoveVue v-if="entry.photo && entry.photo.value" :image="file" @removeLogo="entry.photo.value=undefined"/>
    <CustomUploadFile v-else text="Photo" :file="file" :sizeLimit="200000" @fileChoosed="(val) => entry.photo.value = val"/>

    <PlayerPerformance v-if="entry.team" v-model:value="entry.inTeamPerformance" />
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{ isEditing ? 'Actualizar' : 'Añadir' }}</button>
      <p class='btn text' @click="emit('clearForm')">Clear</p>
    </div>
  </form>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch, computed, defineEmits, defineProps } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import PlayerPerformance from '@/components/moderator/player/PlayerPerformance.vue'
import PlayerPractices from '@/components/moderator/player/PlayerPractices.vue'
import { isEmptyObject } from '@/services/util/object.js'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'

const store = useStore()
const emit = defineEmits(['clearForm', 'submitForm'])
const props = defineProps({ value: {type: Object, default: undefined}, isEditing: {type: Boolean, default: false} })

const entry = ref(
  isEmptyObject(props.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultPlayer))
    : JSON.parse(JSON.stringify(props.value))
)
watch(props, (newValue) => {
  entry.value = isEmptyObject(newValue.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultTeam))
    : JSON.parse(JSON.stringify(newValue.value))
})

const file = computed( () =>  entry.value.photo && entry.value.photo.value ? entry.value.photo.value : {} )

function setInTeamPerformancePercents (player) {
  // We take old player object and we update current player object
  // prevPercent with old percent
  for (const [name, prop] of Object.entries(player.inTeamPerformance)) {
    prop.prevPercent = props.value.inTeamPerformance[name].percent
  }
  return player
}
function checkIfExist (value) {
  const existingValues = store.getters.getPlayersIDs
  const result = existingValues.find(t => t.toString().toLowerCase() === value.toString().toLowerCase())
  if (result) {
    alert('El ID ya existe. Por favor, edite en su lugar')
    entry.value.id = ''
  }
}
function submitForm () { return emit('submitForm', props.isEditing ? 'updatePlayer' : 'addPlayer', setInTeamPerformancePercents(entry.value)) }

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
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
