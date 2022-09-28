<template>
  <div class = 'plusMinusInput'>
    <button class = "btn decrease" id="decrease" @click.prevent="val--" v-bind:disabled="val < (min + 1)">-</button>
    <!-- <input class = 'value--input' v-model.number='val' /> -->
    <input  class = 'value--input'
            type = "text"
            min = 0
            maxLength = 4
            inputMode = 'numeric'
            v-model.number="val"
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
        return this.value
      },
      set (newValue) {
        if (isNaN(parseInt(newValue))) {
          alert('Insert number')
        } else this.$emit('update:value', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.plusMinusInput {
  display: flex;
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
</style>
