<template>
  <form class='add_edit' @submit.prevent="emit('submitForm')">
    <h4>{{ isEditing ? 'Actualizar' : 'Añadir nueva' }} {{ category }}</h4>
    <slot>Loading..</slot>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{ isEditing ? 'Actualizar' : 'Añadir' }}</button>
      <p class='btn text' @click="emit('closeForm') ">Cierra</p>
    </div>
  </form>
</template>

<script setup>

const emit = defineEmits(['closeForm', 'submitForm'])
const props = defineProps({
  isEditing: {type: Boolean, default: false},
  category: {type: String, default: 'unknown'}
})
    
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
</style>