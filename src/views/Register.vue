<template>
  <form class='wrapper' @submit.prevent="register">
    <h3 class='title'>Registro</h3>
    <p class='text_small'>Primero debe tener un MemberID para poder registrarse. Póngase en contacto con <span class='small link' @click="sendToWhatsApp()">nosotros</span> para obtener uno.</p>
    <div class='row'>
      <label>Usuario:</label>
      <CustomInput
        type='text'
        pattern="^[A-Za-z][A-Za-z0-9_]{6,29}$"
        hint="alfabet, numbers and underscore allowed. min 6 char"
        v-model:value='user.username'
        placeholder='locoPoco'
        :required="true"
        key='username' />
    </div>
    <div class='row'>
      <label>Contraseña:</label>
      <CustomInput
        type='password'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        hint="Capital letter, letter, number, special character and min 8 characters"
        v-model:value='user.password'
        placeholder='Algo123$'
        :required="true"
        key='password'/>
    </div>
    <div class='row'>
      <label>Email:</label>
      <CustomInput
        type='email'
        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
        hint="example@gmail.com"
        v-model:value='user.email'
        placeholder='example@hotmail.com'
        :required="true"
        key='email'/>
    </div>
    <div class='row'>
      <label>MemberID:</label>
      <CustomInput
        type='text'
        pattern="^[0-9]{3}$"
        hint="Your 3 digit club number"
        v-model:value='user.memberID'
        placeholder='123'
        :required="true"
        key='memberID'/>
    </div>
    <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
    <button type='submit' class='btn white full-width'>Crear Cuenta</button>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'
import { sendToWhatsApp } from '@/services/util/universal'

export default {
  components: {
    CustomInput
  },
  data () {
    return {
      errorMessage: [],
      user: {
        username: '',
        password: '',
        memberID: '',
        email: '',
      }
    }
  },
  methods: {
    sendToWhatsApp,
    register () {
      this.$store.dispatch('register', this.user)
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch((error) => {
          this.errorMessage = error.message
          const t = setTimeout(() => { 
            this.errorMessage = []
            clearTimeout(t)
          }, 4000)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../colors.scss';

.link {
  font-weight: 900;
  cursor: pointer;
}
</style>
