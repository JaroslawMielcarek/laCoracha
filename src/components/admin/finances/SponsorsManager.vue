<template>
  <h4>Patrocinadores</h4>
  <Table category="patrocinador">
    <template v-slot:head>
      <div class='table-row'>
        <p class='column'></p>
        <p class='column'>Nombre</p>
        <p class='column contribution'></p>
        <p class='column'>Principal</p>
        <p class='column link'>Enlace</p>
        <p class='column'>Logo</p>
        <p class='column'></p>
      </div>
    </template>
    <template v-slot:body>
      <div class='table-row' v-for="sponsor in sponsors" :key="sponsor">
        <div class='action column'><button class='btn color' @click="setState(sponsor, true)">Editar</button></div>
        <p class='column'>{{ sponsor.name }}</p>
        <p class='column contribution'>{{ sponsor.contribution }}</p>
        <p class='column'>{{ sponsor.isMain? 'Sí' : 'No' }}</p>
        <p class='column link'>{{ sponsor.link }}</p>
        <p class='column'>{{ sponsor.logo ? 'Sí': 'No' }}</p>
        <p class='column'><button class='btn danger' @click="removeElement('Sponsor', sponsor)">x</button></p>
      </div>
    </template>
  </Table>
  <div class='row' v-if="isLoading">
    <p class='extra-message'>Loading..</p>
  </div>
  <div class='row' v-else>
    <button v-if="!selectedSponsor" class='btn white' @click="selectedSponsor = store.getters.getDefaultSponsor">Agregar patrocinador</button>
    <AddEditSponsor v-else :value="selectedSponsor" :isEditing="isEditing" @clearForm="setState(undefined)" @submitForm="(acction,value) => submitForm(acction, value, setState(undefined))"/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import AddEditSponsor from './AddEditSponsor.vue';
import Table from '@/components/table/Table.vue'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

const store = useStore()
const isEditing = ref(false)
const selectedSponsor = ref(undefined)

const sponsors = computed( () => store.getters.getSponsors )
const isLoading = computed( () => store.getters.getSponsorsLoadingState )

function setState (value, editing = false) {
  selectedSponsor.value = value
  isEditing.value = editing
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.table-row {
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