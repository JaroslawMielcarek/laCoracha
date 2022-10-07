<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Actualizar' : 'Añadir nuevo'}} Equipo</h4>
    <ImagePrevWithRemoveVue v-if="entry.logo" :image="entry.logo" @removeLogo="entry.logo=undefined"/>
    <div v-else>
      <CustomUploadFile text="LOGO" :file="entry.logo" :sizeLimit="200000" @fileChoosed="(val) => entry.logo = val"/>
      <p class='extra__message'>max: 250x250px or 200kb </p>
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
      <button type='submit' class='btn color'>{{isEditing ? 'Actualizar' : 'Añadir'}}</button>
      <p class='btn text' @click="clearForm">Clear</p>
    </div>
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
      entry: isEmptyObject(this.value)
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultTeam))
        : JSON.parse(JSON.stringify(this.value))
    }
  },
  watch: {
    value () {
      this.entry = isEmptyObject(this.value)
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultTeam))
        : JSON.parse(JSON.stringify(this.value))
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
        alert('El equipo ya existe. Por favor, edite en su lugar')
        this.entry.name = ''
      }
    },
    togglePlayer (playerID) {
      const playerExist = this.entry.players.find(p => p === playerID)
      if (playerExist) this.entry.players = this.entry.players.filter(p => p !== playerID)
      else this.entry.players.push(playerID)
    },
    handleFileUpload ( event ) {
      this.entry.file = event.target.files[0]
    },
    clearForm () { this.$emit('clearForm') },
    submitForm () { return this.$emit('submitForm', this.isEditing ? 'updateTeam' : 'addTeam', this.entry) }
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
