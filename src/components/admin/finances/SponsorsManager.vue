<template>
  <h4>Patrocinadores</h4>
  <Table category="patrocinador">
    <button v-if="!choosedValue" class='btn white' @click="choosedValue = store.getters.getDefaultSponsor">Agregar patrocinador</button>
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
  <AddEditData v-if="choosedValue" category="Sponsor" :isEditing="isEditing" @submitForm="submit" @closeForm="setState(undefined)">
    <div class='row' v-if="!isEditing">
      <label>Nombre:</label>
      <CustomInput v-model:value="choosedValue.name" placeholder='Nombre de patrocinador' :required='true' @update:value="checkIfExist"/>
    </div>
    <div class='row'>
      <label>Enlace de página web:</label>
      <CustomInput v-model:value="choosedValue.link" placeholder='enlace.com'/>
    </div>
    <div class='row'>
      <label>Contribuido: </label>
      <CustomNumberInput :min="0" :max="2000" :step="10" v-model:value="choosedValue.contribution"/>
    </div>
    <div class='row isMain'>
      <label>Es principal:</label>
      <ToggleSlider :checked="choosedValue.isMain"  @toggled="() => choosedValue.isMain = !choosedValue.isMain"/>
    </div>
    <div class='row'>
      <ImagePrevWithRemoveVue v-if="choosedValue.logo" :image="choosedValue.logo" @removeLogo="choosedValue.logo=undefined"/>
      <div v-else>
        <CustomUploadFile text="LOGO" :file="choosedValue.logo" :sizeLimit="200000" @fileChoosed="(val) => choosedValue.logo = val"/>
      </div>
    </div>
    <div class='row' v-if="isLoading">
      <p class='extra__message'>Loading..</p>
    </div>
  </AddEditData>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import CustomUploadFile from '@/components/CustomUploadFile.vue'
import ImagePrevWithRemoveVue from '@/components/ImagePrevWithRemove.vue'
import AddEditData from '@/components/AddEditData.vue'
import Table from '@/components/table/Table.vue'
import { submitForm, removeElement } from '@/services/util/universal.js'

const store = useStore()
const isEditing = ref(false)
const choosedValue = ref(undefined)

const sponsors = computed( () => store.getters.getSponsors )
const isLoading = computed( () => store.getters.getSponsorsLoadingState )

onMounted( () => {
  store.dispatch('fetchSponsors')
})

async function submit(){
  if (await submitForm(isEditing.value ? 'updateSponsor' : 'addSponsor', choosedValue.value)) setState(undefined)
}
function setState(val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
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
</style>