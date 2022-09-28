<template>
  <div class='component'>
    <input
    type='date'
    :value="timeS.date"
    :required="required.date"
    @blur='setDate'
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

<script>
import { generateHoursArray } from '@/services/util/time.js'

export default {
  name: 'CustomDateTimeInput',
  emits: ['update:modelValue'],
  data () {
    return {
      error: ''
    }
  },
  props: {
    modelValue: {
      type: Object,
      default () { return { date: '', time: '' } }
    },
    required: {
      type: Object,
      default () { return { date: true, time: false } }
    }
  },
  methods: {
    generateHoursArray,
    resetError () {
      setTimeout(() => { this.error = '' }, 3000)
    },
    setTime (event) {
      const value = event.target.value
      if (!value) {
        this.error = "Can't be empty"
        this.resetError()
        return
      }
      if (this.error) this.error = ''
      this.$emit('update:modelValue', { ...this.modelValue, time: value })
    },
    setDate (event) {
      const value = event.target.value
      if (!value) {
        this.error = 'Choose correct date'
        this.resetError()
        return
      }
      if (this.error) this.error = ''
      this.$emit('update:modelValue', { ...this.modelValue, date: value })
    }
  },
  computed: {
    timeS () {
      return { date: this.modelValue.date, time: this.modelValue.time }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
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
.row {
  input,
  select {
    display: inline-block;
  }
}

</style>
