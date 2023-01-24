<template>
  <div class='modal-wrapper'>
    <form class='add_edit' @submit.prevent="emit('submitForm')">
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

.modal-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($decorativa-neutral-dark, .4);
  overflow-x: scroll;
}

.add_edit {
  border: 1px solid $white;
  border-radius: 4px;
  background-color: $white;
  padding: 1rem;
  margin: 20px auto;
  box-shadow: 0 4px 20px rgba($blueDark, .2);
  min-width: 400px;
  max-width: 400px;
  position: relative;
}

@media screen and (min-width: 740px) {
  .add_edit {
    max-width: 800px;
  }
}
</style>