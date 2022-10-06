<template>
  <div class = 'banner__wrapper'>
    <div class="hamburger__banner tab" @click='isToggled = !isToggled'>
        <div :class="['hamburger',{open: isToggled}]">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div :class="['home__banner', {visible: isVisible}]">
        <router-link to='/' class='tab'>
            <div class='avatar'>
                <img src='@/assets/images/home.svg' alt="home"/>
            </div>
        </router-link>
    </div>
    <div :class ="['login__banner', 'tab', {visible: isVisible, open: isOpen, logged: isLogged}]">
        <CustomToolTip :text="isLogged ? 'You can log out' : ' You can log in'" direction='right'/>
        <div className = 'avatar'
            @click=" toggleIsOpen() " >
            <img :src="getAvatar" alt = "Player avatar" />
        </div>
        <router-link to='/' v-if="isLogged"><button class='btn white' @click=" logout()"> logout </button></router-link>
        <router-link to='/login' v-else><button class= 'btn color' @click=" login()"> login </button></router-link>
    </div>
    <div :class="['user__banner', {visible: isVisible}]">
      <router-link to='/settings' v-if="isLogged" class='tab'>
          <CustomToolTip text='Revisa tu perfil' direction='right' :delay=1500 />
          <div class='avatar'>
              <img src='@/assets/images/edit-profile.svg' alt="profile"/>
          </div>
      </router-link>
      <router-link to='/practice' v-if="isLogged" class = 'tab'>
          <CustomToolTip text='Quedadas' direction='right' :delay=1500 />
          <div class='avatar'>
              <img src='@/assets/images/calendar.svg' alt="calendar"/>
          </div>
      </router-link>
    </div>
    <div :class="['moderator__banner', {visible: isVisible}]">
      <router-link to='/moderator' v-if="isLogged && isModerator" class='tab'>
        <CustomToolTip text='Moderator poder' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/settings.svg' alt="settings"/>
        </div>
      </router-link>
    </div>
    <div :class="['admin__banner', {visible: isVisible}]">
      <router-link to='/finances' v-if="isLogged && isAdmin" class="tab" >
          <CustomToolTip text='Condiciones financieras' direction='right' :delay=1500 />
          <div class='avatar'>
              <img src='@/assets/images/dolar.svg' alt="finances"/>
          </div>
      </router-link>
      <router-link to='/permissions' v-if="isLogged && isAdmin" class='tab'>
          <CustomToolTip text='Permisos otorgados a los usuarios' direction='right' :delay=1500 />
          <div class='avatar'>
              <img src='@/assets/images/permission.svg' alt="permissions"/>
          </div>
      </router-link>
    </div>
  </div>
</template>
  
<script setup>

  import CustomToolTip from '@/components/CustomToolTip.vue'
  import {useStore} from 'vuex'
  import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
  import { useRouter } from 'vue-router';

  const store = useStore()
  const router = useRouter()

  const userRoles = computed( () => store.getters.getUserRoles )
  const isModerator = computed( () => userRoles.value && userRoles.value.includes('ROLE_MODERATOR') )
  const isAdmin = computed( () => userRoles.value && userRoles.value.includes('ROLE_ADMIN') )
  const isFemale = computed( () => store.getters.getUserGender )
  
  // Avatar
  const isLogged = computed( () => store.getters.getStatus )
  const getAvatar = computed( () => isLogged.value && isFemale.value ? require('@/assets/images/profileWoman.svg') : require('@/assets/images/profileMan.svg') )
  
  // Login banner
  const isOpen = ref(false)

  function toggleIsOpen () {
    isOpen.value = !isOpen.value
    if (!isOpen.value) return null

    const timeOut = setTimeout(() => {
      isOpen.value = false
      clearTimeout(timeOut)
    }, 3600)
  }

  function logout () {
    router.push({ path: '/' })
    store.dispatch('logout')
    toggleIsOpen()
  }

  function login () { toggleIsOpen() }

  // Visibility of the tab menu
  onMounted( () => {
    window.addEventListener('resize', setWindowSize)
    isAlwaysOn(isToggled.value)
  })
  onUnmounted( () => window.removeEventListener('resize', setWindowSize))

  const isToggled = ref(false)
  const isVisible = ref(true)
  const wHeight = ref(window.innerHeight)
  const wWidth = ref(window.innerWidth)

  watch(isToggled, (val) => isAlwaysOn(val) )

  function setWindowSize () {
    wHeight.value = window.innerHeight
    wWidth.value = window.innerWidth
    isAlwaysOn(isToggled.value)
  }

  function isAlwaysOn (val) {
    isVisible.value = ( wHeight.value < 992 && wWidth.value < 600 ) || ( wHeight.value < 600 && wWidth.value < 992 )  ? val : true 
  }

  </script>
  
  <style lang="scss" scoped>
  @import '@/colors.scss';
  
  $tab_height: 44px;
  $gap_between_category: 16px;
  $gap_between_elements: 2px;

  .banner__wrapper{
    position: fixed;
    display: grid;
    z-index: 100;
    left: calc(100vw - 48px);
    top: $tab_height + $gap_between_category + 20px;
    
    // select all children
    & > * {
      grid-area: -1/-1
    }
    & > *:not(.hamburger__banner) {
      opacity: 0;
      transition: .6s ease-in-out;
    }
    .visible {
      opacity: 1;
    }
  }
  .hamburger {
    width: 32px;
    height: 32px;
    padding: 7px 4px;
    margin: 0 8px;
    span{
      display: block;
      width: 24px;
      height: 4px;
      margin-bottom: 3px;
      position: relative;
      
      background: rgba($blueDark, .8);
      border-radius: 3px;
      
      z-index: 1;
      
      transform-origin: 0px 0px;
      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;
    }

    span:first-child{ transform-origin: 0% 0%; }

    span:nth-last-child(2){ transform-origin: 0% 100%; }
    &.open span{
      opacity: 1;
      transform: rotate(-45deg) translate(0px, 3px);
    }
    &.open span:nth-last-child(2){
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    &.open span:nth-last-child(3){
      transform: rotate(45deg) translate(3px, -4px);
    }
  }
  .visible {
    &.login__banner {
      transform: translate3d(0, $tab_height + $gap_between_elements, 0)
    }
    &.user__banner {
      transform: translate3d(0, ($tab_height * 2) + ($gap_between_category * 1), 0)
    }
    &.moderator__banner {
      transform: translate3d(0, ($tab_height * 4) + ($gap_between_category * 2), 0)
    }
    &.admin__banner {
      transform: translate3d(0, ($tab_height * 5) + ($gap_between_category * 3), 0)
    }
  }
    
  // $menu-items: 3;
  // @for $i from 1 through $menu-items{
  //   .visible.user__banner .tab:nth-child(#{$i}),
  //   .visible.admin__banner .tab:nth-child(#{$i}){
  //     transition-duration:90ms+(100ms*$i);
  //     transform:translate3d(0, ($gap_between_elements)*($i - 1),0);
  //   }
  // }
  .tab{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $white;
    box-shadow: 2px 2px 10px rgba($blueDark, .2);
    border: 1px solid $black;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 4px 0;
    width: 158px;
    height: $tab_height;
    transition: .6s ease-in-out;
    margin-bottom: $gap_between_elements;
    &.hamburger__banner {
      transform: translate3d(0, -($tab_height + $gap_between_category), 0);
      &:hover .hamburger * { background: $white }
    }
    &:last-child{
      margin-bottom: 0;
    }
    &:hover,
    &.router-link-active {
      background-color: rgba($blueDark, .8);
    }
    &.logged {
      &:hover {
        background-color: rgba($blueDark, .8);
      }
      .btn:hover {
        border: 1px solid $black;
      }
    }
  }
  .login__banner{
    &.open{
      transform: translate3d(-110px, $tab_height + $gap_between_elements, 0);
      left: -158px;
    }
    &.logged{
      background-color: $blueDark;
      border-color: $white;
    }
  }
  .avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 0 8px;
    cursor: pointer;
    clip-path: circle(16px);
    border-radius: 50%;
    border: 1px solid $blueDark;
    background-color: $white;
    img {
        width: 18px;
        height: 18px;
    }
    &:active,
    &:focus {
        transform: scale(1.1);
    }
  }
  .btn{
    width: 100px;
    margin-right: 10px;
    font-size: small;
    transition: all ease-in-out .2s;
  }

  @media screen and (max-device-width: 992px)  {
    $gap_between_category: 10px;
    $tab_height: 38px;
    .banner__wrapper {
      top: $tab_height + $gap_between_category + 20;
    }
    .tab {
      height: $tab_height;
    }
    .visible {
      &.login__banner {
        transform: translate3d(0, $tab_height + $gap_between_elements, 0)
      }
      &.user__banner {
        transform: translate3d(0, ($tab_height * 2) + ($gap_between_category * 1), 0)
      }
      &.moderator__banner {
        transform: translate3d(0, ($tab_height * 4) + ($gap_between_category * 2), 0)
      }
      &.admin__banner {
        transform: translate3d(0, ($tab_height * 5) + ($gap_between_category * 3), 0)
      }
    }
  }

  @media screen and (min-width: 992px),
        screen and (min-height: 992px) {

    .hamburger__banner {
      display: none;
    }
  }
  </style>
  