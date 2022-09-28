<template>
<div class = 'banner__wrapper'>
    <router-link to='/' class='tab home__banner'>
        <div class='avatar'>
            <img src='@/assets/images/home.svg' alt="home"/>
        </div>
    </router-link>
    <div :class ="['tab', 'user__banner', {open: isOpen, logged: isLogged}]">
        <CustomToolTip :text="isLogged ? 'You can log out' : ' You can log in'" direction='right'/>
        <div className = 'avatar'
            @click=" toggleIsOpen() " >
            <img src='@/assets/images/profileMan.svg' alt = "Player avatar" />
        </div>
        <router-link to='/' v-if="isLogged"><button class='btn white' @click=" logout()"> logout </button></router-link>
        <router-link to='/login' v-else><button class= 'btn color' @click=" login()"> login </button></router-link>
    </div>
    <router-link to='/settings' v-if="isLogged" class='tab settings__banner'>
        <CustomToolTip text='Revisa tu perfil' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/edit-profile.svg' alt="profile"/>
        </div>
    </router-link>
    <router-link to='/practice' v-if="isLogged" class = 'tab settings__banner'>
        <CustomToolTip text='Quedadas' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/calendar.svg' alt="calendar"/>
        </div>
    </router-link>
    <router-link to='/moderator' v-if="isLogged && isModerator" class='tab moderator__banner'>
        <CustomToolTip text='Moderator poder' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/settings.svg' alt="settings"/>
        </div>
    </router-link>
    <router-link to='/finances' v-if="isLogged && isAdmin" class='tab settings__banner'>
        <CustomToolTip text='Condiciones financieras' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/dolar.svg' alt="settings"/>
        </div>
    </router-link>
    <router-link to='/permissions' v-if="isLogged && isAdmin" class='tab settings__banner'>
        <CustomToolTip text='Permisos otorgados a los usuarios' direction='right' :delay=1500 />
        <div class='avatar'>
            <img src='@/assets/images/permission.svg' alt="settings"/>
        </div>
    </router-link>
</div>
</template>

<script>
import CustomToolTip from '@/components/CustomToolTip.vue'

export default {
  name: 'TabMenu',
  components: {
    CustomToolTip
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleIsOpen () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        const timeOut = setTimeout(() => {
          this.isOpen = false
          clearTimeout(timeOut)
        }, 3600)
      }
    },
    logout () {
      console.log('Logout')
      this.$router.push({ path: '/' })
      this.$store.dispatch('logout')
      this.toggleIsOpen()
    },
    login () {
      this.toggleIsOpen()
    }
  },
  computed: {
    isLogged () { return this.$store.getters.getStatus },
    userRoles () { return this.$store.getters.getUserRoles },
    isModerator () { return this.userRoles && this.userRoles.includes('ROLE_MODERATOR') },
    isAdmin () { return this.userRoles && this.userRoles.includes('ROLE_ADMIN') }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.banner__wrapper{
    position: fixed;
    z-index: 100;
    left: 100vw; // right: 0;
    top: 20px;
}
.tab{
    display: flex;
    flex-direction: row;
    margin-bottom: 4px;
    align-items: center;
    background-color: $white;
    box-shadow: 2px 2px 10px rgba($blueDark, .2);
    border: 1px solid #000000;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 4px 0;
    position: relative;
    width: 158px;
    left: -48px;
    transition: .6s ease-in-out;
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
.user__banner{
    &.open{
        left: -158px;
    }
    &.logged{
        background-color: $blueDark;
        border-color: $white;
    }
}
.settings__banner {
    width: 48px;
}
.moderator__banner {
    margin-top: 24px;
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
</style>
