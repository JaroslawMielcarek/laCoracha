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

<script>
import AddEditPractice from '@/components/moderator/practice/AddEditPractice.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { isoDateToDayMonthYear, getDayOfWeek } from '@/services/util/time.js'
import { setNotification, submitForm, removeElement} from '@/services/util/universal.js'

export default {
  name: 'PracticeManager',
  components: {
    AddEditPractice,
    CustomSelectInput,
  },
  data () {
    return {
      isEditing: false,
      value: undefined,
      showBy: 'Todo',
    }
  },
  created(){
    this.$store.dispatch('fetchPractices')
  },
  computed: {
    practices () {
      if (this.showBy === 'Semana') return this.$store.getters.getPracticesOf('week')
      if (this.showBy === 'Mes') return this.$store.getters.getPracticesOf('month')
      if (this.showBy === 'Temporada') return this.$store.getters.getPracticesOf('season')
      return this.$store.getters.getPractices
    }
  },
  methods: {
    isoDateToDayMonthYear,
    getDayOfWeek,
    setNotification,
    submitForm, 
    removeElement,
    setState (value, isEditing = false) {
      this.value = value
      this.isEditing = isEditing
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.list-head,
.list-row {
  grid-template-columns: 60px repeat(3, 1fr) 60px 50px;
}
</style>
