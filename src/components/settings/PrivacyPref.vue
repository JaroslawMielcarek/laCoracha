<template>
  <ul class='privacy__choises'>
    <template v-for="(property, name) in basicInformationes" :key="name">
      <li v-if="property" class='choise'>
        <ToggleSlider  :checked="property.permisionGranted" @toggled="dispatch(name, !property.permisionGranted)" />
        <label class='label__inline'>{{ translateToSpanish(name) }}</label>
        <p class='extra__message inline__extra' v-if="privacyDescriptions[name]">{{ privacyDescriptions[name].extraInfo }}</p>
      </li>
    </template>
  </ul>
</template>

<script>
import ToggleSlider from '@/components/ToggleSlider.vue'

export default {
  name: 'PrivacyPref',
  components: {
    ToggleSlider
  },
  methods: {
    dispatch (propName, value) {
      this.$store.dispatch('updateUserBasicInfo', { _id: this.userData._id, [propName]: { ...this.userData[propName], permisionGranted: value } })
    },
    translateToSpanish (name) {
      const names = { nick: 'nick', position: 'position', number: 'numero', height: 'altura', dominantHand: 'mano dominante', photo: 'photo' }
      return names[name] || name
    }
  },
  computed: {
    privacyDescriptions () { return this.$store.getters.getPrivacyDescriptions },
    userData () { return this.$store.getters.getUser },
    basicInformationes () {
      if (!this.userData) return {}
      const { nick, position, number, height, dominantHand, photo } = this.userData
      return { nick, position, number, height, dominantHand, photo }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.choise{
  display: flex;
  align-items: center;
  margin-bottom: 0.75em;
  p { margin-bottom: 0; }
}
.label__inline {
  margin-right: 1ch;
}
</style>
