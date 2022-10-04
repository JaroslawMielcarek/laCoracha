<template>
  <h4>Patrocinadores</h4>
  <div class='grid row'>
    <div class='list-head'>
      <p class='column'></p>
      <p class='column'>Nombre</p>
      <p class='column contribution'></p>
      <p class='column'>Principal</p>
      <p class='column link'>Enlace</p>
      <p class='column'>Logo</p>
      <p class='column'></p>
    </div>
    <div class='list large'>
      <div class='list-row' v-if="!sponsors.length">
        <p class="no-data">Sin patrocinador para mostrar</p>
      </div>
      <div class='list-row' v-for="sponsor in sponsors" :key="sponsor">
        <div class='action column'><button class='btn color' @click="setState(sponsor, true)">Editar</button></div>
        <p class='column'>{{sponsor.name}}</p>
        <p class='column contribution'>{{sponsor.contribution}}</p>
        <p class='column'>{{sponsor.isMain? 'Sí' : 'No'}}</p>
        <p class='column link'>{{sponsor.link}}</p>
        <p class='column'>{{sponsor.logo ? 'Sí': 'No'}}</p>
        <p class='column'><button class='btn danger' @click="removeElement('Sponsor', sponsor)">x</button></p>
      </div>
    </div>
  </div>
  <div class='row' v-if="isLoading">
    <p class='extra__message'>Loading..</p>
  </div>
  <div class='row' v-else>
    <button v-if="!value" class='btn white' @click="value = this.$store.getters.getDefaultSponsor">Agregar patrocinador</button>
    <AddEditSponsor v-else :value="value" :isEditing="isEditing" @clearForm="setState(undefined)" @submitForm="(acction,value) => submitForm(acction, value, setState(undefined))"/>
  </div>
</template>

<script>

import AddEditSponsor from './AddEditSponsor.vue';
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

export default {
  components: {
    AddEditSponsor
  },
  data () {
    return {
      isEditing: false,
      value: undefined,
    }
  },
  computed: { 
    sponsors () { return this.$store.getters.getSponsors },
    isLoading () { return this.$store.getters.getSponsorsLoadingState }
  },
  methods: {
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
.list-head, .list-row {
  // max 500px 60 + 90 + 4ch + 40px
  grid-template-columns: 60px 1fr 6ch 4ch 1fr 4ch 40px;
}
.contribution::after {
  content: '€';
  width: 1ch;
  margin-left: 2px;
}
.row .btn {
  width: 100%;
}
</style>