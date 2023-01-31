<template>
  <select :value="value" @change="this.$emit('update:value', $event.target.value)" :disabled="disabled" :required="required">
    <option value="" disabled selected>{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script>
export default {
  name: 'CustomSelectInput',
  emits: ['update:value'],
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    options: {
      type: Array,
      default () { return [] }
    },
    placeholder: {
      type: String,
      default: 'Choose option'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

</style>
