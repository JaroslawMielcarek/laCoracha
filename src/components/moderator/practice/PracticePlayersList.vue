<template>
<div class='row'>
  <div class='filter'>
    <span>Show: </span>
    <SelectInput :options="['ALL','EXT', 'OP', 'CO', 'LIB','CE']" v-model:value="showBy" placeholder="choose"/>
  </div>
  <div class='player_list'>
    <div v-for="player in players" :key="player._id">
      <div :class="['player_toggle', checkStrikes(player), checkIfSubscribed(player) ? 'checked' : '']"  @click="togglePlayer(player)">
        <p class='player_id'>{{player.memberID}}</p>
        <p class='player_name'>{{player.nick.value}}</p>
        <div class='prefPosition' v-if="player.preferedPositions">
          <p>Preference</p>
          <span v-for="position in player.preferedPositions" :key="position">{{ position.choosen }}</span>
        </div>
        <div class='practice_stats' v-if="player.practices && player.practices.attended">
          <div class='practice_positions' v-for="(value, position) in player.practices.positionsPlayed" :key="position">
            <span class='position_bar' :style="{ height: calcHeight(value, player.practices.attended) + 'px'}"/>
            <p>{{position}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import SelectInput from '@/components/CustomSelectInput.vue'

export default {
  name: 'PracticePlayerList',
  emits: ['addPlayer', 'removePlayer'],
  components: {
    SelectInput
  },
  props: {
    playersSubscribed: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showBy: 'ALL'
    }
  },
  computed: {
    players () {
      const list = this.$store.getters.getPlayers
      if (this.showBy === 'ALL') return list

      return list.filter(player => {
        if (player.preferedPositions && player.preferedPositions.find(el => el.choosen === this.showBy)) return player
      })
    }
  },
  methods: {
    calcHeight (value, total) {
      if (total === 0) return 0
      // 20 is max-height of 20px
      return (parseFloat((value * 100) / total).toFixed(0) * 0.01) * 20
    },

    togglePlayer (player) {
      // conditions to check before send
      // no: prefered positions
      const { _id, nick, preferedPositions } = player
      const basicInfPlayer = { _id: _id, nick: nick.permisionGranted ? nick.value : '', preferedPositions }
      if (this.checkIfSubscribed(player)) this.$emit('removePlayer', basicInfPlayer)
      else this.$emit('addPlayer', basicInfPlayer)
    },

    checkIfSubscribed (player) {
      if (!this.playersSubscribed.length) return false
      return this.playersSubscribed.find(p => p._id === player._id)
    },

    checkStrikes (player) {
      if (player.practices && player.practices.strikes) {
        if (player.practices.strikes.qty === 1) return 'single-strike'
        if (player.practices.strikes.qty === 2) return 'double-strike'
        if (player.practices.strikes.qty === 3) return 'tripple-strike'
      }
      return ''
    }
  }
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
