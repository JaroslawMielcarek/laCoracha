const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const WEEK_DAYS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  
export function generateHoursArray (hour, maxHour, slot) {
  const arr = []
  while (hour <= maxHour) {
    const hh = hour.getHours() < 10 ? `0${hour.getHours()}` : hour.getHours()
    const mm = hour.getMinutes() < 10 ? `0${hour.getMinutes()}` : hour.getMinutes()
    arr.push(`${hh}:${mm}`)
    hour = new Date(hour.setMinutes(hour.getMinutes() + slot))
  }
  return arr
}
export function isoDateToDayMonthYear (date) {
  if (!date) return 'not specified'
  const d = date.split('-')
  const day = d[2]
  const month = d[1]
  const year = d[0]
  return day && month && year ? `${day}/${month}/${year}` : '--/--/----'
}
export function getDayOfWeek (date) {
 return WEEK_DAYS[new Date(date).getDay()]
}
export function getMonthName (date) {
  return MONTHS[new Date(date).getMonth()]
}
export function areEqualDates (firstDate, secondDate) {
  const first = new Date(firstDate)
  const second = new Date(secondDate)

  if (first < second || first > second) return false
  return true
}
export function isBeforeToday (date) {
  return new Date(date) < new Date()
}
export function getAllMonths () {
  return [...MONTHS]
}
export function getAllWeekDays () {
  return [...WEEK_DAYS]
}
