<template>
  <div class='modal-wrapper' @click="emit('closeForm')">
    <form class='add_edit' @submit.prevent="emit('submitForm')" @click.stop="">
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
.modal-wrapper{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba($decorativa-neutral-dark, .4);
  overflow-y: scroll;
  padding: 0 0 44px;
  z-index: 10;
}

.add_edit {
  border: 1px solid $white;
  border-radius: 4px;
  background-color: $white;
  padding: 1rem;
  margin: 20px auto;
  box-shadow: 0 4px 20px rgba($blueDark, .2);
  min-width: 360px;
  max-width: min-content;
}

@media screen and (min-width: 740px) {
  .modal-wrapper {
    justify-content: center;
  }
  .add_edit {
    max-width: 800px;
  }
}
</style>