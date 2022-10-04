<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4 v-if="!isEditing">Añadir nuevo Patrocinador</h4>
    <h4 v-else>Editar {{entry.name}} Patrocinador</h4>
    <div class='row' v-if="!isEditing">
      <label>Nombre:</label>
      <CustomInput v-model:value="entry.name" placeholder='Nombre de patrocinador' :required='true' @update:value="checkIfExist"/>
    </div>
    <div class='row'>
      <label>Enlace de página web:</label>
      <CustomInput v-model:value="entry.link" placeholder='enlace.com'/>
    </div>
    <div class='row'>
      <label>Contribuido: </label>
      <CustomNumberInput :min="0" :max="2000" :step="10" v-model:value="entry.contribution"/>
    </div>
    <div class='row isMain'>
      <label>Es principal:</label>
      <ToggleSlider :checked="entry.isMain"  @toggled="() => entry.isMain = !entry.isMain"/>
    </div>
    <div class='row'>
      <ImagePrevWithRemoveVue v-if="entry.logo" :image="entry.logo" @removeLogo="entry.logo=undefined"/>
      <div v-else>
        <CustomUploadFile text="LOGO" :file="entry.logo" :sizeLimit="200000" @fileChoosed="(val) => entry.logo = val"/>
        <p class='extra__message'>max: 250x250px or 200kb </p>
      </div>
    </div>
    <div class='row' v-if="isLoading">
      <p class='extra__message'>Loading..</p>
    </div>
    <div class='flex-row' v-else>
      <button type='submit' class='btn color full-width'>{{isEditing ? 'Actualizar' : 'Añadir'}}</button>
      <p class='btn text' @click="this.$emit('clearForm')">Clear</p>
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
        : JSON.parse(JSON.stringify(this.value))
    }
  },
  watch: {
    value () {
      isEmptyObject(this.value)
        ? this.entry = JSON.parse(JSON.stringify(this.$store.getters.getDefaultTeam))
        : this.entry = JSON.parse(JSON.stringify(this.value))
    }
  },
  computed: {
    sponsor () { return this.entry },
    isLoading () { return this.$store.getters.getSponsorsLoadingState }
  },
  methods: {
    isEmptyObject,
    checkIfExist (value) {
      const existingTeams = this.$store.getters.getSponsorsNames
      const result = existingTeams.find(s => s.toString().toLowerCase() === value.toLowerCase())
      if (result) {
        alert('El patrocinador ya existe. Por favor edite en lugar')
        this.entry.name = ''
      }
    },
    handleFileUpload ( event ) {
      this.entry.file = event.target.files[0]
    },
    submitForm () { return this.$emit('submitForm', (this.isEditing) ? 'updateSponsor' : 'addSponsor', this.entry) }
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