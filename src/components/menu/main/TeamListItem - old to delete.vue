<template>
  <router-link :to="this.name" @click=" sendChoosenName() " :class="[ 'teamsList__item', {choosen: isChoosed, hidden: !isVisible}, size ]" :style="{ height: isVisible ?  `calc((100vh - 44px)/${size + 1})` : '0px' }">
    <img class='team__logo' :src="getClubLogo" alt='logo of team'/>
    <div class='team__details'>
      <h3 class='team__name'> {{ name }} </h3>
      <p :class="['team__gender',  {feminino: gender === 'Female', masculino: gender === 'Male'} ]" > {{ gender }} </p>
      <p class='team__league indended'> {{ league }} </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'TeamListItem',
  data () {
    return {
      isVisible: true
    }
  },
  props: {
    logo: {
      type: Object
    },
    name: {
      type: String
    },
    gender: {
      type: String,
      default: 'Mix'
    },
    league: {
      type: String,
      default: 'Not provided'
    },
    choosen: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sendChoosenName () {
      this.$emit('choosen', this.name)
      setTimeout(() => { this.$emit('backToDefault') }, 2000)
    }
  },
  computed: {
    isChoosed () { return this.choosen == this.name },
    // calcHeight () {
    //   if(this.isChoosed) return '100vh';
    //   if(!)
    // },
    getClubLogo () {
      if (!this.logo || !this.logo.data || !this.logo.contentType) return require('@/assets/images/teams/default.svg')
      return `data:image/${this.logo.contentType};base64,
                     ${this.logo.data.toString('base64')}`
    }
  },
  mounted () {
    // console.log('mounted', this.name)
  },
  beforeUpdate () {
    if (this.choosen === '' && !this.visible) this.isVisible = true
    if (this.choosen !== '' && this.choosen !== this.name) this.isVisible = false
  }
}
</script>

<style lang="scss">
@import '@/colors.scss';

.teamsList__item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $grey;
  position: relative;
  transition: height .5s ease-in-out;
  height: 40px;
  overflow: hidden;
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
  &.choosen{
    height: 100vh !important;
    background-color: $blueDark;
    .team__name,
    .team__league{
      color: $white;
    }
  }
  &.hidden{
    // height: 0 !important;
    overflow: hidden;
    // display: none;
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
    grid-area: logo;
 }
 .team__details {
  min-width: 240px;
  // display: flex;
  display: grid;
  grid-template-columns: 1fr 56px 10px;
  justify-content: space-around;
  align-items: center;
  grid-area: details;
  overflow: visible;
 }
.team__name { 
  margin: 0;
  font-size: clamp(1em, 1.2em, 2em);
}
.team__gender,
.team__league {
  // padding-left: 1ch;
  font-size: .8em;
  margin: 0;
}
.team__league { 
  // margin-left: 1.3em;
 }
.team__gender { 
  font-size: .8em;
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
// .teamsList__item {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   // min-height: 100px;
//   color: $black;
//   background-color: $grey;
//   position: relative;
//   transition: height .6s ease-in-out;
//   &.first {
//     box-shadow: 0 0 4px $blueDark;
//   }
//   p { margin: 0;}
//   a {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     width: 100%;
//   }
//   .header {
//     margin-bottom: 0.25em;
//     color: $greyDark;
//   }
//   &.no-teams {
//     color: $grey;
//     background-color: $blueDark;
//   }
//   &.mini{
//     height: 64px;

//     .team__logo{
//       width: 32px;
//       height: 32px;
//       clip-path: circle(16px at center);
//     }
//     .team__name{
//       font-size: 1.2rem;
//     }
//     .team__league,
//     .team__gender {
//       font-size: .8rem;
//     }
//   }
// }
// .teamsList__item{
//   //transition: transform .8s ease-in;
//   &.choosen{
//     height: 100vh;
//     background-color: $blueDark;
//     .team__name,
//     .team__league{
//       color: $white;
//     }
//   }
//   &.hidden{
//     height: 0;
//     overflow: hidden;
//     // display: none;
//   }
//   &:nth-child(2n){
//     background-color: $blueDark;
//     .team__name,
//     .team__league{
//         color: $white;
//     }
//   }
//   .indended{
//     padding-left: 1.5em;
//   }
//   .team__details {
//     max-height: 100%;
//   }
//   .team__logo{
//     width: 64px;
//     height: 64px;
//     clip-path: circle(32px at center);
//     margin: auto 40px auto 0;
//   }
//   .team__name,
//   .team__league{
//     color: $greyDark;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   .team__name {
//     margin: .5em auto .25em;
//   }
//   .team__gender{
//     margin: 0;
//     font-size: 1em;
//     font-weight: 600;
//     text-transform: capitalize;
//     color: $black;
//     &::before{
//       content: '';
//       display: inline-block;
//       width: 1em;
//       height: 1em;
//       border-radius: 50%;
//       background: $black;
//       background: linear-gradient(90deg, $female 0%, $male 100%);
//       margin-right: .5em;
//       position: relative;
//       top: .125em;
//     }

//     &.feminino{
//       color: $female;
//       &::before{
//           background: $female;
//       }
//     }
//     &.masculino{
//       color: $male;
//       &::before{
//           background: $male;
//       }
//     }
//   }
// }
@media only screen and (min-device-height: 600px){
  // .teamsList__item{
  //   height: 120px;
  //   .team__logo{
  //       width: 92px;
  //       height: 92px;
  //       clip-path: circle(46px at center);
  //   }
  // }
}
@media only screen and (min-device-height: 992px){
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
