<template>
  <p class='extra-message'>Administrar el calendario de partidos</p>
  <button class='addNew btn white' @click="choosedValue = store.getters.getDefaultMatch">Agregar Partido</button>
  <Table category="partidos" v-model:showBy="showBy" :filterOptions="['Todo', 'Semana', 'Mes', 'Temporada']" >
    <template v-slot:head>
      <div class='table-row'>
        <p class='column'></p>
        <p class='column'>Local</p>
        <p class='column'>Visitor</p>
        <p class='column'>Fecha</p>
        <p class='column'>Ubicación</p>
        <p class='column'>Tipo</p>
      </div>
    </template>
    <template v-slot:body>
      <div class='table-row' v-for="match in matches" :key="match">
        <div class='action column'><button class='btn color' @click="setState(match, true)">Editar</button></div>
        <div class='column blocks'>
          <p class='title'>{{ match.homeTeam.clubName }}</p>
          <p class='team'>{{ match.homeTeam.teamName }}</p>
          <p class='gender'>{{ match.homeTeam.teamGender }}</p>
        </div>
        <div class='column blocks'>
          <p class='title'>{{ match.guestTeam.clubName }}</p>
          <p class='team'>{{ match.guestTeam.teamName }}</p>
          <p class='gender'>{{ match.guestTeam.teamGender }}</p>
        </div>
        <div class='column blocks'>
          <div class='date'>
            <p class='day'>{{ new Date(match.dateTime.date).getDate() }}</p>
            <p class='month'>{{ getMonthNameByNumber(match.dateTime.date).substring(0,3) }}</p>
            <p class='year'>{{ new Date(match.dateTime.date).getFullYear() }}</p>
          </div>
          <p class='time'>{{ match.dateTime.time }}</p>
        </div>
        <p class='column location'>{{ match.location }}</p>
        <p class='column type'>{{ match.friendly ? 'friendly' : match.league }}</p>
        <p class='action column'><button class='btn danger' @click="removeElement('Match', match)">x</button></p>
      </div>
    </template>
  </Table>
  <AddEditData v-if="choosedValue" category="Partido" :isEditing="isEditing" @submitForm="submit" @closeForm="setState(undefined)">
    <div class='row'>
      <div class='team'>
        <h5>Local</h5>
        <CustomInput v-model:value="choosedValue.homeTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="choosedValue.homeTeam.teamName" placeholder='Equipo'/>
        <CustomSelectInput v-model:value="choosedValue.homeTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Género" />
        <CustomSelectInput v-model:value="choosedValue.homeTeam.wonSets" :options="['0','1','2','3']" placeholder='Sets ganados' />
      </div>
      <div class='team'>
        <h5>Visitor</h5>
        <CustomInput v-model:value="choosedValue.guestTeam.clubName" placeholder='Club' :required='true'/>
        <CustomInput v-model:value="choosedValue.guestTeam.teamName" placeholder='Equipo'/>
        <CustomSelectInput v-model:value="choosedValue.guestTeam.teamGender" :options="['Female', 'Male', 'Mix']" placeholder="Género" />
        <CustomSelectInput v-model:value="choosedValue.guestTeam.wonSets" :options="['0','1','2','3']" placeholder='Sets ganados' />
      </div>
    </div>
    <div class='row details'>
      <CustomDateTimeInput v-model="choosedValue.dateTime" :required="{ date: true, time: true }"/>
      <CustomInput v-model:value="choosedValue.location" placeholder='Ubicación' :required='true'/>
      <CustomInput v-model:value="choosedValue.league" placeholder='League'/>
    </div>
    <div class='row toggle'>
      <ToggleSlider  :checked="choosedValue.friendly" @toggled="choosedValue.friendly = !choosedValue.friendly"/>
      <label class='label__inline'>Amistoso</label>
    </div>
  </AddEditData>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import CustomDateTimeInput from '@/components/CustomDateTimeInput.vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import { getMonthNameByNumber } from '@/services/util/time.js'
import { submitForm, removeElement } from '@/services/util/universal.js'
import AddEditData from '@/components/AddEditData.vue'
import Table from '@/components/table/Table.vue'

const store = useStore()

const isEditing = ref(false)
const choosedValue = ref(undefined)
const showBy = ref('Todo')

onMounted( () => { store.dispatch('fetchMatches')})

const matches = computed( () => {
  if (showBy.value === 'Semana') return store.getters.getMatchesOf('week')
  if (showBy.value === 'Mes') return store.getters.getMatchesOf('month')
  if (showBy.value === 'Temporada') return store.getters.getMatchesOf('season')
  return store.getters.getMatches
})

async function submit(){
  if (await submitForm(isEditing.value ? 'updateMatch' : 'addMatch', choosedValue.value)) setState(undefined)
}
function setState(val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.row {
  display: flex;
  gap: 14px;
  &.details {
    flex-direction: column;
  }
}
.table-row {
  // max 400px - 110 + 2fr
    grid-template-columns: 50px repeat(2, minmax(60px, 1fr)) minmax(40px, 1fr) minmax(80px, .5fr) minmax(40px, .5fr) 40px;
}
.title,
.team,
.gender,
.date, .date *,
.time {
  margin-bottom: .1em;
  font-size: inherit;
  text-align: center;
}
.team,
.gender {
  font-size: .8em;
}
.gender {
  color: rgba($blueDark, .4);
}
.date {
  .year {
    display: none;
  }
}
.team,
.gender,
.time,
.type {
  font-weight: 300;
}

.team {
  display: inline-block;
  width: max-content;
  vertical-align: middle;
  text-align: center;
  input, select {
    margin-bottom: .5rem;
  }
}
.toggle {
  display: flex;
  align-items: center;
}

@media (min-width: 740px) {
  .table-row {
    // max 400px - 60 + 120 + 40 + 80 + 40 + 50
    grid-template-columns: 60px repeat(2, minmax(60px, 1fr)) minmax(40px, 1fr) minmax(80px, .5fr) minmax(40px, .5fr) 50px;
  }
  .team,
  .gender {
    font-size: 1em;
  }
  .date {
    .year {
      display: initial;
    }
  }
}
</style>