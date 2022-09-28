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

<script>
import CustomInput from '@/components/CustomInput.vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'

export default {
  components: {
    CustomInput,
    CustomNumberInput,
    CustomSelectInput
  },
  methods: {
    dispatch (propName, value) {
      this.$store.dispatch('updateUserBasicInfo', { _id: this.userData._id, [propName]: { ...this.userData[propName], value: value } })
    }
  },
  computed: {
    userData () { return this.$store.getters.getUser },
    nick: {
      get () { return this.userData.nick ? this.userData.nick.value : '' },
      set (value) { this.dispatch('nick', value) }
    },
    position: {
      get () { return this.userData.position ? this.userData.position.value : '' },
      set (value) { this.dispatch('position', value) }
    },
    number: {
      get () { return this.userData.number ? this.userData.number.value : '' },
      set (value) { this.dispatch('number', parseInt(value)) }
    },
    height: {
      get () { return this.userData.height ? this.userData.height.value : '' },
      set (value) { this.dispatch('height', parseFloat(value).toFixed(2)) }
    },
    dominantHand: {
      get () { return this.userData.dominantHand ? this.userData.dominantHand.value : '' },
      set (value) { this.dispatch('dominantHand', value) }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
