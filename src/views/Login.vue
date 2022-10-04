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
        :required="true"
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
        :required="true"
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
    <p v-for="error in errorMessage" class='error' :key="error">{{error}}</p>
    <p v-if="isLoading">Loading..</p>
    <button v-else type='submit' class='btn white full-width'>INICIA SESIÓN</button>
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
      errorMessage: [],
      username: '',
      password: '',
      fromUrl: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { username: this.username, password: this.password })
        .then(() => {
          if (this.$route.query.nextUrl) this.$router.push({ path: this.$route.query.nextUrl })
          else this.$router.push({ path: '/' })
        })
        .catch((error) => {
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
@import '@/colors.scss';
.links {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.forgotten, 
.register {
  color: rgba($blueDark, .6);
  &:hover {
    color: rgba($blueDark, .2);
  }
}
</style>
