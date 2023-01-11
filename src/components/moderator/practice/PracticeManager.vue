<template>
  <div class='container full-width'>
    <h3>Quedadas</h3>
    <p class='extra__message'>Administrar el calendario de quedadas</p>
    <div>
      <span>Mostrar: </span>
      <CustomSelectInput v-model:value="showBy" :options="['Todo', 'Semana', 'Mes', 'Temporada']" placeholder="Eligue periodo" />
    </div>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column'>Día de la semana</p>
        <p class='column'>Fecha</p>
        <p class='column'>Hora</p>
        <p class='column'>Jugadores</p>
        <p class='column'></p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!practices.length">
          <p class="no-data">No hay quedadas para mostrar</p>
        </div>
        <div class='list-row' v-for="practice in practices" :key="practice">
          <p class='column'><button class='btn color' @click="setState(practice, true, true)">Editar</button></p>
          <p class='column'>{{getDayOfWeek(practice.dateTime.date)}}</p>
          <p class='column'>{{isoDateToDayMonthYear(practice.dateTime.date)}}</p>
          <p class='column'>{{practice.dateTime.time}}</p>
          <p :class="['column',{overLimit: practice.playersSubscribed > practice.playersLimit}]"><b>{{practice.playersSubscribed}}</b>/{{practice.playersLimit}}</p>
          <p class='column'><button class='btn danger' @click="removeElement('Practice', practice)">x</button></p>
        </div>
      </div>
    </div>
    <button v-if="!value" class='btn white' @click="value = this.$store.getters.getDefaultPractice">Agregar Quedada</button>
    <AddEditPractice v-else :value="value" :isEditing="isEditing" @submitForm="(acction, value) => submitForm(acction, value, setState(undefined))" @clearForm="setState(undefined)"/>
  </div>
</template>

<script setup>
import AddEditPractice from '@/components/moderator/practice/AddEditPractice.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { isoDateToDayMonthYear, getDayOfWeek } from '@/services/util/time.js'
import { setNotification, submitForm, removeElement} from '@/services/util/universal.js'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const isEditing = ref(false)
const value = ref(undefined)
const showBy = ref('Todo')

const store = useStore()

onMounted( () => { store.dispatch('fetchPractices') })

const practices = computed( () => {
  if (showBy.value === 'Semana') return store.getters.getPracticesOf('week')
  if (showBy.value === 'Mes') return store.getters.getPracticesOf('month')
  if (showBy.value === 'Temporada') return store.getters.getPracticesOf('season')
  return store.getters.getPractices
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
  grid-template-columns: 60px repeat(3, 1fr) 60px 50px;
}
</style>
