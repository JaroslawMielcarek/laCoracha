<template>
  <div class="team">
    <h2>{{ name }}</h2>
    <p v-if="team.description" class='extra__message'>{{ team.description }}</p>
    <p v-if="team.players"><b>{{team.players.length}}</b>/16 Jugador{{team.gender === 'Female' ? 'as' : 'es'}}</p>
    <section id = "playersList" :class="{ expanded: this.expanded }">
      <img class='gameField' src = "@/assets/images/field.svg" alt="field"/>
      <template v-for="(players, position) in scoredPlayers.mainPlayers" :key="position">
        <PlayerCard v-for="(player, index) in players" :pos=" !index ? position : `${position}-${index}`" :value="player.player" :key="player" @expandHeight="expandHeight" />
      </template>
      <div id = "reserves">
        <template v-for="(players, position) in scoredPlayers.reserves" :key="position">
          <PlayerCard class='reserve' v-for="(player, index) in players" :pos=" !index ? position : `${position}-${index}`" :value="player.player" :key="player" @expandHeight="expandHeight"/>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import PlayerCard from '@/components/playerCard/PlayerCard.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification } from '@/services/util/universal.js'
import PublicService from '@/services/public.service.js'

export default {
  components: {
    PlayerCard
  },
  data () {
    return {
      team: {},
      expanded: false,
    }
  },
  created () {
    this.fetchTeam(this.name)
  },
  watch: {
    // If we jump between teams fetch
    name () { if (this.name) this.fetchTeam(this.name) }
  },
  computed: {
    name () { return this.$route.params.teamName },
    scoredPlayers () {
      const divided = {}
      const list = this.team.players

      for (const index in list) {
        const player = list[index]
        const playerScore = this.calculatePlayerScore(player)
        const playerPosition = player.position

        if (!divided[playerPosition]) divided[playerPosition] = []

        if (!divided[playerPosition].length) divided[playerPosition].push({ player: player, score: playerScore })
        else {
          divided[playerPosition].push({ player: player, score: playerScore })
          divided[playerPosition] = sortListOfObjectsBy(divided[playerPosition], 'score', true, true)
        }
      }

      return {
        reserves: divided,
        mainPlayers: {
          Exterior: divided.Exterior ? divided.Exterior.splice(0, 2) : [],
          Central: divided.Central ? divided.Central.splice(0, 1) : [],
          Libero: divided.Libero ? divided.Libero.splice(0, 1) : [],
          Colocador: divided.Colocador ? divided.Colocador.splice(0, 1) : [],
          Opuesto: divided.Opuesto ? divided.Opuesto.splice(0, 1) : []
        }
      }
    }
  },
  methods: {
    setNotification,
    sortListOfObjectsBy,
    calculatePlayerScore (player) {
      const position = player.position || 'notSpecified'
      const performance = player.inTeamPerformance || this.$store.getters.getDefaultPlayer.inTeamPerformance
      const SCORE_WEIGHTS = {
        Exterior: { attack: 4, recieve: 5, set: 1, block: 2, serve: 3 },
        Colocador: { attack: 1, recieve: 3, set: 5, block: 2, serve: 4 },
        Central: { attack: 4, recieve: 2, set: 1, block: 5, serve: 3 },
        Libero: { attack: 2, recieve: 5, set: 4, block: 1, serve: 3 },
        Opuesto: { attack: 5, recieve: 2, set: 1, block: 4, serve: 3 },
        notSpecified: { attack: 0, recieve: 0, set: 0, block: 0, serve: 0 }
      }
      const attack = performance.attack.percent ? performance.attack.percent * SCORE_WEIGHTS[position].attack : 0
      const block = performance.block.percent ? performance.block.percent * SCORE_WEIGHTS[position].block : 0
      const recieve = performance.recieve.percent ? performance.recieve.percent * SCORE_WEIGHTS[position].recieve : 0
      const serve = performance.serve.percent ? performance.serve.percent * SCORE_WEIGHTS[position].serve : 0
      const set = performance.set.percent ? performance.set.percent * SCORE_WEIGHTS[position].set : 0
      return Math.round((attack + block + recieve + serve + set + Number.EPSILON) * 100) / 100
    },
    expandHeight(val) { this.expanded = val },
    fetchTeam (name) {
      PublicService.getTeam(name)
        .then(response => {
          this.team = response
        })
        .catch(error => {
          this.setNotification({
            name: 'Team page',
            text: error.response.data.message,
            typeOfNotification: 'danger'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';
#playersList{
    display: grid;
    grid-template-columns: repeat(10, 38px); // max 380
    grid-template-rows: 40px repeat(3, 48px) 108px repeat(2, 48px) 24px 96px; //max 400
    //background-color: beige;
    max-width: 380px;
    //max-height: 460px;
    margin: 0 auto;
    position: relative;
    grid-template-areas:
                          " . . . . . . . . . ."
                          " . . . . libero libero . . . ."
                          " . colocador colocador . libero libero . exterior exterior ."
                          " . colocador colocador . . . . exterior exterior ."
                        " . . . . . . . . . ."
                          " . exterior-1 exterior-1 . central central . opuesto opuesto ."
                          " . exterior-1 exterior-1 . central central . opuesto opuesto ."
                        " . . . . . . . . . ."
                          " reserve reserve reserve reserve reserve reserve reserve reserve reserve reserve";

  &.expanded {
    min-height: 600px;
  }
}
.gameField {
  position: absolute;
  width: 100%;
  height: auto;
    // grid-column: 1 / -1;
    // grid-row: 1 /-1;
}

.player[data-position='Colocador']{
    grid-area: colocador;
}
.player[data-position='Libero']{
    grid-area: libero;
}
.player[data-position='Exterior']{
    grid-area: exterior;
}
.player[data-position='Exterior-1']{
    grid-area: exterior-1;
}
.player[data-position='Central']{
    grid-area: central;
}
.player[data-position='Opuesto']{
    grid-area: opuesto;
}
.player[data-position='reserve']{
    grid-area: reserve;
}
#reserves{
    grid-area: reserve;
    display: flex;
    margin: 0 auto;
}
.reserve{
  display: inline-block;
    grid-area: reserve;
    width: 38px;
    margin-right: 10px;
    transition: width .3s ease-in-out;
    &:last-of-type {
      width: 72px;
    }
    &:hover{
        width: 72px;
    }
}
</style>
