<template>
  <div :class="['table-row',{ new: !person.wasContacted}]" >
    <div class='action column'>
      <button class='btn color' v-if="!isEditing" @click="isEditing = true">Editar</button>
      <button class='btn white' v-else-if="checkIfAnyChange" @click="isEditing = false">Anular</button>
      <button class='btn red' v-else @click="submitForm('updateCandidate', person)">Guardar</button>
    </div>
    <p class='column'>{{ person.name }}</p>
    <ToggleSlider class="column" :checked="person.wasContacted" @toggled="toggle"/>
    <p class='column'>{{ person.phoneNumber }}</p>
    <ToggleSlider class='column member-previous' :checked="person.wasWithUsBefore"/>
    <textarea class='column comments' :disabled="!isEditing" v-model="person.comments"></textarea>
    <p class='column'>{{ dateToLocalDate(person.dateOfEnrollment) }}</p>
    <p class='column contactedBy'>{{ person.contactedBy }}</p>
    <div class='action column'><button class='btn danger' @click="removeElement('Candidate', person)">x</button></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { submitForm, removeElement, translateToSpanish } from '@/services/util/universal.js'
const store = useStore()
const props = defineProps(['candidate'])

const isEditing = ref(false)

const person = ref({...props.candidate})

function dateToLocalDate (date) {
  return new Date(date).toLocaleString()
}

function toggle () {
  if (!isEditing.value) return null
  const currUser = store.getters.getUsername
  person.value.contactedBy = (person.value.wasContacted)
    ? ''
    : currUser.slice(0,3) || 'unknown'
  person.value.wasContacted = !person.value.wasContacted
}
const checkIfAnyChange = computed( () => ( person.value.comments === props.candidate.comments ) && ( person.value.wasContacted === props.candidate.wasContacted ) )

</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.table-row.new {
  border: 4px double rgba($valid, .4)
}
textarea {
  resize: none;
}
.column {
  &.comments,
  &.contactedBy {
    display: none;
  }
}

@media (min-width: 740px) {


.column {
  &.comments,
  &.contactedBy {
    display: flex;
  }
}
}
</style>