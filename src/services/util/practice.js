import { isBeforeToday } from './time'

export function checkIfPracticeAvailable (practice, player, isParticipating) {
  const isFuture = !isBeforeToday(practice.dateTime.date)
  const strikes = parseInt(player.practices.strikes.qty)
  const isAllowed = (strikes < 3) ? true : isParticipating
  return (isFuture && isAllowed)
}
export function isInQueue (player, practice) {
  if (!practice) return false
  return !!practice.playersInQueue.find(p => p.id === player.id)
}
// export function calculatePercentOcupied (practice) {
//   practice.percentOcupied = parseFloat((100 / practice.playersLimit) * practice.playersSubscribed).toFixed(2)
// }
// export function hasPlayer (practice, player) {
//   for (const [position, value] of Object.entries(practice.players)) {
//     const idx = value.subscribed.findIndex(v => v.id === player.id)
//     if (idx !== -1) return { position: position, index: idx }
//   }
//   return false
// }
// export function decreasePlayerPractice (player, position) {
//   const practices = player.practices
//   if (practices.attended > 0) practices.attended--
//   if (practices.positionsPlayed[position] && practices.positionsPlayed[position] > 0) practices.positionsPlayed[position]--
//   console.log('player after decrease practice', player)
//   return player
// }
// export function increasePlayerPractice (player, position) {
//   const practices = player.practices
//   practices.attended++
//   practices.positionsPlayed[position]++
//   // console.log('player after increase practice', player)
//   return player
// }
// export function togglePlayerInPractice (practice, player) {
//   const exist = hasPlayer(practice, player)
//   if (exist) {
//     practice.players[exist.position].subscribed.splice(exist.index, 1)
//     console.log('has player', player, practice.players[exist.position])
//     practice.playersSubscribed -= 1
//     // calculatePercentOcupied(practice)
//     this.$store.dispatch('updatePlayer', decreasePlayerPractice(player, exist.position))
//     return { isSuccess: true, message: 'Removed from practice' }

//   // remove player
//   } else {
//     console.log('doesnt has player', player)
//     if (practice.playersSubscribed === practice.playersLimit) return { isSuccess: false, message: 'There is no space' }
//     if (!player.preferedPositions) return { isSuccess: false, message: 'This player doesnt have preferences' }
//     for (const pos of player.preferedPositions) {
//       const position = pos.choosen
//       if (practice.players[position].subscribed.length < practice.players[position].limit) {
//         const { id, nick, practices, preferedPositions } = player
//         const basicInfPlayer = { id, nick: { value: nick.value }, practices, preferedPositions }
//         practice.players[position].subscribed.push(basicInfPlayer)
//         practice.playersSubscribed += 1
//         // calculatePercentOcupied(practice)
//         this.$store.dispatch('updatePlayer', increasePlayerPractice(player, position))
//         return { isSuccess: true, message: `Added to Practice on position ${position}` }
//       }
//     }
//     // there is no space in prefered positions in all available teams
//     return { isSucces: false, message: 'There is no space in positions you prefer. Change your preferences and try again' }
//   }
// }
// export function setLimits (practice) {
//   const { playersLimit, players } = practice
//   // practice.players = {
//   //   EXT: {
//   //     subscribed: practice.players.EXT.subscribed.slice(0, (playersLimit / 6) * 2),
//   //     limit: (playersLimit / 6) * 2
//   //   },
//   //   OP: {
//   //     subscribed: practice.players.OP.subscribed.slice(0, playersLimit / 6),
//   //     limit: playersLimit / 6
//   //   },
//   //   LIB: {
//   //     subscribed: practice.players.LIB.subscribed.slice(0, playersLimit / 6),
//   //     limit: playersLimit / 6
//   //   },
//   //   CO: {
//   //     subscribed: practice.players.CO.subscribed.slice(0, playersLimit / 6),
//   //     limit: playersLimit / 6
//   //   },
//   //   CE: {
//   //     subscribed: practice.players.CE.subscribed.slice(0, playersLimit / 6),
//   //     limit: playersLimit / 6
//   //   }
//   // }
//   const sparePlayersList = []
//   for (const [position, value] of Object.entries(players)) {
//     (position === 'EXT')
//       ? value.limit = (playersLimit / 6) * 2
//       : value.limit = playersLimit / 6
//     // console.log('slice', value.subscribed, value.subscribed.splice(value.limit))
//     // sparePlayer = [...sparePlayer, ...value.subscribed.splice(value.limit)]
//     for (const player of value.subscribed.slice(value.limit)) {
//       // we remove player from practice
//       const result = this.togglePlayerInPractice(practice, player)
//       // this.$store.dispatch('updatePractice', practice)
//       console.log('result of toggle', result)
//       // we add again player if have alternative position which is available
//       const result2 = this.togglePlayerInPractice(practice, player)
//       // this.$store.dispatch('updatePractice', practice)
//       console.log('result of toggle2', result2)
//       if (!result2.isSucces) sparePlayersList.push(player)
//     }
//   }
//   if (!sparePlayersList.length) return
//   practice.sparePlayers = sparePlayersList
//   console.log('sparePlayers', sparePlayersList)
//   // Now we have sparePlayers to manage
// }
