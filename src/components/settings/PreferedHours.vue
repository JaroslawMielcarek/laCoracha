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

<script setup>
import { useStore } from 'vuex'
import { generateHoursArray } from '@/services/util/time.js'

const store = useStore()

const prefHours = store.getters.getPreferedHours
const workingHours = store.getters.getWorkingHours 

function dispatch (day, propName, value) {
  store.dispatch('setPreferedHours', { day: day, values: { [propName]: value } })
}
function setEndHour (dayName, startHour) {
  if (startHour === '') dispatch(dayName, 'tillHour', '') // day.tillHour = ''
  else if (startHour && !prefHours[dayName].tillHour) dispatch(dayName, 'tillHour', workingHours[dayName].endHour ? workingHours[dayName].endHour : store.getters.getCloseHour)
}
function calcStartHours (day) {
  const axHour = new Date(`2020-01-01T${calcMaxStartHour(day)}:00`)
  const hour = new Date(`2020-01-01T${day.startHour ? day.startHour : store.getters.getOpenHour}:00`)
  return generateHoursArray(hour, maxHour, 30)
}
function calcMaxStartHour (day) {
  const endHour = day.endHour ? day.endHour.split(':') : store.getters.getCloseHour.split(':')
  return `${parseFloat(endHour[0]) - day.timeSlot}:${endHour[1]}`
}
function calcEndHours (day, d, dayName) {
  const maxHour = new Date(`2020-01-01T${day.endHour ? day.endHour : store.getters.getCloseHour}:00`)
  const hour = new Date(`2020-01-01T${d.fromHour ? generateFromPlusSlot(day, d, dayName) : calcMinEndHour(day)}:00`)
  return generateHoursArray(hour, maxHour)
}
function generateFromPlusSlot (day, d, dayName) {
  const hour = `${parseInt(d.fromHour.split(':')[0]) + day.timeSlot}:${d.fromHour.split(':')[1]}`
  if (d.tillHour && d.tillHour < hour) dispatch(dayName, 'tillHour', hour)
  return hour
}
function calcMinEndHour (day) {
  const startHour = day.startHour ? day.startHour.split(':') : store.getters.getOpenHour.split(':')
  return `${parseFloat(startHour[0]) + day.timeSlot}:${startHour[1]}`
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
