<template>
  <section class="grid-layout">
    <div class="grid-header"> 
      <h2>Quedadas</h2>
      <p class='extra-message'>Aquí encontrarás quedadas este mes y tu historial</p>
    </div>
    <div class='flex-column-container ' id="practice-player-data">
      <h3>Tus quedadas</h3>
      <PracticePlayerData />
    </div>
    <div class='flex-column-container ' id="practice-calendar">
      <h3>Calendario</h3>
      <PracticeCalendar/>
    </div>
  </section>
</template>

<script setup>
import PracticeCalendar from '@/components/practice/PracticeCalendar.vue'
import PracticePlayerData from '@/components/practice/PracticePlayerData.vue'

</script>


<style lang="scss" scoped>
@import '@/colors.scss';

@media only screen and (min-width: 992px){
  .grid-layout {
    display: grid;
    grid-template: 
      "top top"
      "data calendar";
    gap: 0 20vmin;
    justify-content: flex-start;
  }

  .grid-header {
    grid-area: top;
  }
  #practice-player-data {
    grid-area: data;
    max-width: 300px;
  }
  #practice-calendar {
    grid-area: calendar;
  }
}
</style>