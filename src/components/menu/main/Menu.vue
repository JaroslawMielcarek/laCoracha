<template>
  <div class="menu-bar">
    <TeamList :isOpen="isTeamsListOpen" @toggleMenu="isTeamsListOpen = !isTeamsListOpen"/>
    <div class="buttons buttons--left">
      <a class="icon facebook" href='https://m.facebook.com/people/La-Coracha-Perfil/100013615204865/'>
        <img src="@/assets/icons/facebook.svg" alt = "facebook icon" />
      </a>
      <a class="icon instagram" href='https://www.instagram.com/cd.lacoracha/'>
        <img src="@/assets/icons/instagram.svg" alt = "instagram icon" />
      </a>
    </div>
    <div class="buttons buttons--center">
      <CustomToolTip text='¡Mira nuestros equipos!' direction='bottom' :delay=3000 />
      <span class="icon teams"
        @click="toggleTeamsList()">
          <img src="@/assets/icons/team.svg" alt = "team icon" />
      </span>
    </div>
    <div class="buttons buttons--right">
        <a class="icon location" href='https://goo.gl/maps/17W6u6RBikHYzubV7'>
          <img src="@/assets/icons/googlePin.svg" alt = "googlePin icon" />
        </a>
        <a class="icon contact" href='https://wa.me/393497492300'>
          <img src="@/assets/icons/whatsapp.svg" alt = "whatsapp icon" />
        </a>
    </div>
  </div>
</template>

<script setup>
import CustomToolTip from '@/components/CustomToolTip.vue'
import TeamList from './TeamList.vue'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const isTeamsListOpen = ref(false)

onMounted( () => { store.dispatch('fetchTeams'); console.log('menu mounted')})

function toggleTeamsList () { isTeamsListOpen.value = !isTeamsListOpen.value }

</script>

<style lang="scss" scoped>
  @import '@/colors.scss';

.menu-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 44px;
    display: flex;
    padding: 0 1rem;
    z-index: 10;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: .85;
        z-index: -1;
        background-color: $white;
        backdrop-filter: blur(10px);
    }
    .buttons {
        display: flex;
        justify-content: space-around;
        vertical-align: middle;
        position: relative;
    }
    .buttons--left,
    .buttons--right {
        flex: 1;
    }
    .buttons--center {
        flex: 1.5;
    }
}
.icon {
    display: inline-block;
    width: 52px; // 10px + 32px + 10px
    height: 32px;
    padding: 0 10px;
    margin: auto 5px;
    cursor: pointer;
    &.teams {
        width: 74px; // 10px + 54px + 10px
        &:hover svg>*,
        &:focus svg>* {
            stroke: $blueDark;
        }
    }
    &:hover svg>*,
    &:focus svg>*{
        stroke: $black;
    }
}

@media only screen and (min-device-width: 992px) {
  .menu-bar {
    padding: 0 20vw;
    .buttons--left,
    .buttons--right {
      flex: 1.2 1;
    }
  }
}
</style>
