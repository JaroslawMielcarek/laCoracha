<template>
  <ul>
    <template v-for="(property, name) in basicInformationes" :key="name">
      <li v-if="property" class='choise'>
        <ToggleSlider  :checked="property.permisionGranted" @toggled="dispatch(name, !property.permisionGranted)" />
        <label class='label-inline'>{{ translateToSpanish(name) }}</label>
        <p class='extra-message inline-extra' v-if="privacyDescriptions[name]">{{ privacyDescriptions[name].extraInfo }}</p>
      </li>
    </template>
  </ul>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { submitForm } from '../../services/util/universal'

const store = useStore()

const names = { nick: 'nick', position: 'position', number: 'numero', height: 'altura', dominantHand: 'mano dominante', photo: 'photo' }
const privacyDescriptions = store.getters.getPrivacyDescriptions
const userData = computed( () => store.getters.getUser )

const basicInformationes = computed( () => {
  if (!userData.value) return {}
  const { nick, position, number, height, dominantHand, photo } = userData.value
  return { nick, position, number, height, dominantHand, photo }
})
function dispatch (propName, value) {
  submitForm('updateUserBasicInfo', { _id: userData.value._id, [propName]: { ...userData.value[propName], permisionGranted: value } })
}
function translateToSpanish (name) { return names[name] || name }

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.choise{
  display: flex;
  align-items: center;
  margin-bottom: 0.75em;
  gap: 1ch;
}
.extra-message { margin-bottom: 0; }
</style>
