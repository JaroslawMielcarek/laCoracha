<template>
  <div class='wrapper'>
    <form @submit.prevent="register">
      <h3 class='title'>Registro</h3>
      <div class='row'>
        <p class='text_small extra-message'>Primero debe tener un MemberID para poder registrarse.</p>
        <p class='text_small extra-message'>Póngase en contacto con <span class='small link' @click="sendToWhatsApp()">nosotros</span> para obtener uno.</p>
      </div>
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
      <p v-if="isLoading">Espere por favor..</p>
      <button v-else type='submit' class='btn color full-width' :disabled="!filledFields">Crear Cuenta</button>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/CustomInput.vue'
import { sendToWhatsApp } from '@/services/util/universal'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const errorMessage = ref([])
const user = ref({
  username: '',
  password: '',
  memberID: '',
  email: '',
})

const isLoading = computed(() => store.getters.getAuthLoadingState )
const errorMsg = computed(() => store.getters.getAuthErrorMessage )
const filledFields = computed( () => Object.values(user.value).every(Boolean) )
function register () {
  store.dispatch('register', user.value)
    .then(() => {
      router.push({ path: '/login' })
    })
    .catch(() => {
      Array.isArray(errorMsg.value) ? errorMessage.value = errorMsg.value : errorMessage.value.push(errorMsg.value)
      const t = setTimeout(() => { 
        errorMessage.value = []
        clearTimeout(t)
      }, 4000)
    })
}

</script>

<style lang="scss" scoped>
@import '../colors.scss';
.extra-message {
  margin-bottom: 0;
}
.link {
  font-weight: 900;
  cursor: pointer;
}
</style>
