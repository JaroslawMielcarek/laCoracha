<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4>{{ isEditing ? 'Edit' : 'Add new'}} Player</h4>
    <div class='row grid-row'>
      <div class='column'>
        <h5>Basics</h5>
        <CustomInput v-model:value="entry.memberID" placeholder='ID' :required='true' @update:value="checkIfExist"/>
        <CustomInput v-model:value="entry.nick.value" placeholder='Name' />
        <CustomInput v-model:value="entry.number.value" pattern='^[0-9]*$' hint='Only numbers allowed' placeholder='Number'/>
        <p class='mujer'>Mujer: <input v-model="entry.isFemale" type='checkbox' id='mujer'/></p>
        <p class='team'>Team: <span class='value'>{{ entry.team ? entry.team : "Doesn't belong to any"}}</span></p>
      </div>
      <div class='column'>
        <PlayerPractices v-if="entry.practices" v-model:value="entry.practices" />
      </div>
    </div>

    <ImagePrevWithRemoveVue v-if="entry.photo && entry.photo.value" :image="file" @removeLogo="entry.photo.value=undefined"/>
    <div v-else>
      <CustomUploadFile text="Photo" :file="file" :sizeLimit="200000" @fileChoosed="(val) => entry.photo.value = val"/>
      <p class='extra__message'>max: 250x250px or 200kb </p>
    </div>

    <PlayerPerformance v-if="entry.team" v-model:value="entry.inTeamPerformance" />
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Update' : 'Add'}}</button>
      <p class='btn text' @click="this.$emit('clearForm')">Clear</p>
    </div>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import PlayerPerformance from '@/components/moderator/player/PlayerPerformance.vue'
import PlayerPractices from '@/components/moderator/player/PlayerPractices.vue'
import { isEmptyObject } from '@/services/util/object.js'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'

export default {
  name: 'AddEditPlayer',
  components: {
    CustomInput,
    PlayerPerformance,
    PlayerPractices,
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
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultPlayer))
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
    player () { return this.entry },
    file () { return this.entry.photo ? this.entry.photo.value : {} }
  },
  methods: {
    isEmptyObject,
    setInTeamPerformancePercents (player) {
      // We take old player object and we update current player object
      // prevPercent with old percent
      for (const [name, prop] of Object.entries(player.inTeamPerformance)) {
        prop.prevPercent = this.value.inTeamPerformance[name].percent
      }
      return player
    },
    checkIfExist (value) {
      const existingValues = this.$store.getters.getPlayersIDs
      const result = existingValues.find(t => t.toString().toLowerCase() === value.toString().toLowerCase())
      if (result) {
        alert('ID already exist. Please edit insted')
        this.entry.id = ''
      }
    },
    submitForm () { return this.$emit('submitForm', this.isEditing ? 'updatePlayer' : 'addPlayer', this.setInTeamPerformancePercents(this.entry)) }
  }
}
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
</style>
