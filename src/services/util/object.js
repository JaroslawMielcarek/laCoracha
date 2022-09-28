export function isEmptyObject (obj) {
  return obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
}

/**
 *
 * @param {Array} list
 * @param {String} property
 * @param {Boolean} descending
 * @param {Boolean} numeric
 * @returns {Array}
 */


export function sortListOfObjectsBy (list, property, descending = false, numeric = false) {
  const newList = [...list]
  newList.sort(
    (a, b) => {
      const valA = (typeof a[property] === 'object' && 'value' in a[property]) ? a[property].value : a[property]
      const valB = (typeof b[property] === 'object' && 'value' in a[property]) ? b[property].value : b[property]
      return valA.toString().localeCompare(valB.toString(), 'en', {numeric: numeric})
    }
  )
  return descending ? newList.reverse() : newList
}

// export function sortByString(list, property, descending = false, numeric = false) {
//   list.sort(
//     (a, b) => {
//       const valA = (typeof a[property] === 'object' && 'value' in a[property]) ? a[property].value : a[property]
//       const valB = (typeof b[property] === 'object' && 'value' in a[property]) ? b[property].value : b[property]
//       console.log('a b', property, '0'.localeCompare('-160',undefined,{numeric: numeric}), valA, valB)
//       return valA.toString().localeCompare(valB.toString(), 'en', {numeric: numeric})
//     }
//   )
//   return descending ? list.reverse() : list
// }
// export function sortByNumber(list, numberLocation, descending = false) {
//   return list.sort(
//     (a, b) => {
//       const valA = a[numberLocation]
//       const valB = b[numberLocation]
//       return descending ? valB - valA : valA - valB
//     }
//   )
// }

export function sortByDate (list, dateLocation, descending = false) {
  const newList = [...list]
  return newList.sort(
    (a, b) => {
      const valA = a[dateLocation].date.split('-').join('')
      const valB = b[dateLocation].date.split('-').join('')
      return (descending ? -1 : 1) * valA.localeCompare(valB)
    }
  )
}

export function getByTimeRange (list, range) {
  const currDay = new Date(new Date().setHours(0, 0, 0, 0))
  const currMonth = currDay.getMonth()
  const currYear = currDay.getFullYear()

  if (range === 'week') {
    const firstDayOfWeek = new Date(currDay.setDate(currDay.getDate() - currDay.getDay() + 1))
    const lastDayOfWeek = new Date(currDay.setDate(currDay.getDate() - currDay.getDay() + 8))
    return list.filter(e => firstDayOfWeek <= new Date(e.dateTime.date) && new Date(e.dateTime.date) <= lastDayOfWeek)
  }
  if (range === 'month') {
    return list.filter(e => (new Date(e.dateTime.date)).getMonth() === currMonth && new Date(e.dateTime.date).getFullYear() === currYear)

  }
  if (range === 'season') {
    let firstDayOfSeason = 0
    let lastDayOfSeason = 7
    if (currMonth < 6) {
      // its almost end of season
      // season starts on 1st September
      firstDayOfSeason = new Date(currYear - 1, 9, 1)
      // season ends on 30th June
      lastDayOfSeason = new Date(currYear, 7, 1)
    } else {
      // season will start or already started
      // season starts on 1st September
      firstDayOfSeason = new Date(currYear, 8, 1)
      // season ends on 30th June
      lastDayOfSeason = new Date(currYear + 1, 7, 1)
    }
    return list.filter(e => firstDayOfSeason <= new Date(e.dateTime.date) && new Date(e.dateTime.date) <= lastDayOfSeason)
  }
}