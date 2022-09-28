<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4 v-if="!isEditing">Add new Sponsor</h4>
    <h4 v-else>Edit {{entry.name}} Sponsor</h4>
    <div class='row' v-if="!isEditing">
      <label>Name:</label>
      <CustomInput v-model:value="entry.name" placeholder='Nombre de sponsor' :required='true' @update:value="checkIfExist"/>
    </div>
    <div class='row'>
      <label>Website link:</label>
      <CustomInput v-model:value="entry.link" placeholder='link.com'/>
    </div>
    <div class='row'>
      <label>Contributed: </label>
      <CustomNumberInput :min="0" :max="2000" :step="10" v-model:value="entry.contribution"/>
    </div>
    <div class='row isMain'>
      <label>Is main:</label>
      <ToggleSlider :checked="entry.isMain"  @toggled="() => entry.isMain = !entry.isMain"/>
    </div>
    <div class='row'>
      <ImagePrevWithRemoveVue v-if="entry.logo" :image="entry.logo" @removeLogo="entry.logo=undefined"/>
      <div v-else>
        <CustomUploadFile text="LOGO" :file="entry.logo" :sizeLimit="200000" @fileChoosed="(val) => entry.logo = val"/>
        <p class='extra__message'>max: 250x250px or 200kb </p>
      </div>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Update' : 'Add'}}</button>
      <p class='btn text' @click="clearForm">Clear</p>
    </div>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { isEmptyObject } from '@/services/util/object.js'


export default {
  components: {
    CustomInput,
    CustomNumberInput,
    ImagePrevWithRemoveVue,
    CustomUploadFile,
    ToggleSlider
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
        ? JSON.parse(JSON.stringify(this.$store.getters.getDefaultSponsor))
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
    sponsor () { return this.entry },
  },
  methods: {
    isEmptyObject,
    // checkIfInSponsor (sponsor) { return this.sponsor.players.includes(sponsor.id) },
    checkIfExist (value) {
      const existingTeams = this.$store.getters.getSponsorsNames
      const result = existingTeams.find(s => s.toString().toLowerCase() === value.toLowerCase())
      if (result) {
        alert('Sponsor already exist. Please edit insted')
        this.entry.name = ''
      }
    },
    handleFileUpload ( event ) {
      this.entry.file = event.target.files[0]
    },
    clearForm () { this.$emit('clearForm') },
    checkForm () {
      this.errors = []
      if (!this.entry.name) this.errors.push('Sponsor name required')

      return !this.errors.length
    },
    submitForm () {
      if (this.checkForm()) {
        if (this.isEditing) return this.$emit('submitForm', 'updateSponsor', this.entry)
        return this.$emit('submitForm', 'addSponsor', this.entry)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/colors.scss';
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    label {
      margin-right: 1ch;
    }
  }
  </style>