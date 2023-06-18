<template>
  <div class='wrapper'>
    <form @submit.prevent="login">
      <h3 class='title'>Inicia Sesión</h3>
      <div class='row'>
        <label>Usuario:</label>
        <CustomInput
          type='text'
          pattern="^[A-Za-z][A-Za-z0-9_]{6,29}$"
          placeholder='Usuario123'
          hint="Alfabeto, números y guiones bajos permitidos. min 6 caracteres"
          v-model:value='user.username'
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
          v-model:value='user.password'
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
      <button v-else type='submit' class='btn color full-width' :disabled="!filledFields">INICIA SESIÓN</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const errorMessage = ref<string[]>([])
const user = ref({ username: '', password: '' })

const isLoading = computed<boolean>( () => store.getters.getAuthLoadingState )
const errorMsg = computed<string | string[]>( () => store.getters.getAuthErrorMessage )
const filledFields = computed( () => Object.values(user.value).every(Boolean) )
function login () {
  store.dispatch('login', user.value)
    .then( () => {
      if (route.query.nextUrl) router.push({ path: route.query.nextUrl as string })
      else router.push({ path: '/' })
    })
    .catch( () => {
      Array.isArray(errorMsg.value) ? errorMessage.value = errorMsg.value : errorMessage.value.push(errorMsg.value)
      const t = setTimeout( () => {
        errorMessage.value = []
        clearTimeout(t)
      }, 4000)
    })
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
form {
  max-width: 190px; 
}
@media screen and (min-width: 740px) {
  form {
    max-width: 240px;
  }
}
@media screen and (min-width: 1070px) {
  form {
    max-width: 300px;
  }

  }
</style>
