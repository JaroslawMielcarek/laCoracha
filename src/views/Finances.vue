<template>
  <div class='container'>
    <h1>Área de Finanzas</h1>
    <p class='extra__message'>Aquí están los ajustes de finanzas. Haga clic sobre (ID o Nick o Equipo o Saldo) para ordenar por esos valores</p>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'memberID'">ID</p>
        <p class='column sort' @click="sortBy = 'name'">Nick</p>
        <p class='column'>Género</p>
        <p class='column sort' @click="sortBy = 'team'">Equipo</p>
        <p class='column sort' @click="sortBy = 'balance'">€ Balance</p>
      </div>
      <div class='list large'>
        <div class='list-row' v-if="!players.length">
          <p class="no-data">No hay jugadores para mostrar</p>
        </div>
        <div class='list-row' v-for="player in players" :key="player">
          <div class='action column'><button class='btn color' @click="setState(player)">Editar</button></div>
          <p class='column id'>{{player.memberID || '-'}}</p>
          <p class='column name'>{{player.nick.value || '-'}}</p>
          <p class='column gender'>{{player.isFemale ? 'Mujer' : 'Hombre'}}</p>
          <p class='column team'>{{player.team || '-'}}</p>
          <p class='column balance'>{{player.balance}}</p>
        </div>
      </div>
      <PlayerPayments v-if="value" :value="value" @clearForm="setState(undefined)" @submitForm="(acction, value) => { submitForm(acction, value, setState(undefined)); fetchPlayers}"/>
    </div>
    <CollectivePaymentActions />
    <SponsorsManager/>
  </div>
</template>

<script>
import PlayerPayments from '@/components/payment/PlayerPayments.vue'
import CollectivePaymentActions from '@/components/admin/finances/CollectivePaymentActions.vue'
import SponsorsManager from '@/components/admin/finances/SponsorsManager.vue'
import { setNotification, submitForm } from '@/services/util/universal.js'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import AdminService from '@/services/admin.service.js'

export default {
  name: 'Moderator',
  components: {
    PlayerPayments,
    CollectivePaymentActions,
    SponsorsManager
  },
  data () {
    return {
      value: undefined,
      isEditing: true,
      sortBy: 'memberID',
      playersList: []
    }
  },
  created () {
    this.fetchPlayers()
  },
  mounted() {
    this.$store.dispatch('fetchSponsors')
  },
  computed: {
    players () {
      const list = this.playersList
      if (!list.length) return []
      for (const player of list) {
        player.balance = this.calcPaymentsBalance(player)
      }
      if (this.sortBy === 'memberID') return sortListOfObjectsBy(list, 'memberID', false)
      if (this.sortBy === 'team') return sortListOfObjectsBy(list, 'team', false)
      if (this.sortBy === 'name') return sortListOfObjectsBy(list, 'nick', false)
      if (this.sortBy === 'balance') return sortListOfObjectsBy(list, 'balance', false, false)
      return list
    }
  },
  methods: {
    setNotification,
    submitForm,
    setState (value) {
      this.value = value
    },
    fetchPlayers () {
      AdminService.getAll('Players')
        .then(response => {
          this.playersList = response
        })
        .catch(error => {
          this.setNotification({
            name: 'FetchAllPlayers finances',
            text: error,
            typeOfNotification: 'danger'
          })
        })
    },
    calcPaymentsBalance (player) {
      let sum = 0
      for (const month of player.payments) {
        for (const payment of month.payments) {
          if (payment.isPaid === 'no') sum -= payment.qty
        }
      }
      return sum
      // player.balance = sum
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.list-head,
.list-row {
  // max 375px 220 = 150 / 2 = 75
  grid-template-columns: 60px 30px minmax(60px, 1fr) 60px 1fr 80px;

  .id,
  .name,
  .number,
  .gender,
  .balance {
    margin-bottom: .1em;
  }
  .number,
  .gender{
    font-weight: 300;
  }
  .balance {
    &::after {
      content: '€';
      width: 1ch;
      margin-left: 2px;
    }
  }
}
</style>
