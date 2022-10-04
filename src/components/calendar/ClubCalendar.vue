<template>
  <div class="list__container">
    <div class='sectionHeader'>
      <h1 class='header'>Calendario</h1>
    </div>
    <h4>Partidos de esta <SelectInput :options="['semana', 'mes', 'temporada']" v-model:value="showBy" placeholder="choose"/></h4>
    <div class='list large' v-if="matches(showBy).length">
      <Match v-for="match in matches(showBy)"
        :league="match.league"
        :dateTime="match.dateTime"
        :location="match.location"
        :friendly="match.friendly"
        :homeTeam="match.homeTeam"
        :guestTeam="match.guestTeam"
        :key="match.date"
      />
    </div>
    <div class='list' v-else>
      <p v-if='isLoading' class='no-data'>Loading...</p>
      <p v-else-if='fetchError' class='no-data'>{{ fetchError }}</p>
      <p v-else class='no-data'>Puedes descansar, no hacemos nada en {{showBy === 'mes' ? 'este mes' : 'esta '+ showBy}}.</p>
    </div>
    <div class="legend__container">
      <p class="legend">Futuro</p>
      <p class="legend friendly">Amistoso</p>
      <p class="legend disputed">Disputado</p>
    </div>
  </div>
</template>

<script>
import Match from './Match.vue'
import SelectInput from '@/components/CustomSelectInput.vue'

export default {
  name: 'ClubCalendar',
  components: {
    Match,
    SelectInput
  },
  data () {
    return {
      showBy: 'semana'
    }
  },
  methods: {
    matches (showBy) {
      if (showBy === 'semana') return this.$store.getters.getMatchesOf('week')
      if (showBy === 'mes') return this.$store.getters.getMatchesOf('month')
      if (showBy === 'temporada') return this.$store.getters.getMatchesOf('season')
      return this.$store.getters.getMatches
    }
  },
  computed: {
    currWeekMatches () { return this.matches('week') },
    currMonthMatches () { return this.matches('month') },
    currSeasonMatches () { return this.matches('season') },
    isLoading () { return this.$store.getters.getMatchesLoadingState },
    fetchError () { return this.$store.getters.getMatchesErrorMessage }
  },
  mounted () {
    this.$store.dispatch('fetchMatches')
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
h4 {
  display: flex;
  .select {
    margin: 0 1ch 0 1ch;
  }
}
.list__container {
  margin-bottom: 40px;
}
.legend__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.list {
  max-height: 400px;
  padding: 30px 0 20px;
  margin-bottom: 10px;
  -webkit-box-shadow: inset 0px 0px 4px 0px rgba($blueDark,0.2);
  box-shadow: inset 0px 0px 4px 0px rgba($blueDark,0.2);
  overflow-y: scroll;
  background-color: transparent;
}
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
</style>