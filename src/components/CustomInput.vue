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
    <p v-if="error.message" class='text_small error'>{{error.message}}</p>
    <p v-if="error.showHint" class='text_small hint'><b>Hint: </b>{{hint}}</p>
</template>

<script>
export default {
  name: 'CustomInput',
  emits: ['update:value'],
  data () {
    return {
      error: { message: '', showHint: false }
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'jajaj'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    pattern: String,
    hint: {
      type: String,
      default: 'hint'
    },
    inputmode: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value () {
      this.error = { message: '', showHint: false }
    }
  },
  methods: {
    resetError () {
      const tO = setTimeout(() => {
        this.error = { message: '', showHint: false }
        clearTimeout(tO)
      }, 3000)
    },
    validate (event) {
      const re = new RegExp(this.pattern)
      const value = event.target.value
      if (this.required && value === '') {
        this.error = { message: "No puede estar vacío", showHint: false }
        this.resetError()
        this.$emit('update:value', '')
      } else if (value && re && !re.test(value)) {
        this.error = { message: "No se ajusta a los requisitos!", showHint: true }
        this.resetError()
        this.$emit('update:value', '')
      } else {
        this.error = { message: '', showHint: false }
        this.$emit('update:value', value)
      }
    }
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
input {
  max-width: 100%;
}

</style>
