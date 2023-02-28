<template>
  <div class="row dateTime">
    <input
      type='date'
      :value="timeS.date"
      :required="required.date"
      @change='setDate'
    />
    <select :value="timeS.time" @input="setTime" :required="required.time">
      <option value='' disabled selected>-- : --</option>
      <option
        class='from'
        v-for='(time, index) in generateHoursArray( new Date(`2020-01-01T08:00`), new Date(`2020-01-01T22:00`), 10)'
        :key='index'
      >{{ time }}</option>
    </select>
    <p v-if="error" class='text_small error'>{{error}}</p>
  </div>
</template>

<script setup>
import { generateHoursArray } from '@/services/util/time.js'
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
      type: Object,
      default () { return { date: '', time: '' } }
    },
    required: {
      type: Object,
      default () { return { date: true, time: false } }
    }
})

const error = ref('')

function  resetError () { 
  const t = setTimeout(() => { 
      error.value = ''
      clearTimeout(t)
  }, 3000)}

function setTime (event) {
  const val = event.target.value
  if (!val) {
    error.value = "Can't be empty"
    resetError()
    return
  }
  if (error.value) error.value = ''
  emit('update:modelValue', { ...props.modelValue, time: val })
}
function setDate (event) {
      const val = event.target.value
      if (!val) {
        error.value = 'Choose correct date'
        resetError()
        return
      }
      if (error.value) error.value = ''
      emit('update:modelValue', { ...props.modelValue, date: val })
    }
const timeS = computed( () => { return { date: props.modelValue.date, time: props.modelValue.time } })
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
select { max-width: 8ch; }
.dateTime { 
  display: flex;
  flex-wrap: wrap;
  gap: 1ch;
}
</style>
