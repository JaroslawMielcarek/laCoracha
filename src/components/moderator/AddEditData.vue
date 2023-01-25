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
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($decorativa-neutral-dark, .4);
  overflow-y: scroll;
}

.add_edit {
  border: 1px solid $white;
  border-radius: 4px;
  background-color: $white;
  padding: 1rem;
  margin: 20px auto;
  box-shadow: 0 4px 20px rgba($blueDark, .2);
  max-width: 400px;
  position: relative;
  z-index: 2;
}

@media screen and (min-width: 740px) {
  .add_edit {
    max-width: 800px;
  }
}
</style>