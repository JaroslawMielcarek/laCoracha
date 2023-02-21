<template>
  <div class = 'plusMinusInput'>
    <button class = "btn decrease" id="decrease" @click.prevent="val--" v-bind:disabled="val < (min + 1)">-</button>
    <input  class = 'value--input'
            type = "number"
            required
            :min = min
            maxLength = 4
            inputMode = 'numeric'
            v-model.number = "val"
            />
    <button class = "btn increase" id="increase" @click.prevent="val++" v-bind:disabled="val >= max">+</button>
  </div>
</template>

<script>
export default {
  name: 'PlusMinus',
  emits: ['update:value'],
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 9998
    }
  },
  computed: {
    val: {
      get () {
        return this.value || this.min
      },
      set (newValue) {
        this.checkIfInRange(newValue)
      }
    }
  },
  methods: {
    checkIfInRange (newValue) {
      const nv = parseInt(newValue)
      if (isNaN(nv)) return this.$emit('update:value', this.min)

      if (nv >= this.max) return this.$emit('update:value', this.max) 
      if (nv < this.min) return this.$emit('update:value', this.min)
      
      this.$emit('update:value', nv) 
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.plusMinusInput {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
}
.btn,
.value--input {
  display: inline-block;
}
.value--input {
  width: 6ch;
  text-align: center;
}
.btn {
  &.increase {
    border-left: none;
  }
  &.decrease {
    border-right: none;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
