<template>
  <div class="home">
    <section id="hero">
        <img class="logo" src="@/assets/images/teams/la-coracha.png" alt="laCoracha-logo"/>
        <h1 class="hero__header">Pasión Voleibol convertida en Club</h1>
        <p class="hero__description">no se requieren habilidades, te enseñaremos todo</p>
        <router-link to='/join' class="join_link btn color">
          <svg class="join_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            <g class="plus">
              <path d="M20 8V14" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 11H17" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
          Unirse
        </router-link>
    </section>
    <section>
      <div class='sectionHeader'>
        <h1 class='header'>Bienvenidos</h1>
      </div>
      <div class='sectionBody'>
        <p>Somos un club nacido en Málaga y con ganas de fomentar este pequeño y gran deporte en la capital. Llevamos tiempo con la necesidad de que Málaga Capital fundase un motor que diese alas al voleibol.</p>
        <p>Este club nace de una idea entre uno/as amigo/as enamorados de este deporte que queremos que perdure en el tiempo, y, aunque somos pequeños, deseamos que crezca para que llegue a cada persona que quiera disfrutar del voleibol en Málaga.</p>
        <p>Y sobretodo: APRENDER, JUGAR, Y LO MÁS IMPORTANTE, DIVERTIRSE!!!</p>
        <p>Nuestro logo es un homenaje a nuestra ciudad: Málaga.</p>
        <p>Somos La Coracha, algo que forma parte del ADN de esta ciudad, la muralla que une nuestra Alcazaba con el Castillo de Gibralfaro y que formaba el mayor conjunto defensivo de Al-Andalus. Estos elementos distintivos aparecen, por tanto, en nuestro logo.</p>
        <p>También hemos querido brindar un homenaje al nombre de nuestra ciudad, de casi 3.000 años de historia, y añadir las letras del nombre fenicio MALAKA</p>
        <p>El sol, que se transforma en balón para cualquier deporte, y el azul intenso de nuestro Mar Mediterráneo.</p>
      </div>
    </section>
    <section>
      <ClubCalendar />
    </section>
    <section>
      <SponsorsDisplay/>
    </section>
  </div>
</template>

<script setup>
import ClubCalendar from '@/components/calendar/ClubCalendar.vue'
import SponsorsDisplay from '@/components/SponsorsDisplay.vue'

</script>

<style lang="scss">
@import '@/colors.scss';
// Hero Section //
.join_link {
  color: $text--light;
  display: flex;
  align-items: center;
  &:hover .plus path {
    transform: translate(0, -.45em) scale(1.3);
    stroke: $decorative-attencion;
  }
  &:active .plus path {
    transform: none;
    stroke: $decorative-confirmation;
  }
  .join_icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 1ch;
    overflow: visible;
    path {
      transition: all ease-in-out .25s;
      stroke: $text--light;
      stroke-width: 2;
    }
  }
}
#hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $text--dark;
  height: 70vh;
}
.hero__header {
  text-align: center;
  font-weight: 900;
  line-height: .95em;
  max-width: 12ch;
  margin-top: 0;
  margin-bottom: .25em;
}
.hero__description {
  color: $text--dark-secondary;
  font-weight: 400;
  margin-bottom: 1rem;
  max-width: 22ch;
  text-align: center;
}
.logo {
  opacity: .2;
  position: absolute;
  z-index:-1;
  width: 90vw;
  height: auto;
}
@media only screen
and (orientation: landscape){
  #hero {
    height: 100vh;
  }
  .logo {
    width: 60vw;
  }
}
@media only screen
and (min-width: 740px){
}
@media only screen
and (min-width: 1070px){
  #header.underlay{
    //display: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  .logo{
    opacity: .1;
    width: 80vh;
  }
  #hero{
    height: 100vh;
  }
}
</style>
