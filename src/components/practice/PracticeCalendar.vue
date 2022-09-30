<template>
  <div class='container'>
    <div class='strikes' v-if="checkStrikes">
      <p>Tienes <b>{{checkStrikes.qty}}</b>/3 strikes!</p>
      <p v-if="checkStrikes.lastStrike">Último strike obtenido en <b>{{isoDateToDayMonthYear(checkStrikes.lastStrike)}}</b></p>
    </div>
    <div class='card'>
      <h3 class='month'>{{getMonthNameByNumber(new Date())}}</h3>
      <div class='day__names'>
        <div class='name' v-for='name in daysNames' :key="name">{{name}}</div>
      </div>
      <div class='calendar'>
        <div
          :class="['day',
            {
              [day.dayOfWeek]: !index,
              currentMonth: day.month === new Date().getMonth(),
              practice: day.practice,
              participate: checkIfParticipating(day.practice),
              inQueue: isInQueue(currentUser, day.practice),
              today: day.isToday
            }
          ]"
          @click="togglePracticeDetails(day)"
          v-for="(day, index) in days"
          :key="day">
          <p class='dayNumber'>{{day.day}}</p>
          <span class='practiceTime' v-if="day.practice">{{day.practice.dateTime.time}}</span>
          <span class='ocupationPercent' v-if="day.practice" :style="{ top: checkOcupation(day.practice) + '%' } "/>
        </div>
      </div>
      <div class='legend__container'>
          <p class='legend'>Libre</p>
          <p class='legend full'>Completa</p>
          <p class='legend subscribed'>Suscrito</p>
          <p class='legend inQueue'>En cola</p>
          <p class='legend current__day'>Hoy</p>
      </div>
    </div>
    <PracticeCalendarDetails v-if="practiceID" :value="practiceDetails" :isParticipating="checkIfParticipating(practiceDetails)" @closeDetails="handleClose()" />
  </div>
</template>

<script>
import { getDayOfWeek, getMonthNameByNumber, areEqualDates, isoDateToDayMonthYear } from '@/services/util/time.js'
import { isInQueue } from '@/services/util/practice.js'
import PracticeCalendarDetails from '@/components/practice/PracticeCalendarDetails.vue'
export default {
  components: {
    PracticeCalendarDetails
  },
  data () {
    return {
      practiceID: undefined,
      daysNames: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      socket: null
    }
  },
  created () {
    this.$store.dispatch('fetchPractices')
  },
  methods: {
    getDayOfWeek,
    getMonthNameByNumber,
    areEqualDates,
    isInQueue,
    isoDateToDayMonthYear,
    checkOcupation (practice) { return 100 - practice.percentOcupied },
    checkIfParticipating (practice) {
      if (!practice) return false
      return !!practice.players.find(p => p._id === this.currentUser._id)
    },
    handleClose () { this.practiceID = undefined },
    togglePracticeDetails (day) { if (day.practice) this.practiceID = (this.practiceID) ? undefined : day.practice._id }
  },
  computed: {
    practiceDetails () { return this.practicesAroundToday.find(p => p._id === this.practiceID) },
    currentUser () { return this.$store.getters.getUser },
    checkStrikes () {
      const player = this.currentUser
      if (!player || !player.practices) return false
      return player.practices.strikes
    },
    practicesAroundToday () { return this.$store.getters.getTwoWeeksAround('practices') },
    days () {
      const list = []
      const currDay = new Date(new Date().setHours(0, 0, 0, 0))
      const tempDay = new Date(currDay).setDate(currDay.getDate() - 14)
      const twoWeeksAfter = new Date(currDay).setDate(currDay.getDate() + 14)
      const practiceList = this.practicesAroundToday

      let loop = new Date(tempDay)
      while (loop <= twoWeeksAfter) {
        const practice = practiceList.find(p => areEqualDates(new Date(p.dateTime.date).setHours(0, 0, 0, 0), loop))
        list.push({
          day: new Date(loop).getDate(),
          dayOfWeek: getDayOfWeek(loop),
          month: new Date(loop).getMonth(),
          practice: practice,
          isToday: areEqualDates(new Date().setHours(0, 0, 0, 0), loop)
        })
        const newDate = loop.setDate(loop.getDate() + 1)
        loop = new Date(newDate)
      }
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';
.strikes {
  b {
    color: red;
  }
}
.card {
  box-shadow: 0 10px 40px $greySuperLight,  0 2px 4px rgba($blueDark, .4) ;
  border-radius: 4px;
  width: clamp(369px, 369px, 400px);
  margin: 2rem auto;
  .month {
    margin: 0.2em 0;
  }
}
.day__names,
.calendar {
  display: grid;
  grid-template-areas: "Monday Tuesday Wednesday Thursday Friday Saturday Sunday";
  grid-template-columns: repeat(7, 48px);
  column-gap: 4px;
  row-gap: 4px;
  padding: 4px;
}
.calendar {
  grid-template-rows: repeat(auto, 48px);
  border-top: 1px solid rgba($blueDark, .2);
  border-bottom: 1px solid rgba($blueDark, .4);
  background-color: rgba($greySuperLight, .1);
}
.day__names {
  padding: 0 4px;
  border-top: 1px solid rgba($blueDark, .4);
  background-color: rgba($greyLight, .1);
  .name {
    text-align: center;
  }
}
.day {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: rgba($black, .2);
  position: relative;
  overflow: hidden;
  pointer-events: none;

  &.participate{
      color: #f9f9f9;
      border: 2px solid $dangerous;
      .ocupancy{
          background-color: $blueLight;
      }
  }
  &.inQueue {
    border: 2px solid $blueDark;
  }
  * {
    margin: 0;
  }
  &:focus,
  &:active {
    border: 1px dashed;
    transition: .475s ease-in-out;
  }
  &.currentMonth {
    color: $black;
  }
  &.today {
    color: red;
    font-weight: 900;
  }
  &.practice {
    cursor: pointer;
    pointer-events: all;
    // border: 1px solid $blueDark;
    &::before {
      background-color: rgb(241, 188, 241);
    }
  }
  .practiceTime {
    font-size: .8em;
    color: rgba($black, .4);
  }
  &::before,
  .ocupationPercent {
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
    position: absolute;
  }
  .ocupationPercent {
    background-color: $blueLight;
  }
  &.Lunes {
    // grid-area: Monday;
    grid-column: 1;
  }
  &.Martes {
    // grid-area: Tuesday;
    grid-column: 2;
  }
  &.Miercoles {
    // grid-area: Wednesday;
    grid-column: 3;
  }
  &.Jueves {
    // grid-area: Thursday;
    grid-column: 4;
  }
  &.Viernes {
    // grid-area: Friday;
    grid-column: 5;
  }
  &.Sabado {
    // grid-area: Saturday;
    grid-column: 6;
  }
  &.Domingo {
    // grid-area: Sunday;
    grid-column: 7;
  }
}

.legend__container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 14px 10px;
  width: 100%;

  .legend{
    display: inline-flex;
    align-items: center;
    font-size: 0.8em;
    line-height: .8em;
    margin: 0;
    &::before{
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 1ch;
      border-radius: 50%;
      background-color: rgb(241, 188, 241);
    }
    &.full::before{
      background-color: $blueLight;
    }
    &.subscribed::before{
      background-color: inherit;
      border: 1px solid $dangerous;
    }
    &.inQueue::before {
      background-color: inherit;
      border: 1px solid $blueDark
    }
    &.current__day::before{
      content: '1';
      color: red;
      background-color: inherit;
      border-radius: 0;
    }
    &:last-of-type{
      margin-right: 0;
    }
  }
}
</style>
