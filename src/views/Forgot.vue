<template>
  <div class='wrapper'>
    <form @submit.prevent="handleSubmit">
      <h3 class='title'>Recuperar contraseña</h3>
      <div class='row'>
        <label>Email:</label>
        <CustomInput
          type='email'
          pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
          hint="example@gmail.com"
          v-model:value='data.email'
          placeholder='example@hotmail.com'
          :required='true'/>
      </div>
      <div class='row'>
        <label>Repetir email:</label>
        <CustomInput
          type='email'
          pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
          hint="example@gmail.com"
          v-model:value='data.emailConfirm'
          placeholder='example@hotmail.com'
          :required='true'/>
      </div>
      <template v-if="errorMessage.length">
        <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
      </template>
      <p v-if="isProcessing && !errorMessage.length">Procesamos tu solicitud, espera..</p>
      <button v-if="!isProcessing" type='submit' class='btn color full-width' :disabled="!filledFields">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/CustomInput.vue'
import AuthService from '@/services/auth/auth.service.js'
import { ref, computed } from 'vue'

const errorMessage = ref([])
const data = ref({email: '', emailConfirm: ''})
const isProcessing = ref(false)
const filledFields = computed( () => Object.values(data.value).every(Boolean) )

function setError (message) {
  Array.isArray(message) ?errorMessage.value = message : errorMessage.value.push(message)
  setTimeout(() => { 
    data.value = { email: '', emailConfirm: '' }
    errorMessage.value = []
    isProcessing.value = false
   }, 6000)
}

function handleSubmit () {
  if (data.value.email !== data.value.emailConfirm) return setError('Los correos electrónicos son diferentes!')
  isProcessing.value = true
  AuthService.forgot({ email: data.value.email })
  .then(response => setError(response.message))
  .catch(error => setError( error.response.data ? error.response.data.message : error.message ))
}
</script>
