<template>
  <section>
    <h1>Moderator Area</h1>
    <Tabs>
      <Tab title="Calendario">
        <p class='extra-message'>Administrar el calendario de partidos</p>
        <p v-if="fetchError.calendar" class="no-data">{{ fetchError.calendar }}</p>
        <CalendarManager v-else/>
      </Tab>
      <Tab title="Equipos">
        <p class='extra-message'>Administrar equipos de club</p>
        <p v-if="fetchError.teams" class="no-data">{{ fetchError.teams }}</p>
        <TeamsManager v-else/>
      </Tab>
      <Tab title="Jugadores"> 
        <p class='extra-message'>Administrar jugadores del club</p>
        <p v-if="fetchError.players" class="no-data">{{ fetchError.players }}</p>
        <PlayersManager v-else/>
      </Tab>
      <Tab title="Quedadas">
        <p class='extra-message'>Administrar el calendario de quedadas</p>
        <p v-if="fetchError.practices" class="no-data">{{ fetchError.practices }}</p>
        <PracticeManager v-else/>
      </Tab>
      <Tab title="Inscriptiones">
        <p class='extra-message'>Administrar inscripciones al club</p>
        <p v-if="fetchError.enrolled" class="no-data">{{ fetchError.enrolled }}</p>
        <EnrollmentManager v-else/>
      </Tab>
    </Tabs>
  </section>
</template>

<script setup>
import CalendarManager from '@/components/moderator/match/CalendarManager'
import TeamsManager from '@/components/moderator/team/TeamsManager'
import PlayersManager from '@/components/moderator/player/PlayersManager'
import PracticeManager from '@/components/moderator/practice/PracticeManager.vue'
import EnrollmentManager from '@/components/moderator/enrollment/EnrollmentManager.vue'
import Tab from '@/components/tabs/Tab.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'


const store = useStore()

const fetchError = computed(() => { 
  return {
    enrolled: store.getters.getEnrolledErrorMessage,
    calendar: store.getters.getMatchesErrorMessage,
    teams: store.getters.getTeamsErrorMessage,
    players: store.getters.getPlayersErrorMessage,
    practices: store.getters.getPracticesErrorMessage
  }
  
})
</script>