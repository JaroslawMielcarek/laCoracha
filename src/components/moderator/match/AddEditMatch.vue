<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4 class='header'>{{ isEditing ? 'Edit' : 'Add new'}} Match</h4>
    <div>
      <div class='team'>
        <h5>Local</h5>
        <CustomInput v-model:value="entry.homeTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="entry.homeTeam.teamName" placeholder='Team'/>
        <CustomSelectInput v-model:value="entry.homeTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Gender" />
        <CustomSelectInput v-model:value="entry.homeTeam.wonSets" :options="['0','1','2','3']" placeholder='Won Sets' />
      </div>
      <div class='team'>
        <h5>Visitor</h5>
        <CustomInput v-model:value="entry.guestTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="entry.guestTeam.teamName" placeholder='Team'/>
        <CustomSelectInput v-model:value="entry.guestTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Gender" />
        <CustomSelectInput v-model:value="entry.guestTeam.wonSets" :options="['0','1','2','3']" placeholder='Won Sets' />
      </div>
    </div>
    <div class='details'>
      <CustomDateTimeInput v-model="entry.dateTime" :required="{ date: true, time: true }"/>
      <CustomInput v-model:value="entry.location" placeholder='Location' :required='true'/>
      <CustomInput v-model:value="entry.league" placeholder='League'/>
      <label for='Friendly'><input v-model="entry.friendly" type='checkbox' id='Friendly'/>Friendly</label>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Update' : 'Add'}}</button>
      <p class='btn text' @click="this.$emit('clearForm')">Clear</p>
    </div>
  </form>
</template>

<script>
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import CustomInput from '@/components/CustomInput.vue'
import { isEmptyObject } from '@/services/util/object.js'

export default {
  name: 'AddMatch',
  components: {
    CustomSelectInput,
    CustomDateTimeInput,
    CustomInput
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
      entry: isEmptyObject(this.value)
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultMatch))
        : JSON.parse(JSON.stringify(this.value))
    }
  },
  watch: {
    value () {
      this.entry = isEmptyObject(this.value)
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultMatch))
        : JSON.parse(JSON.stringify(this.value))
    }
  },
  methods: {
    isEmptyObject,
    submitForm () { return this.$emit('submitForm', this.isEditing ? 'updateMatch' : 'addMatch', this.entry) }
  }
}
</script>
<style lang="scss" scoped>
.team {
  display: inline-block;
  width: min-content;
  vertical-align: middle;
  text-align: center;
  margin-right: 10px;
  &:last-of-type{
    margin-right: 0;
  }
  input, select {
    margin-bottom: .5rem;
  }
}
.details {
  margin: 20px auto;
}
</style>
