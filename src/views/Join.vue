<template>
  <div class='wrapper'>
    <form @submit.prevent="sendEnrollmentData()">
      <h3 class='title'>Consulta de nuevo jugador</h3>
      <div class='row'>
        <p class='extra-message'>Nombre y apellido</p>
        <CustomInput
            type='text'
            pattern="^[a-zA-ZÀ-ÖØ-Ýà-öø-ÿ]+ [a-zA-ZÀ-ÖØ-Ýà-öø-ÿ]+$"
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
        <label :class="['btn', {female: getSelectedGender() === 'female'}]">
          <input v-model="candidate.gender" value='female' type='radio' name='genero' />
          F
        </label>
        <label :class="['btn', {male: getSelectedGender() === 'male'}]">
          <input v-model="candidate.gender" value='male' type='radio' name='genero' />
          M
        </label>
      </fieldset>
      <fieldset class='inline-group row' v-if="candidate.gender">
        <legend class='extra-message'>Edad</legend>
        <CustomNumberInput v-if="!categories.length" v-model:value="candidate.category" :min="6" :max="65"/>

        <template v-else v-for="category in categories" >
          <label :class="['btn', {[getSelectedGender()]: candidate.category === category.name}]">
            <input v-model="candidate.category" :value="category.name" type="radio" name="category" />
            <p>{{ getAgeRange(category[getSelectedGender()]) }}</p>
            <p class="extra-message">{{  category.name }}</p>
          </label>
        </template>
      </fieldset>
      <div class='inline-group row'>
        <label class='extra-message'>Jugué con este club antes:</label>
        <ToggleSlider  :checked="candidate.wasWithUsBefore" @toggled="candidate.wasWithUsBefore = !candidate.wasWithUsBefore"/>
      </div>
      <p v-for='err in error' class='error'>{{ err }}</p>
      <button class='submit btn color full-width' type='submit'>Unirse</button>
    </form>
    <div v-if="enrollmentResult.title" class='modal-wrapper' @click="'dsdds'">
      <div class='modal enrollment-result'>
        <h4>{{ enrollmentResult.title }}</h4>
        <p class='row'>{{ enrollmentResult["message"] }}</p>
        <!-- icon -->
        <div class='row flex-row'>
          <router-link class="btn color" to='/'>
            Regresar a la página principal
          </router-link>
          <p class='btn text' @click.prevent="Object.assign(enrollmentResult, initialEnrollState)">Suscríbete a alguien más</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import PublicService from '@/services/public.service.js'
import { ref, reactive, onMounted, watch, computed} from 'vue'
import { setNotification, setFirstCapital } from '@/services/util/universal.js'

interface Gender {
    maxPlaces: number,
    currentEnrolled: number,
    minAge: number,
    maxAge: number
  }
interface Category {
  name: string,
  maxAge: string,
  female: Gender,
  male: Gender
}
type GenderOptions = "female" | "male"

const initialCandidateState = { name: '', phoneNumber: '', gender: '', category: '', wasWithUsBefore: false }
const initialEnrollState = { title: '', message: ''}

const candidate = reactive({...initialCandidateState})
const enrollmentResult = reactive({...initialEnrollState})

const error = ref<string[]>([])
const categoryList = reactive<Category[]>([])

const categories = computed( () => {
  if (!categoryList.length) return categoryList
  return categoryList.filter( c => Object.hasOwn(c, getSelectedGender()) && c[getSelectedGender()].currentEnrolled < c[getSelectedGender()].maxPlaces )
})

onMounted( () => {
  PublicService.getAll('Enrolled')
    .then(response => categoryList.push(...response) )
    .catch(() => error.value.push('Hay un problema al conectarse a la base de datos.\nSin embargo, aún puede enviarnos una solicitud.') )
})

watch( () => candidate.gender, () => candidate.category = '' )
function getSelectedGender () { return candidate.gender as GenderOptions }
function getAgeRange (obj: Gender): string {return obj.minAge + (obj.maxAge !== obj.minAge ? (' - ' + obj.maxAge) : '') }

function checkForm (): boolean {
  error.value = []

  if (!candidate.name) return !!error.value.push('Nombre requerido')
  if (!candidate.phoneNumber) return !!error.value.push('Necesitamos numero para contactarte')
  if (!candidate.gender) return !!error.value.push('Genero requerido')
  if (!candidate.category) return !!error.value.push('Edad requerida')

  return !!error.value.length
}

function sendEnrollmentData (): void {
  if (checkForm()) return
  if (!categories.value.length) return sendMessage()

  PublicService.sendJoinRequest(candidate)
    .then(response => Object.assign(enrollmentResult, response))
    .catch(error => {
      setNotification({
        name: 'Enrolled display',
        text: error.response.data.message,
        typeOfNotification: 'danger'
      })
    })

  Object.assign(candidate, initialCandidateState)
}

function sendMessage () {
  let text = `*${setFirstCapital(candidate.name)}* _(${setFirstCapital(candidate.gender)} con ${candidate.category} años)_ quiere unirse al club.
   *${candidate.wasWithUsBefore ? `Estaba con nosotros antes` : 'No estaba con nosotros antes'}* y su numero de contacto es *${candidate.phoneNumber}*`

  window.location.href = `https://wa.me/393497492300?text=${text}`
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
