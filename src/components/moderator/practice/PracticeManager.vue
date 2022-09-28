<template>
  <div class='container full-width'>
    <h3>Quedadas</h3>
    <p class='extra__message'>Manage practice calendar</p>
    <div>
      <span>Show: </span>
      <CustomSelectInput v-model:value="showBy" :options="['all', 'week', 'month', 'season']" placeholder="time frame" />
    </div>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column'>Day of Week</p>
        <p class='column'>Date</p>
        <p class='column'>Time</p>
        <p class='column'>Players</p>
        <p class='column'></p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!practices.length">
          <p class="no-data">No practice to display</p>
        </div>
        <div class='list-row' v-for="practice in practices" :key="practice">
          <p class='column'><button class='btn color' @click="setState(practice, true, true)">Edit</button></p>
          <p class='column'>{{getDayOfWeek(practice.dateTime.date)}}</p>
          <p class='column'>{{isoDateToDayMonthYear(practice.dateTime.date)}}</p>
          <p class='column'>{{practice.dateTime.time}}</p>
          <p class='column'><b>{{practice.playersSubscribed}}</b>/{{practice.playersLimit}}</p>
          <p class='column'><button class='btn danger' @click="removeElement('Practice', practice)">x</button></p>
        </div>
      </div>
    </div>
    <button v-if="!visible" class='btn white' @click="visible = !visible">Add Practice</button>
    <AddEditPractice v-else :value="value" :isEditing="isEditing" @submitForm="(acction, value) => submitForm(acction, value, setState({}))" @clearForm="setState"/>
  </div>
</template>

<script>
import AddEditPractice from '@/components/moderator/practice/AddEditPractice.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { isoDateToDayMonthYear, getDayOfWeek } from '@/services/util/time.js'
import { setNotification, submitForm, removeElement} from '@/services/util/universal.js'
import store from '@/store/index'

export default {
  name: 'PracticeManager',
  components: {
    AddEditPractice,
    CustomSelectInput,
  },
  data () {
    return {
      visible: false,
      isEditing: false,
      value: {},
      showBy: 'all',
    }
  },
  created(){
    this.$store.dispatch('fetchPractices')
  },
  computed: {
    practices () {
      if (this.showBy === 'week') return store.getters.getPracticesOf('week')
      if (this.showBy === 'month') return store.getters.getPracticesOf('month')
      if (this.showBy === 'season') return store.getters.getPracticesOf('season')
      return store.getters.getPractices
    }
  },
  methods: {
    isoDateToDayMonthYear,
    getDayOfWeek,
    setNotification,
    submitForm, 
    removeElement,
    setState (value, visible = false, isEditing = false) {
      this.visible = visible
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
