<template>
  <div class='modal-wrapper' @click="emit('closeForm')">
    <form class='modal' @submit.prevent="emit('submitForm')" @click.stop="">
      <h4>{{ isEditing ? 'Actualizar' : 'Añadir nueva' }} {{ category }}</h4>
      <slot>Loading..</slot>
      <div class='row flex-row'>
        <button type='submit' class='btn color'>{{ isEditing ? 'Actualizar' : 'Añadir' }}</button>
        <p class='btn text' @click="emit('closeForm') ">Cierra</p>
      </div>
    </form>
  </div>
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
.row {
  margin-top: 2rem;
}

@media screen and (min-width: 740px) {
}
</style>