<template>
  <div :class="{ match: true, friendly: friendly, past: isFinished }">
    <div class='team home-team'>
      <img class='club__logo' :src=" getClubLogo('home') " :alt=" 'home team ' + getClubName('home') " />
      <h4 class='club__name'>{{ getClubName('home') }}</h4>
      <p class='team__name'>{{ getTeamName('home') }}</p>
      <p class='sets__result' v-if="isFinished">{{ getSetsResult('home') }}</p>
    </div>
    <div class='match-info'>
      <p class='league'>{{ league }}</p>
      <span class='versus'>VS</span>
      <p class='date'>{{ getMatchDate() }}</p>
      <p class='location'>{{ location }}</p>
      <p class='hour'>{{ getMatchTime() }}</p>
      <p v-if="friendly" class='friendly'>Friendly</p>
    </div>
    <div class='team guest-team'>
      <img class='club__logo' :src=" getClubLogo('guest') " :alt=" 'guest team ' + getClubName('guest') " />
      <h4 class='club__name'>{{ getClubName('guest') }}</h4>
      <p class='team__name'>{{ getTeamName('guest') }}</p>
      <p class='sets__result' v-if="isFinished">{{ getSetsResult('guest') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { isoDateToDayMonthYear } from '@/services/util/time.js'

const store = useStore()
const props = defineProps({
  league: {type: String, default: 'Not provided'},
  dateTime: {type: Object, default: {date: '', time: ''}}, 
  location: {type: String, default: 'Not provided'},
  friendly: {type: Boolean, default: true}, 
  homeTeam: {type: Object}, 
  guestTeam: {type: Object}
})

const isFinished = computed( () => {
  if (!props.dateTime.date) return false

  const difference = (new Date(props.dateTime.date) - new Date()) / (1000 * 60 * 60 * 24)
  return difference < 0
})

function getClubLogo (location) {
  if (!props[`${location}Team`].clubName) return require('@/assets/images/teams/default.svg')

  const fileName = props[`${location}Team`].clubName.toLowerCase().replaceAll(' ', '-')
  // look in settings
  const isRegistered = store.getters.getRegisterdClubs.find(c => c === fileName)
  return isRegistered ? require(`@/assets/images/teams/${fileName}.png`) : require('@/assets/images/teams/default.svg')
}

function getClubName (location) { return props[`${location}Team`].clubName || 'Not specified' }

function getTeamName (location) { return props[`${location}Team`].teamName || 'Not specified' }

function getMatchDate () { return props.dateTime.date ? isoDateToDayMonthYear(props.dateTime.date) : 'Not Specified' }

function getMatchTime () {
  if (!props.dateTime.time) return 'Not specified'
  const t = props.dateTime.time.split(':')
  const hours = parseInt(t[0])
  const minutes = parseInt(t[1])
  return (hours === 0 && minutes === 0) ? '- - : - -' : props.dateTime.time
}

function getSetsResult (location) {
  if (props[`${location}Team`].wonSets === 0) return 0
  if (!props[`${location}Team`].wonSets) return '-'
  return props[`${location}Team`].wonSets
}

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.match {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 16px;
  position: relative;
  z-index: 1;

  &::after{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 72px; // 32px mid of cirle then 8px + 32px padding
    bottom: 0;
    z-index: -1;
    background: $futureMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($futureMatch-primary, 1) 0%,
      rgba($futureMatch-secondary, 1) 100%
    );
    //Correct this microsoft colors- are wrong
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4c00ed",endColorstr="#7d36ff",GradientType=1);
  }

  &.friendly::after{
    background: $pastMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($friendlyMatch-primary, 1) 0%,
      rgba($friendlyMatch-secondary, 1) 100%
    );
  }
  &.past::after {
    background: $pastMatch-primary;
    background: -moz-linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba($pastMatch-primary, 1) 0%,
      rgba($pastMatch-secondary, 1) 100%
    );
  }
}
.team,
.match-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.team {
  min-width: 110px;
  user-select: none;
  filter: drop-shadow(0 0 20px rgba($greyDark, 0.1));
  .club__logo {
    width: 64px;
    height: 64px;
    padding: 8px;
    clip-path: circle(32px at center);
    margin-bottom: 8px;
    background-color: $white;
  }
  .club__name,
  .team__name,
  .sets__result {
    color: $text--light;
  }
  .club__name {
    text-transform: capitalize;
    // font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: .025em;
    max-width: 12ch;
  }
  .team__name {
    text-transform: uppercase;
    font-weight: 200;
  }
  .sets__result {
    font-size: 1.75rem;
    font-weight: 300;
    margin-top: .25em;
  }
}

.match-info{
  font-family: 'Lato', sans-serif;
  margin: 0 5vw;
  .league{
    min-height: 1.4rem;
  }
  .type{
    color: $text--dark-secondary;
  }
  .versus,
  .date,
  .location,
  .hour,
  .friendly {
    color: $text--light;
  }
  .versus{
    font-size: 3rem;
    line-height: 3rem;
    text-shadow: 0 0 2px $text--dark;
  }
  .location{
    font-weight: 200;
  }
}

@media only screen and (min-width: 1070px){
  .match::after {
    top: 88px; //mid of circle + 8px + 32px padding
  }

  .match-info {
    margin-top: 12px;
    .versus {
      font-size: 3.4rem;
    }
  }
  .team{
    .club__logo{
        width: 92px;
        height: 92px;
        clip-path: circle(46px at center);
    }
  }
}
@media only screen and (min-width: 1400px){
  .match::after {
    top: 104px; //mid of circle + 32px
  }
  .match-info {
    margin-top: 32px;
  }
  .team{
    .club__logo{
        width: 128px;
        height: 128px;
        clip-path: circle(64px at center);
    }
  }
}

</style>
