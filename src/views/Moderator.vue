<template>
  <section>
    <h1>Moderator Area</h1>
    <Tabs>
      <Tab title="Calendario">
        <CalendarManager />
      </Tab>
      <Tab title="Equipos">
        <TeamsManager />
      </Tab>
      <Tab title="Jugadores">
        <PlayersManager />
      </Tab>
      <Tab title="Quedadas">
        <PracticeManager />
      </Tab>
    </Tabs>
  </section>
</template>

<script setup>
import CalendarManager from '@/components/moderator/match/CalendarManager'
import TeamsManager from '@/components/moderator/team/TeamsManager'
import PlayersManager from '@/components/moderator/player/PlayersManager'
import PracticeManager from '@/components/moderator/practice/PracticeManager.vue'
import Tab from '@/components/tabs/Tab.vue'
import Tabs from '@/components/tabs/Tabs.vue'


</script>