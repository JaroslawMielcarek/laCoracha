<template>
    <input
      :type="type"
      :pattern="pattern"
      :placeholder="placeholder"
      :value="value"
      :inputmode="inputmode"
      :required="required"
      @blur="validate"
    />
    <p v-if="error.message" class='text_small error'>{{ error.message }}</p>
    <p v-if="error.showHint" class='text_small hint'><b>Hint: </b>{{ hint }}</p>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:value'])
const props = defineProps({
  placeholder: { type: String, default: 'jajaj' },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    pattern: String,
    hint: { type: String, default: 'hint' },
    inputmode: { type: String, default: 'text' },
    required: { type: Boolean, default: false },
})

const error = ref({message: '', showHint: false})

function resetError () {
  const tO = setTimeout(() => {
    error.value = { message: '', showHint: false }
    clearTimeout(tO)
  }, 6000)
}
function validate (event) {
  const re = new RegExp(props.pattern)
  const value = event.target.value
  if (props.required && value === '') {
    error.value = { message: "No puede estar vacío", showHint: false }
    resetError()
    emit('update:value', '')
  } else if (value && re && !re.test(value)) {
    error.value = { message: "No se ajusta a los requisitos!", showHint: true }
    resetError()
    emit('update:value', '')
  } else {
    error.value = { message: '', showHint: false }
    emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.error,
.hint {
  width: 100%;
}
.hint {
  font-style: italic;
  b {
    font-weight: 200;
  }
}
</style>
