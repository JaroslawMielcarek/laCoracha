<template>
<div class='row'>
  <div class='filter'>
    <span>Mostrar: </span>
    <SelectInput :options="['Todo','EXT', 'OP', 'CO', 'LIB','CE']" v-model:value="showBy" placeholder="Eligue"/>
  </div>
  <div class='player_list'>
    <div v-for="player in players" :key="player._id">
      <div :class="['player_toggle', checkStrikes(player), checkIfSubscribed(player) ? 'checked' : '']"  @click="togglePlayer(player)">
        <p class='player_id'>{{ player.memberID }}</p>
        <p class='player_name'>{{ player.nick.value }}</p>
        <div class='prefPosition' v-if="player.preferedPositions">
          <p>Preferencia</p>
          <span v-for="position in player.preferedPositions" :key="position">{{ position.choosen }}</span>
        </div>
        <div class='practice_stats' v-if="player.practices && player.practices.attended">
          <div class='practice_positions' v-for="(value, position) in player.practices.positionsPlayed" :key="position">
            <span class='position_bar' :style="{ height: calcHeight(value, player.practices.attended) + 'px' }"/>
            <p>{{ position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, defineEmits, defineProps } from 'vue'
import SelectInput from '@/components/CustomSelectInput.vue'

const store = useStore()
const emit = defineEmits(['addPlayer', 'removePlayer'])
const props = defineProps({
  playersSubscribed: {type: Array, default: []}
})

const showBy = ref('Todo')

const players = computed( () => {
  const list = store.getters.getPlayers
  return (showBy.value === 'Todo')
    ? list
    : list.filter(player => {
        if (player.preferedPositions && player.preferedPositions.find(el => el.choosen === showBy.value)) return player
      })
})

function calcHeight (value, total) {
  return (!total)
    ? 0
    : (parseFloat((value * 100) / total).toFixed(0) * 0.01) * 20 // 20 is max-height of 20px
}

function togglePlayer (player) {
  // conditions to check before send
  // no: prefered positions
  const { _id, nick, preferedPositions } = player
  const basicInfPlayer = { _id: _id, nick: nick.permisionGranted ? nick.value : '', preferedPositions }
  checkIfSubscribed(player)
    ? emit('removePlayer', basicInfPlayer)
    : emit('addPlayer', basicInfPlayer)
}

function checkIfSubscribed (player) {
  return (!props.playersSubscribed.length)
    ? false
    : props.playersSubscribed.find(p => p._id === player._id)
}

function checkStrikes (player) {
  if (player.practices && player.practices.strikes) {
    if (player.practices.strikes.qty === 1) return 'single-strike'
    if (player.practices.strikes.qty === 2) return 'double-strike'
    if (player.practices.strikes.qty === 3) return 'tripple-strike'
  }
  return ''
}

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.position_bar {
  display: block;
  background-color: rgba($blueDark, .2);
}
.prefPosition {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: .2em 0;
  // margin-right: 1ch;
  // margin-bottom: 0;
  p, span {
    margin: 0;
    font-size: .8rem;
    line-height: 1rem;
  }
  p {
    width: 100%;
  }
}
.practice_stats {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  background-color: rgba($blueDark, .1);
  height: calc(20px + 1.2em);
  padding: .2em 0;
}
.practice_positions {
  display: inline-block;
  margin-right: 4px;
  p {
    font-size: 0.8em;
    line-height: 1em;
    margin-bottom: 0;
  }
  &:last-of-type {
    margin-right: 0
  }
}
.player_list {
  display: flex;
  flex-wrap: wrap;
}
.player_toggle {
  display: inline-block;
  width: 112px;
  height: 96px;
  background-color: $white;
  box-shadow: 0 0 2px rgba($blueDark, .4);
  // border: 1px solid rgba($blueDark, .4);
  border-radius: 4px;
  margin: 5px;
  padding: 2px;
  cursor: pointer;
  &:hover{
      // border: 1px dashed rgba($blueDark, .2);
      color: rgba($blueDark, .4)
  }
  &.single-strike,
  &.double-strike,
  &.tripple-strike {
    border-right: 2px solid red;
  }
  &.double-strike,
  &.tripple-strike {
    border-bottom: 2px solid red;
  }
  &.tripple-strike {
    border-left: 2px solid red;
    pointer-events: none;
    opacity: .4;
  }
  &.checked {
    background-color: rgba($blueDark, .4);
    // border: none;
    color: $white;
    .practice_stats{
      background-color: $white;
      color: initial;
    }
    &:hover{
        // border: 1px dashed $white;
        color: rgba($blueDark, .8);
    }
  }
  .player_name,
  .player_id {
    display: inline-block;
    margin-bottom: .1em;
  }
  .player_id {
    font-weight: 300;
    margin-right: 1ch;
  }
}
</style>
