<template>
  <div class='group' >
      <p class='extra__message'> muestra tu tarjeta de jugador en la página web (si aceptas en la sección de privacidad)</p>
      <div class='group'>
        <div class='row'>
          <p class='extra__message'>nick en quedadas</p>
          <label class='label__inline'>Nick<p class='extra__message inline__extra'>*</p>:</label>
          <CustomInput
            type='text'
            pattern="^(?=.{2,20}$)([A-Za-z]{1,10})[^\S\t\n\r]?[A-Za-z]{0,10}([A-Za-z]+)$"
            placeholder="yarek"
            hint="Max 20 characters, Prohibited special characters"
            v-model:value='nick'
            key='nick'/>
        </div>
      </div>
      <div class='row'>
          <label class='label__inline'>Posicion:</label>
          <CustomSelectInput
            v-model:value="position"
            :options="['Exterior', 'Opuesto', 'Central', 'Libero', 'Colocador']"/>
      </div>
      <div class='row'>
          <label class='label__inline'>Número:</label>
          <CustomNumberInput
            :min="this.$store.getters.getMinPlayerNumber"
            :max="this.$store.getters.getMaxPlayerNumber"
            :step= 1
            v-model:value='number'
          />
      </div>
      <div class='row'>
          <label class='label__inline'>Altura:</label>
          <CustomNumberInput
            :min="this.$store.getters.getMinPlayerHeight"
            :max="this.$store.getters.getMaxPlayerHeight"
            :step= 0.01
            v-model:value='height'
          />
      </div>
      <div class='row'>
          <label class='label__inline'>Mano dominante:</label>
          <CustomSelectInput
          v-model:value="dominantHand"
          :options="['Izquierda', 'Derecha', 'Ambas']"/>
      </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'

const store = useStore()
const userData = store.getters.getUser
    
const nick = computed({
      get () { return userData.nick ? userData.nick.value : '' },
      set (value) { dispatch('nick', value) }
    })
const position = computed({
      get () { return userData.position ? userData.position.value : '' },
      set (value) { dispatch('position', value) }
    })
const number = computed({
      get () { return userData.number ? userData.number.value : '' },
      set (value) { dispatch('number', parseInt(value)) }
    })
const height = computed({
      get () { return userData.height ? userData.height.value : '' },
      set (value) { dispatch('height', parseFloat(value).toFixed(2)) }
    })
const dominantHand = computed({
      get () { return userData.dominantHand ? userData.dominantHand.value : '' },
      set (value) { dispatch('dominantHand', value) }
    })

function dispatch (propName, value) { 
  store.dispatch('updateUserBasicInfo', { _id: userData._id, [propName]: { ...userData[propName], value: value } })
}

</script>

<style lang="scss" scoped>

</style>
