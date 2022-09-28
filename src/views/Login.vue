<template>
  <form class='wrapper' @submit.prevent="login">
    <h3 class='title'>Inicia Sesión</h3>
    <div class='row'>
      <label>Usuario:</label>
      <CustomInput
        type='text'
        pattern="^[A-Za-z][A-Za-z0-9_]{6,29}$"
        placeholder='Usuario123'
        hint="Alfabeto, números y guiones bajos permitidos. min 6 caracteres"
        v-model:value='username'
        key='username' />
    </div>
    <div class='row'>
      <label>Contraseña:</label>
      <CustomInput
        type='password'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        placeholder='Contraseña'
        hint="Mayúscula, letra, número, carácter especial y min 8 caracteres"
        v-model:value='password'
        key='password'/>
    </div>
    <div class='row links'>
      <router-link to='/register' class='register'>
        Register
      </router-link>
      <router-link to='/forgot' class='forgotten text_small'>
        Forgot password?
      </router-link>
    </div>
    <template v-if="errorMessage">
      <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
    </template>
    <button type='submit' class='btn white full-width'>INICIA SESIÓN</button>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'

export default {
  components: {
    CustomInput
  },
  data () {
    return {
      errorMessage: '',
      username: '',
      password: '',
      fromUrl: ''
    }
  },
  methods: {
    login () {
      if (!this.username || !this.password) this.errorMessage = 'Llenar formulario primero!'
      else {
        this.$store.dispatch('login', { username: this.username, password: this.password })
          .then(() => {
            if (this.$route.query.nextUrl) this.$router.push({ path: this.$route.query.nextUrl })
            else this.$router.push({ path: '/' })
          })
          .catch((error) => {
            this.errorMessage = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString()
            setTimeout(() => { this.errorMessage = '' }, 4000)
          })
      }
    },
    insertUsername (value) {
      this.username = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.links {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.forgotten {
  color: rgba($blueDark, .6);
  &:hover {
    color: rgba($blueDark, .2);
  }
}
</style>
