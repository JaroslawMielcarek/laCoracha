<template>
  <div id='teamsList' :class="{ 'open': props.isOpen }" >
    <div :class="[ 'teamsList__item first']" :style="{ height: setHeight() + 'px' }">
      <h2 class='header'>Equipos</h2>
    </div>
    <div v-if="!teams || !teams.length" class='teamsList__item no-teams'>
      <h4 v-if="fetchError" class='team__name'>{{ fetchError }}</h4>
      <h3 v-else class='team__name'>No hay equipos</h3>
    </div>
    <template v-for="team in teams" :key="team">
      <router-link :to="team.name" @click="setChoosenName(team.name)" :class="[ 'teamsList__item']" :style="{ height: setHeight(team.name) + 'px' }">
        <img class='team__logo' :src="getLogo(team)" alt='logo of team'/>
        <div class='team__details'>
          <h3 class='team__name'> {{ team.name }} </h3>
          <p :class="['team__gender',  {feminino: team.gender === 'Female', masculino: team.gender === 'Male'} ]" > {{ team.gender }} </p>
          <p class='team__league indended'> {{ team.league }} </p>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getLogo } from '@/composables/logo.js'

const emits = defineEmits(['toggleMenu'])
const props = defineProps({
  isOpen: {type: Boolean, default: false}
})

const store = useStore()
const choosen = ref(undefined)
const teams = computed( () => store.getters.getTeams.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0 )) )
const fetchError = computed( () => store.getters.getTeamsErrorMessage )

const windowHeight = ref(window.innerHeight)

function resiseHandler () { windowHeight.value = window.innerHeight }

onMounted( () => window.addEventListener('resize', resiseHandler))
onUnmounted( () => window.removeEventListener('resize', resiseHandler))

function setHeight (currentItem = '') {
  if(!choosen.value) return (windowHeight.value - 44)/(teams.value.length + 1) //return `calc((100vh - 44px)/${teams.value.length + 1})`
  if(currentItem === choosen.value) return windowHeight.value //'100vh'
  return 0
}

function setChoosenName (value) {
  choosen.value = value
  setTimeout(() => { 
    emits('toggleMenu')
    setTimeout(() => {
      choosen.value = undefined
    }, 1000)
  }, 2000)
}
</script>

<style lang="scss">
  @import '@/colors.scss';
  #teamsList {
    position: fixed;
    left: 0;
    right: 0;
    // top: 100vh;
    bottom: -200%;
    height: auto;
    transition: all .9s ease-in-out;
    z-index: -1;
    &.open{
      // top: 0;
        bottom: 44px;
    }
  }
  .teamsList__item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $grey;
    position: relative;
    transition: height .5s ease-in-out;
    height: 40px;
    overflow: hidden;
    color: inherit;
    &:visited{
      color: inherit;
    }
    &.first {
      box-shadow: 0 0 4px $blueDark;
      .header { 
        font-size: 1.6em;
        margin: 0;
        text-transform: uppercase;
      }
    }
    &.no-teams {
      color: $grey;
      background-color: $blueDark;
    }
    &:nth-child(2n){
      background-color: $blueDark;
      .team__name,
      .team__league{
          color: $white;
      }
    }
  }
  .team__logo { 
      width: auto;
      height: 100%;
      max-height: 64px;
      clip-path: circle(50% at center);
      margin: 4px 16px 4px 0;
   }
   .team__details {
    // min-width: 240px;
    min-height: 20px;
    max-height: 62%;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: 1fr 56px 10px;
    // justify-content: space-around;
    align-items: flex-start;
    overflow: hidden;
   }
  .team__name { 
    margin: 0;
    // font-size: clamp(1em, 1.2em, 2em);
  }
  .team__gender,
  .team__league {
    margin: 0;
  }
  .team__league {
    margin-left: 1.3em;
  }
  .team__gender { 
    font-weight: 600;
    text-transform: capitalize;
    color: $black;
    &::before{
      content: '';
      display: inline-block;
      width: .8em;
      height: .8em;
      border-radius: 50%;
      background: $black;
      background: linear-gradient(90deg, $female 0%, $male 100%);
      margin-right: .5em;
      position: relative;
      top: .125em;
    }
    &.feminino{
      color: $female;
      &::before{
          background: $female;
      }
    }
    &.masculino{
      color: $male;
      &::before{
          background: $male;
      }
    }
   }
 
  @media only screen and (min-device-height: 600px){
  }
  @media only screen and (min-device-height: 992px){

    .team__logo{
          max-height: 128px;
      }
    // .teamsList__item{
    //   height: 150px;
    //   .team__logo{
    //       width: 128px;
    //       height: 128px;
    //       clip-path: circle(64px at center);
    //   }
    // }
  }
  </style>
  