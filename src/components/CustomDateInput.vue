<template>
  <div class='component'>
    <input
    type='date'
    v-model="val"
    />
    <p v-if="error" class='text_small error'>{{error}}</p>
  </div>
</template>

<script>

export default {
  name: 'CustomDateInput',
  emits: ['update:value'],
  data () {
    return {
      error: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    resetError () {
      setTimeout(() => { this.error = '' }, 3000)
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (newValue) {
        console.log('new value', newValue)
        if (!newValue) {
          this.error = 'Choose correct date'
          this.resetError()
          return
        }
        if (this.error) this.error = ''
        this.$emit('update:value', newValue)
      }
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
