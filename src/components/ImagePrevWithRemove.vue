<template>
  <div class='team__logo-container'>
    <img class='team__logo' :src="getSrc()" alt='logo of team'/>
    <button class='btn danger' @click="emit('removeLogo')">x</button>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
const emit = defineEmits(['removeLogo'])
const props = defineProps({ image: Object })

function getSrc() {
  if (props.image instanceof File) return URL.createObjectURL(props.image)
  if( !props.image.contentType || !props.image.data) return ''
  return `data:image/${props.image.contentType || ''};base64,${props.image.data.toString('base64') || ''}`
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.team__logo-container {
  position: relative;
  max-width: 64px;
  // height: 64px;

  .btn {
    position: absolute;
    top: 0px;
    right: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 2px;
  }
}
.team__logo{
    max-width: 64px;
    // max-height: 64px;
    overflow: hidden;
    margin: 0;
    // clip-path: circle(32px at center);
    border: 1px dashed rgba($blueDark, .2);
  }
</style>