<template>
  <div class='numberInput'>
    <button class='btn decrease' :disabled="value <= min" @click.prevent="validate(parseFloat(value) - parseFloat(step))">-</button>
    <input
      class='value'
      type="number"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :value="value"
      :inputmode="inputmode"
      @blur="validate($event.target.value)"
      />
    <button class='btn increase' :disabled="value >= max" @click.prevent="validate(parseFloat(value) + parseFloat(step))">+</button>
  </div>
  <p v-if="error.message" class='text_small error'>{{error.message}}</p>
  <p v-if="error.showHint" class='text_small hint'><b>Hint: </b>{{hint}}</p>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:value'])
const props = defineProps({
  placeholder: { type: String, default: '0' },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 99 },
  value: { type: [Number, String], default (props) { return props.min } },
  step: { type: Number, default: 1 },
  hint: { type: String, default: 'hint' },
  inputmode: { type: String, default: 'text' }
})
const error =  ref({ message: '', showHint: false })

function validate (val) {
  const value = parseFloat(val)
  if (Number.isNaN(value)) return emit('update:value', props.min)
  if (value < props.min) { error.value = { message: `Necesita ser más grande que ${props.min}`, showHint: false }; return }
  if (value > props.max) { error.value = { message: `Necesita ser más pequeño que ${props.max}`, showHint: false }; return }
  error.value = { message: '', showHint: false }
  emit('update:value', value)
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.numberInput { 
  display: inline-block;
}
.value {
  display: inline-flex;
  max-width: clamp(4ch, 6ch, 8ch);
  border: none;
  border-radius: 4px;
  text-align: center;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
}
.btn {
  width: 24px;
  height: 100%;
  padding: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.increase {
  border-left: none;
}
.decrease {
  border-right: none;
}
.error,
.hint {
  margin-left: 2ch;
}
.hint {
  font-style: italic;
  b {
    font-weight: 200;
  }
}

</style>
