<template>
  <div class='sectionHeader'>
    <h1 class='header'>Calendario</h1>
  </div>
  <div class='sectionBody'>
    <Table  category="partido" v-model:showBy="showBy" :filterOptions="['semana', 'mes', 'temporada', 'todo']">
      <template v-slot:body>
        <p v-if='isLoading' class='no-data'>Loading...</p>
        <p v-else-if='fetchError' class='no-data'>{{ fetchError }}</p>
          <Match v-for="match in matches(showBy)"
            :league="match.league"
            :dateTime="match.dateTime"
            :location="match.location"
            :friendly="match.friendly"
            :homeTeam="match.homeTeam"
            :guestTeam="match.guestTeam"
            :key="match.date"
          />
      </template>
    </Table>
    <div class="legendContainer">
      <p class="legend">Futuro</p>
      <p class="legend friendly">Amistoso</p>
      <p class="legend disputed">Disputado</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import Match from './Match.vue'
import Table from '@/components/table/Table.vue'

const store = useStore()
const showBy = ref('semana')

function matches (showBy) {
  if (showBy === 'semana') return store.getters.getMatchesOf('week')
  if (showBy === 'mes') return store.getters.getMatchesOf('month')
  if (showBy === 'temporada') return store.getters.getMatchesOf('season')
  return store.getters.getMatches
}

const isLoading = computed(() => { return store.getters.getMatchesLoadingState })
const fetchError = computed(() => { return store.getters.getMatchesErrorMessage })

onMounted( () => { store.dispatch('fetchMatches') })

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.legend {
  display: flex;
  align-items: center;

  &::before{
    content:'';
    width: 1em;
    height: 1em;
    margin-right: 2ch;

    background: $futureMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
  }
  &.friendly::before {
    background: $pastMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
  }
  &.disputed::before {
    background: $pastMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
  }
}

@media only screen and (min-width: 740px){
  .list {
    max-height: calc(4 * 75px);
    .large {
      max-height: calc(5 * 75px);
    }
  }
}
</style>