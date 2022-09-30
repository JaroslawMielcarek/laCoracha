<template>
  <div>
    <h1>Moderator Area</h1>
    <p class='extra__message'>Here are moderator settings</p>
    <div>
      <CalendarManager />
      <TeamsManager />
      <PlayersManager />
      <PracticeManager />
    </div>
  </div>
</template>

<script>
import CalendarManager from '@/components/moderator/match/CalendarManager'
import TeamsManager from '@/components/moderator/team/TeamsManager'
import PlayersManager from '@/components/moderator/player/PlayersManager'
import PracticeManager from '@/components/moderator/practice/PracticeManager.vue'

export default {
  name: 'Moderator',
  components: {
    CalendarManager,
    TeamsManager,
    PlayersManager,
    PracticeManager
  },
}
</script>