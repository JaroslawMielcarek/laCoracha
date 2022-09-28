<template>
  <div class="window">
    <slot class="text"></slot>
    <button class='btn white' @click="confirm('') ">OK</button>
    <button v-if="isConfirmDialog" class='btn white' @click="cancel('') ">OK</button>
  </div>
</template>

<script>
export default {
  emits: ['confirm'],
  props: {
    text: {
      type: String
    },
    isConfirmDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm (val) { this.$emit('confirm', val) },
    cancel () { this.$emit('cancel') }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  opacity: .85;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: $blueDark;
  color: $white;
  border: 1px solid rgba($blueDark, .4);
  border-radius: 4px;
  padding: 20px;
  .text {
    white-space: pre-wrap;
  }
}
</style>
