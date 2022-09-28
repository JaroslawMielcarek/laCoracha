<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4 v-if="!isEditing">Add new Team</h4>
    <h4 v-else>Edit {{entry.name}} Team</h4>
    <ImagePrevWithRemoveVue v-if="entry.logo" :image="entry.logo" @removeLogo="entry.logo=undefined"/>
    <div v-else>
      <CustomUploadFile text="LOGO" :file="entry.logo" :sizeLimit="200000" @fileChoosed="(val) => entry.logo = val"/>
      <p class='extra__message'>max: 250x250px or 200kb </p>
    </div>
    <div class='row'>
      <CustomInput v-if="!isEditing" v-model:value="entry.name" placeholder='name' :required='true' @update:value="checkIfExist"/>
      <CustomInput v-model:value="entry.league" placeholder='league'/>
      <CustomSelectInput class='component' v-model:value="entry.gender" :options="['Female', 'Male', 'Mix']" placeholder="Select Gender"  :required='true'/>
      <textarea class='component' v-model="entry.description" placeholder="Add team description"></textarea>

      <div class='list'>
        <template v-for="player in players" :key="player">
          <PlayerToggle :player="player" :onList="checkIfInTeam(player)" @togglePlayer="togglePlayer($event)"/>
        </template>
      </div>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Update' : 'Add'}}</button>
      <p class='btn text' @click="clearForm">Clear</p>
    </div>
    <p v-if="errors.length">{{errors}}</p>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { isEmptyObject } from '@/services/util/object.js'
import PlayerToggle from './PlayerToggle.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'

export default {
  name: 'AddEditTeam',
  components: {
    CustomInput,
    CustomSelectInput,
    PlayerToggle,
    CustomUploadFile,
    ImagePrevWithRemoveVue
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
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultTeam))
        : JSON.parse(JSON.stringify(this.value)) // { ...this.value }
    }
  },
  watch: {
    value () {
      if (!isEmptyObject(this.value)) this.entry = JSON.parse(JSON.stringify(this.value)) // { ...this.value }
      else this.entry = JSON.parse(JSON.stringify(this.$store.getters.getDefaultTeam))
    }
  },
  computed: {
    team () { return this.entry },
    players () {
      if (this.team.gender === 'Female') return this.$store.getters.getPlayers.filter(p => p.isFemale && (!p.team || p.team === this.team.name))
      if (this.team.gender === 'Male') return this.$store.getters.getPlayers.filter(p => !p.isFemale && (!p.team || p.team === this.team.name))
      return this.$store.getters.getPlayers.filter(p => !p.team || p.team === this.team.name)
    }
  },
  methods: {
    isEmptyObject,
    checkIfInTeam (player) { return this.team.players.includes(player._id) },
    checkIfExist (value) {
      const existingTeams = this.$store.getters.getTeamsNames
      const result = existingTeams.find(t => t === value)
      if (result) {
        alert('Team already exist. Please edit insted')
        this.entry.name = ''
      }
    },
    togglePlayer (playerID) {
      console.log('entry', this.entry.players)
      const playerExist = this.entry.players.find(p => p === playerID)
      if (playerExist) this.entry.players = this.entry.players.filter(p => p !== playerID)
      else this.entry.players.push(playerID)
    },
    handleFileUpload ( event ) {
      this.entry.file = event.target.files[0]
    },
    clearForm () { this.$emit('clearForm') },
    checkForm () {
      this.errors = []

      if (!this.entry.name) this.errors.push('Team name required')

      return !this.errors.length
    },
    submitForm () {
      if (this.checkForm()) {
        if (this.isEditing) return this.$emit('submitForm', 'updateTeam', this.entry)
        return this.$emit('submitForm', 'addTeam', this.entry)
      }
    }
  }
}
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
