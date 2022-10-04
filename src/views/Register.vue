<template>
  <form class='wrapper' @submit.prevent="register">
    <h3 class='title'>Registro</h3>
    <p class='text_small'>Primero debe tener un MemberID para poder registrarse. Póngase en contacto con <span class='small link' @click="sendToWhatsApp()">nosotros</span> para obtener uno.</p>
    <div class='row'>
      <label>Usuario:</label>
      <CustomInput
        type='text'
        pattern="^[A-Za-z][A-Za-z0-9_]{6,29}$"
        hint="Alfabeto, números y guiones bajos permitidos. min 6 caracteres"
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
        hint="Mayúscula, letra, número, carácter especial y min 8 caracteres"
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
        hint="3 dígitos de numero en club"
        v-model:value='user.memberID'
        placeholder='123'
        :required="true"
        key='memberID'/>
    </div>
    <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
    <p v-if="isLoading">Loading..</p>
    <button v-else type='submit' class='btn white full-width'>Crear Cuenta</button>
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
          console.log('error', error)
            Array.isArray(this.errorMsg) ? this.errorMessage = this.errorMsg : this.errorMessage.push(this.errorMsg)
          const t = setTimeout(() => { 
            this.errorMessage = []
            clearTimeout(t)
          }, 4000)
        })
    }
  },
  computed: {
    isLoading () { return this.$store.getters.getAuthLoadingState },
    errorMsg () { return this.$store.getters.getAuthErrorMessage }
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
