<template>
  <div class='wrapper'>
    <form @submit.prevent="sendEnrollmentData()">
      <h3 class='title'>Consulta de nuevo jugador</h3>
      <div class='row'>
        <p class='extra-message'>Nombre y apellidos</p>
        <CustomInput
            type='text'
            pattern="^[A-Za-z][A-Za-z]{2,29}$"
            placeholder='Antonio'
            hint="Solo se permiten letras alfabéticas. mínimo 3 caracteres"
            v-model:value='candidate.name'
            :required="true"
            key="name"/>
      </div>
      <div class='row'>
        <p class='extra-message'>Número de contacto</p>
        <CustomInput
            type='text'
            pattern="^\d{9}$"
            placeholder='606 606 606'
            hint="Solo se permiten dígitos. Se requieren 6 dígitos"
            v-model:value='candidate.phoneNumber'
            :required="true"
            key="phoneNumber"/>
      </div>
      <fieldset class='inline-group row'>
        <legend class='extra-message'>Genero</legend>
        <label :class="['btn', {female: gender === 'female'}]">
          <input v-model="candidate.gender" value='female' type='radio' name='genero' />
          F
        </label>
        <label :class="['btn', {male: gender === 'male'}]">
          <input v-model="candidate.gender" value='male' type='radio' name='genero' />
          M
        </label>
      </fieldset>
      <fieldset class='inline-group row' v-if="candidate.gender">
        <legend class='extra-message'>Edad</legend>
        <CustomNumberInput v-if="!categories.length" v-model:value="candidate.category" :min="6" :max="65"/>
        
        <template v-else v-for="category in categories" >
          <label :class="['btn', {[gender]: candidate.category === category.name}]" 
            v-if="Object.hasOwn(category, gender) && category[gender].currentEnrolled < category[gender].maxPlaces">
            <input v-model="candidate.category" :value="category.name" type="radio" name="category" />
          <p>{{ category[gender].minAge }} {{ (category[gender].maxAge !== category[gender].minAge) ? ` - ${category[gender].maxAge}` : null }}</p>
         <p class="extra-message">{{  category.name }}</p>
          </label>
        </template>
      </fieldset>
      <div class='inline-group row'>
        <label class='extra-message'>Jugué con este club antes:</label>
        <ToggleSlider  :checked="candidate.wasWithUsBefore" @toggled="candidate.wasWithUsBefore = !candidate.wasWithUsBefore"/>
      </div>
      <p v-for='err in error' class='error' :key="error">{{ err }}</p>
      <p v-if="fetchError" class='error' >{{ fetchError }}</p>
      <button class='submit btn color full-width' type='submit'>Unirse</button>
    </form>
    <div v-if="enrollmentResult" class='modal-wrapper' @click="'dsdds'">
      <div class='modal enrollment-result'>
        <h4>{{ enrollmentResult.title }}</h4>
        <p class='row'>{{ enrollmentResult.message }}</p>
        <!-- icon -->
        <div class='row flex-row'>
          <router-link class="btn color" to='/'>
            Regresar a la página principal
          </router-link>
          <p class='btn text' @click.prevent="reset">Suscríbete a alguien más</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomInput from '@/components/CustomInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import PublicService from '@/services/public.service.js'
import { ref, onMounted, watch, computed} from 'vue'
import { setNotification } from '@/services/util/universal.js'

const emit = defineEmits(['submitForm'])
const DEFAULT = {
  name: undefined,
  phoneNumber: undefined,
  gender: undefined,
  category: undefined,
  wasWithUsBefore: false,
}

const candidate = ref({...DEFAULT})

const enrollmentResult = ref(undefined)
const error = ref([])
const fetchError = ref(undefined)
const categoryList = ref([])
const gender = computed( () => candidate.value.gender)
const categories = computed( () => {
  if (!gender.value || !categoryList.value.length) return []

  return categoryList.value.filter( c => Object.hasOwn(c, gender.value) && c[gender.value].currentEnrolled < c[gender.value].maxPlaces )
})

onMounted( () => {
  PublicService.getAll('Enrolled')
    .then(response => {
      categoryList.value = response
    })
    .catch(err => {
      fetchError.value = 'Hay un problema para conectarse a la base de datos'
    })
})

watch( () => candidate.value.gender, () => delete candidate.value.category )

function checkForm () {
  error.value = []

  if (!candidate.value.name) error.value.push('Nombre requerido')
  if (!candidate.value.phoneNumber) error.value.push('Necesitamos numero para contactarte')
  if (!candidate.value.category) error.value.push('Edad requerida')

  return error.value.length
}

function sendEnrollmentData () {
  if (checkForm()) return null
  if (!!fetchError.value || !categories.value.length) return sendMessage()

  PublicService.sendJoinRequest(candidate.value)
    .then(response => {
      enrollmentResult.value = response
    })
    .catch(error => {
      setNotification({
        name: 'Enrolled display',
        text: error.response.data.message,
        typeOfNotification: 'danger'
      })
    })

    candidate.value = {...DEFAULT}
}

function sendMessage () {
  let text = '*name* _(gender con age años)_ quiere unirse al club. *withUs* y su numero de contacto es *phoneNumber*'

  const mapObj = {
    name: candidate.value.name[0].toUpperCase() + candidate.value.name.slice(1),
    age: candidate.value.category,
    gender: candidate.value.gender[0].toUpperCase() + candidate.value.gender.slice(1),
    phoneNumber: candidate.value.phoneNumber,
    withUs: candidate.value.wasWithUsBefore ? `Estaba con nosotros antes` : 'No estaba con nosotros antes'
  }
  text = text.replace(
    /name|age|gender|phoneNumber|withUs/gi,
    function (matched) {
      return mapObj[matched]
    }
  )
  window.location.href = `https://wa.me/393497492300?text=${text}`
}

function reset () {
  candidate.value = {...DEFAULT}
  enrollmentResult.value = null
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

form {
  width: clamp(300px, 90vw, 380px);
  padding: 1em 1em 2em;
}
.inline-group {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.btn {
  flex-shrink: 0;

  &.female,
  &.male {
    color: $white;
  }
  &.female {
    background-color: $female;
  }
  &.male {
    background-color: $male;
  }
  input {
    display: none;
  }
}
.submit {
  margin-top: 20px;
}
</style>
