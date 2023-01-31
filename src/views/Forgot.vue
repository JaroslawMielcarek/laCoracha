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
      <button type='submit' class='btn white full-width'>Enviar</button>
    </form>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import AuthService from '@/services/auth/auth.service.js'

export default {
  name: 'Forgot',
  components: {
    CustomInput
  },
  data () {
    return {
      errorMessage: [],
      email: '',
      email_confirm: ''
    }
  },
  methods: {
    resetForm () {
      this.email = ''
      this.email_confirm = ''
    },
    setError (message) {
      this.errorMessage.push(message)
      setTimeout(() => { this.errorMessage = [] }, 4000)
    },
    handleSubmit () {
      if (this.email !== this.email_confirm) return this.setError(['Los correos electrónicos son diferentes!'])

      AuthService.forgot({ email: this.email })
        .then(response => {
          this.setError(response.message)
          this.resetForm()
        })
        .catch(error => {
          this.setError(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message)
        })
    }
  }
}
</script>
