<template>
  <div class='row' v-for="(day, dayName) in workingHours" :key='dayName'>
    <label class='day'> {{ day.label }}: </label>
    <div class='fromTill'>
      <select :value="prefHours[dayName].fromHour" @input="dispatch(dayName,'fromHour',$event.target.value)" @change="setEndHour(dayName, $event.target.value)">
        <option value='undefined' hidden>-- : --</option>
        <option value=''>-- : --</option>
        <option
          class='from'
          v-for='(time, index) in calcStartHours(day)'
          :key='index'
        >{{ time }}</option>
      </select>
      <span>-</span>
      <select :value="prefHours[dayName].tillHour" @input="dispatch(dayName,'tillHour',$event.target.value)">
        <option value='undefined' hidden>-- : --</option>
        <option value=''>-- : --</option>
        <option
          class='till'
          v-for='(time, index) in calcEndHours(day, prefHours[dayName], dayName)'
          :key="index"
        >{{ time }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { generateHoursArray } from '@/services/util/time.js'

export default {
  name: 'PreferedHours',
  methods: {
    generateHoursArray,
    dispatch (day, propName, value) {
      this.$store.dispatch('setPreferedHours', { day: day, values: { [propName]: value } })
    },
    setEndHour (dayName, startHour) {
      if (startHour === '') this.dispatch(dayName, 'tillHour', '') // day.tillHour = ''
      else if (startHour && !this.prefHours[dayName].tillHour) this.dispatch(dayName, 'tillHour', this.workingHours[dayName].endHour ? this.workingHours[dayName].endHour : this.$store.getters.getCloseHour)
    },
    calcStartHours (day) {
      const maxHour = new Date(`2020-01-01T${this.calcMaxStartHour(day)}:00`)
      const hour = new Date(`2020-01-01T${day.startHour ? day.startHour : this.$store.getters.getOpenHour}:00`)
      return this.generateHoursArray(hour, maxHour, 30)
    },
    calcMaxStartHour (day) {
      const endHour = day.endHour ? day.endHour.split(':') : this.$store.getters.getCloseHour.split(':')
      return `${parseFloat(endHour[0]) - day.timeSlot}:${endHour[1]}`
    },
    calcEndHours (day, d, dayName) {
      const maxHour = new Date(`2020-01-01T${day.endHour ? day.endHour : this.$store.getters.getCloseHour}:00`)
      const hour = new Date(`2020-01-01T${d.fromHour ? this.generateFromPlusSlot(day, d, dayName) : this.calcMinEndHour(day)}:00`)
      return this.generateHoursArray(hour, maxHour)
    },
    generateFromPlusSlot (day, d, dayName) {
      const hour = `${parseInt(d.fromHour.split(':')[0]) + day.timeSlot}:${d.fromHour.split(':')[1]}`
      if (d.tillHour && d.tillHour < hour) this.dispatch(dayName, 'tillHour', hour)
      return hour
    },
    calcMinEndHour (day) {
      const startHour = day.startHour ? day.startHour.split(':') : this.$store.getters.getOpenHour.split(':')
      return `${parseFloat(startHour[0]) + day.timeSlot}:${startHour[1]}`
    }
  },
  computed: {
    prefHours () { return this.$store.getters.getPreferedHours },
    workingHours () { return this.$store.getters.getWorkingHours }
  }
}
</script>
<style lang="scss" scoped>
.row {
  .day {
    margin-right: 1ch;
    min-width: 8ch;
    display: inline-block;
    text-align: right;
  }
  span {
    margin: auto 2ch;
  }
}
.fromTill {
  display: inline-flex;
}
input:invalid+.validity:after {
  content: '✖';
  padding-left: 5px;
  color: red;
}

input:valid+.validity:after {
  content: '✓';
  padding-left: 5px;
  color: green;
}
</style>
