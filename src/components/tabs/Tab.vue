<template>
  <div :class="['tab', {active: isActive}]" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed} from 'vue'

const props = defineProps({
  title: {type: String, default: 'Tab'}
})
const selectedTitle = inject('selectedTitle')
const isActive = computed( () => selectedTitle.value == props.title )
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

</style>
