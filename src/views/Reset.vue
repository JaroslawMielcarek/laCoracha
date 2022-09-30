<template>
  <form class='wrapper' @submit.prevent="handleSubmit">
    <h3 class='title'>Restablecer la contraseña</h3>
    <div class='row'>
      <label>Nueva contraseña:</label>
      <CustomInput
        type='password'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        hint="Capital letter, letter, number, special character and min 8 characters"
        v-model:value='password'
        :required='true'
        key='password'/>
    </div>
    <div class='row'>
      <label>Confirmar nueva contraseña:</label>
      <CustomInput
        type='password'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        hint="Capital letter, letter, number, special character and min 8 characters"
        v-model:value='password_confirm'
        :required='true'
        key='password_confirm'/>
    </div>
    <template v-if="errorMessage">
      <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
    </template>
    <button type='submit' class='btn white full-width'>Enviar</button>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import AuthService from '@/services/auth/auth.service.js'

export default {
  components: {
    CustomInput
  },
  data () {
    return {
      errorMessage: '',
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    resetForm () {
      this.password = ''
      this.password_confirm = ''
    },
    setError (message) {
      this.errorMessage = message
      const t = setTimeout(() => { 
        this.errorMessage = ''
        clearTimeout(t) 
      }, 3000)
    },
    handleSubmit () {
      if (this.password !== this.password_confirm) return this.setError('Los contraseñas son diferentes')

      const token = this.$route.query.token

      if (!token) return alert('No estás autorizado para esto')

      AuthService.reset({ password: this.password }, token)
        .then(response => {
          if (response.message) this.setError(response.message)
          this.resetForm()
        })
        .then(() => {
          setTimeout(() => {
            if (this.$route.query.nextUrl) this.$router.push({ path: this.$route.query.nextUrl })
            else this.$router.push({ path: '/login' })
          }, 5000)
        })
        .catch(error => {
          if (error.response.status === 401) return alert('¡No autorizados o las credenciales caducaron!')
          this.setError(error.message)
        })
    }
  }
}
</script>
