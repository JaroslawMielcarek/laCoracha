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
          v-model:value='email'
          placeholder='example@hotmail.com'
          :required='true'
          key='email'/>
      </div>
      <div class='row'>
        <label>Repetir email:</label>
        <CustomInput
          type='email'
          pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
          hint="example@gmail.com"
          v-model:value='email_confirm'
          placeholder='example@hotmail.com'
          :required='true'
          key='email_confirm'/>
      </div>
      <template v-if="errorMessage.length">
        <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
      </template>
      <p v-if="isProcessing && !errorMessage.length">Procesamos tu solicitud, espera..</p>
      <button v-if="!isProcessing" type='submit' class='btn white full-width'>Enviar</button>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/CustomInput.vue'
import AuthService from '@/services/auth/auth.service.js'
import { ref } from 'vue'

const errorMessage = ref([])
const email = ref('')
const email_confirm = ref('')
const isProcessing = ref(false)

function setError (message) {
  Array.isArray(message) ?errorMessage.value = message : errorMessage.value.push(message)
  setTimeout(() => { 
    email.value = ''
    email_confirm.value = ''
    errorMessage.value = []
    isProcessing.value = false
   }, 6000)
}

function handleSubmit () {
  if (email.value !== email_confirm.value) return setError('Los correos electrónicos son diferentes!')
  isProcessing.value = true
  AuthService.forgot({ email: email.value })
  .then(response => setError(response.message))
  .catch(error => setError( error.response.data ? error.response.data.message : error.message ))
}
</script>
