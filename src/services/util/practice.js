import { isBeforeToday } from './time'

export function checkIfPracticeAvailable (practice, player, isParticipating) {
  const isFuture = !isBeforeToday(practice.dateTime.date)
  const strikes = parseInt(player.practices.strikes.qty)
  const isAllowed = (strikes < 3) ? true : isParticipating
  return (isFuture && isAllowed)
}
export function isInQueue (player, practice) {
  if (!practice) return false
  return !!practice.playersInQueue.find(p => p._id.toString() === player._id)
}