<template>
  <button class='btn white row' @click="setState({ name: '' })">Create new Category</button>
  <fieldset class="players-category" v-for="category in enrolled">
    <legend class='category-name extra-message'>{{ category.name }} 
      <button class='btn white' @click="setState(category, true)">Modificar</button>
    </legend>
    <template v-for="(value, gender) in category">
      <template v-if="GENDER_LIST.includes(gender)">
        <EnrollmentCategory :value="value" :categoryName="category.name" :gender="gender" />
      </template>
    </template>
  </fieldset>

  <AddEditData v-if="choosedValue" category="Categoria" :isEditing="isEditing" @submitForm="submit" @closeForm="setState(undefined)">
    <button class="btn danger row" @click="removeElement('EnrollmentCategory', choosedValue, setState(undefined))">REMOVE</button>
    <p class='extra-message'>Nombre</p>
    <CustomInput class='row' v-model:value="choosedValue.name" placeholder='Cadete' :required='true'/>
    <fieldset>
      <legend class='extra-message'>Genero y límite de inscripción</legend>
      <div class='row toggle' v-for="gender in GENDER_LIST">
        <ToggleSlider  :checked="Object.hasOwn(choosedValue, gender)" @toggled="toggleProperty(choosedValue, gender)"/>
        <label class="gender">{{ translateToSpanish(gender) }}</label>
        <fieldset class='fieldset' v-if="choosedValue[gender]">
          <legend>Límite de inscripción</legend>
          <PlusMinus v-if="choosedValue[gender]" v-model:value="choosedValue[gender].maxPlaces" :min="1" :max="24"/>
        </fieldset>
        <fieldset v-if="choosedValue[gender]" class="fieldset age-requiments">
          <legend>Tramos de edad</legend>
          <PlusMinus v-model:value="choosedValue[gender].minAge" :min="6" :max="choosedValue[gender].maxAge"/>
          <span> - </span>
          <PlusMinus v-model:value="choosedValue[gender].maxAge" :min="choosedValue[gender].minAge" :max="65"/>
        </fieldset>
      </div>
    </fieldset>
    <p v-if="error" class='error'>{{ error }}</p>
  </AddEditData>
</template>

<script setup>
import AddEditData from '@/components/AddEditData.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import CustomInput from '@/components/CustomInput.vue'
import PlusMinus from '@/components/PlusMinus.vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import { submitForm, removeElement, translateToSpanish } from '@/services/util/universal.js'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import EnrollmentCategory from './EnrollmentCategory.vue'

const GENDER_LIST = ['female', 'male']
const store = useStore()

const error = ref('')
const isEditing = ref(false)
const choosedValue= ref(undefined)

onMounted( () => store.dispatch('fetchEnrolled'))

const enrolled = computed( () =>  sortListOfObjectsBy(store.getters.getEnrolled, 'maxAge', false, true) )

function toggleProperty (obj, propertyName) {
  (Object.hasOwn(obj, propertyName))
    ? delete obj[propertyName]
    : obj[propertyName] = { maxPlaces: 16, minAge: 6, maxAge: 20 }
}

async function submit () {

  const hasSelectedGender = GENDER_LIST.filter(g => Object.hasOwn(choosedValue.value, g))
  if (!hasSelectedGender.length) return error.value = 'Por favor, seleccione al menos un género' 
  
  if (await submitForm( isEditing.value ? 'updateEnrollmentCategory' : 'addEnrollmentCategory', choosedValue.value)) setState(undefined)
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

.players-category {
  margin-bottom: 2rem;
  border: 1px dashed rgba($blueDark, .4)
}
.category-name {
  display: flex;
  align-items: center;
  gap: 1ch;
  font-size: 1.2rem;
  text-transform: uppercase;
  .btn { font-size: .8rem;}
}
.gender {
  text-transform: capitalize;
}

.toggle {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1ch;
  padding: 8px 0;
  max-width: 350px;
}
.fieldset{
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px dashed rgba($blueDark, .4);
  padding: 0.5rem 0.25rem;
}
.danger {
  font-size: .7rem;
}

</style>