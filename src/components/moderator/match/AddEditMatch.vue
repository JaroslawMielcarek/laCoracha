<template>
  <form class='add_edit' @submit.prevent="submitForm">
    <h4 class='header'>{{ isEditing ? 'Edit' : 'Add new'}} Partido</h4>
    <div>
      <div class='team'>
        <h5>Local</h5>
        <CustomInput v-model:value="entry.homeTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="entry.homeTeam.teamName" placeholder='Equipo'/>
        <CustomSelectInput v-model:value="entry.homeTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Género" />
        <CustomSelectInput v-model:value="entry.homeTeam.wonSets" :options="['0','1','2','3']" placeholder='Sets ganados' />
      </div>
      <div class='team'>
        <h5>Visitor</h5>
        <CustomInput v-model:value="entry.guestTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="entry.guestTeam.teamName" placeholder='Equipo'/>
        <CustomSelectInput v-model:value="entry.guestTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Género" />
        <CustomSelectInput v-model:value="entry.guestTeam.wonSets" :options="['0','1','2','3']" placeholder='Sets ganados' />
      </div>
    </div>
    <div class='details'>
      <div class='row'>
        <CustomDateTimeInput v-model="entry.dateTime" :required="{ date: true, time: true }"/>
        <CustomInput v-model:value="entry.location" placeholder='Ubicación' :required='true'/>
        <CustomInput v-model:value="entry.league" placeholder='League'/>
      </div>
      <div class='row toggle'>
        <ToggleSlider  :checked="entry.friendly" @toggled="entry.friendly = !entry.friendly"/>
        <label class='label__inline'>Amistoso</label>
      </div>
    </div>
    <div class='row flex-row'>
      <button type='submit' class='btn color'>{{isEditing ? 'Actualizar' : 'Añadir'}}</button>
      <p class='btn text' @click="emit('clearForm')">Clear</p>
    </div>
  </form>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch, defineEmits, defineProps } from 'vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import CustomInput from '@/components/CustomInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { isEmptyObject } from '@/services/util/object.js'

const store = useStore()
const emit = defineEmits(['clearForm', 'submitForm'])
const props = defineProps({ value: {type: Object, default: undefined}, isEditing: {type: Boolean, default: false} })

const entry = ref(
  isEmptyObject(props.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultMatch))
    : JSON.parse(JSON.stringify(props.value))
)
watch(props, (newValue) => {
  entry.value = isEmptyObject(newValue.value)
    ? JSON.parse(JSON.stringify(store.getters.getDefaultMatch))
    : JSON.parse(JSON.stringify(newValue.value))
})

function submitForm () { return emit('submitForm', isEditing.value ? 'updateMatch' : 'addMatch', entry.value) }

</script>

<style lang="scss" scoped>
.team {
  display: inline-block;
  width: min-content;
  vertical-align: middle;
  text-align: center;
  margin-right: 10px;
  &:last-of-type{
    margin-right: 0;
  }
  input, select {
    margin-bottom: .5rem;
  }
}
.details {
  margin: 20px auto;
}
.toggle {
  display: flex;
  align-items: center;
}
</style>
