<template>
  <div :class="{ match: true, friendly: friendly, past: isFinished }">
    <div class='team home-team'>
      <img class='club__logo' :src=" getClubLogo('home') " :alt=" 'home team ' + getClubName('home') " />
      <h3 class='club__name'>{{ getClubName('home') }}</h3>
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
      <h3 class='club__name'>{{ getClubName('guest') }}</h3>
      <p class='team__name'>{{ getTeamName('guest') }}</p>
      <p class='sets__result' v-if="isFinished">{{ getSetsResult('guest') }}</p>
    </div>
  </div>
</template>

<script>
import { isoDateToDayMonthYear } from '@/services/util/time.js'

export default {
  props: {
    league: {
      type: String,
      default: 'Not provided'
    },
    dateTime: {
      type: Object,
      default () { return { date: '', time: '' } }
    },
    location: {
      type: String,
      default: 'Not provided'
    },
    friendly: {
      type: Boolean,
      default: true
    },
    homeTeam: {
      type: Object
    },
    guestTeam: {
      type: Object
    }
  },
  computed: {
    isFinished () {
      if (!this.dateTime.date) return false
      const difference = (new Date(this.dateTime.date) - new Date()) / (1000 * 60 * 60 * 24)
      return difference < 0
    }
  },
  methods: {
    isoDateToDayMonthYear,
    getClubLogo (location) {
      if (!this[`${location}Team`].clubName) return require('@/assets/images/teams/default.svg')

      const fileName = this[`${location}Team`].clubName.toLowerCase().replaceAll(' ', '-')
      // look in settings
      const isRegistered = this.$store.getters.getRegisterdClubs.find(c => c === fileName)
      return isRegistered ? require(`@/assets/images/teams/${fileName}.png`) : require('@/assets/images/teams/default.svg')
    },
    getClubName (location) { return this[`${location}Team`].clubName || 'Not specified' },
    getTeamName (location) { return this[`${location}Team`].teamName || 'Not specified' },
    getMatchDate () { return this.dateTime.date ? isoDateToDayMonthYear(this.dateTime.date) : 'Not Specified' },
    getMatchTime () {
      if (!this.dateTime.time) return 'Not specified'
      const t = this.dateTime.time.split(':')
      const hours = parseInt(t[0])
      const minutes = parseInt(t[1])
      return (hours === 0 && minutes === 0) ? '- - : - -' : this.dateTime.time
    },
    getSetsResult (location) {
      if (this[`${location}Team`].wonSets === 0) return 0
      if (!this[`${location}Team`].wonSets) return '-'
      return this[`${location}Team`].wonSets
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.match {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5vh;
  padding-bottom: 3rem;
  padding-left: 2vw;
  padding-right: 2vw;
  position: relative;
  &:last-of-type {
    margin-bottom: 0;
  }
  &::after{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 3.5em;
    bottom: 0;
    z-index: -2;
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
  z-index: -1;
}
.team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    color: $white;
  }
  .club__name {
    text-transform: capitalize;
    font-size: 1.1em;
    margin-top: 0;
    margin-bottom: .025em;
    max-width: 12ch;
    text-align: center;
  }
  .team__name {
    font-size: .8em;
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 200;
  }
  .sets__result {
    font-size: 2.2em;
    font-weight: 300;
    margin: .75em 0 0 0;
  }
}

.match-info{
  font-family: 'Lato', sans-serif;
  margin: 0 5vw;
  text-align: center;
  .league{
    min-height: 1em;
  }
  .type{
    color: $greyLight;
  }
  .versus,
  .date,
  .location,
  .hour,
  .friendly {
    color: #fff;
    margin-bottom: .5em
  }
  .versus{
    font-size: 3rem;
    line-height: 3rem;
    text-shadow: 0 0 2px #000;
  }
  .location{
    font-weight: 200;
  }
}

@media only screen and (min-device-width: 600px){
  .match{
    justify-content: center;
    .matchInfo{
        margin: 0 10vw;
    }
  }
  .team{
    .team__logo{
        width: 92px;
        height: 92px;
        clip-path: circle(46px at center);
    }
  }
}
@media only screen and (min-device-width: 992px){
  .match{
      margin-bottom: 10vh;
  }
  .team{
    .team__logo{
        width: 128px;
        height: 128px;
        clip-path: circle(64px at center);
    }
    .team__type{
      font-weight: 100;
    }
  }
  .matchInfo{
    .location{
        font-weight: 100;
    }
  }
}

</style>
