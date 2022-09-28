<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Edit' : 'Add new'}} Practice</h4>
    <div class='row'>
      <span>Date and Time:</span>
      <CustomDateTimeInput v-model="entry.dateTime" :required="{ date: true, time: true }" @update:modelValue="checkIfExist"/>
      <span>Players Limit:</span>
      <CustomSelectInput v-model:value="entry.playersLimit" :options="['6', '12', '18', '24']" placeholder="Players Limit"/>
    </div>
    <PracticePlayersList :playersSubscribed="entry.players" :key="playersList" @addPlayer="addPlayer($event)" @removePlayer="removePlayer($event)"/>
    <div class='row legend__container'>
      <p class='extra__message'>Legend</p>
      <span class='legend single'>1 strike</span>
      <span class='legend doble'>2 strike</span>
      <span class='legend triple'>3 strike</span>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Update' : 'Add'}}</button>
      <p class='btn text' @click="clearForm">Clear</p>
    </div>
    <p v-if="errors.length">{{errors}}</p>
  </form>
</template>

<script>
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import { isEmptyObject } from '@/services/util/object.js'
import PracticePlayersList from '@/components/moderator/practice/PracticePlayersList.vue'

export default {
  name: 'AddEditPractice',
  components: {
    CustomSelectInput,
    CustomDateTimeInput,
    PracticePlayersList
  },
  emits: ['clearForm', 'submitForm'],
  props: {
    value: {
      type: Object,
      default () { return undefined }
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      errors: [],
      entry: isEmptyObject(this.value)
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultPractice))
        : JSON.parse(JSON.stringify(this.value)) // { ...this.value }
    }
  },
  watch: {
    value () {
      if (!isEmptyObject(this.value)) {
        this.entry = {}
        this.entry = JSON.parse(JSON.stringify(this.value)) // { ...this.value }
      } else this.entry = JSON.parse(JSON.stringify(this.$store.getters.getDefaultPractice))
    }
  },
  computed: {
    practice () { return this.entry },
    playersLimit () { return this.entry.playersLimit },
    subscribedPlayers () { return this.entry.players },
    playersList () { return this.$store.getters.getPlayers }
  },
  methods: {
    isEmptyObject,
    checkIfExist (value) {
      const existingPractices = this.$store.getters.getPractices
      const result = existingPractices.find(t => t.dateTime.date === value.date && t.dateTime.time === value.time)
      if (result) {
        alert('Practice already exist. Please edit instead')
        this.entry.dateTime = { date: '', time: '' }
      }
    },
    addPlayer (player) { this.entry.players.push(player) },
    removePlayer (player) { this.entry.players = this.entry.players.filter(p => p._id !== player._id) },
    clearForm () { this.$emit('clearForm', JSON.parse(JSON.stringify({}))) },
    checkForm () {
      this.errors = []

      if (!this.entry.dateTime) this.errors.push('Practice date and time required')
      if (!this.entry.playersLimit) this.errors.push('Players Limit required')

      return !this.errors.length
    },
    submitForm () {
      if (this.checkForm()) {
        if (this.isEditing) return this.$emit('submitForm', 'updatePractice', this.entry)
        return this.$emit('submitForm', 'addPractice', this.entry)
      }
    }
  }
}
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
