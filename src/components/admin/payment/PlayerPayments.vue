<template>
  <h4>Saldos de jugadores</h4>
  <fieldset class='download border_solid'>
    <legend class="extra-message">Aquí puede elegir el período económico para descargar en formato de excel</legend>
    <input type='month' placeholder='YYYY-MM' pattern="[0-9]{4}-[0-9]{2}" v-model="downloadPeriod.start" />
    -
    <input type='month' placeholder='YYYY-MM' pattern="[0-9]{4}-[0-9]{2}" v-model="downloadPeriod.stop" />
    <button type="button" class="btn color" @click="ExportData()">Descargar</button>
  </fieldset>
  <Table category="jugadores">
    <template v-slot:head>
      <div class='table-row'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'memberID'">ID</p>
        <p class='column sort' @click="sortBy = 'name'">Nick</p>
        <p class='column'>Género</p>
        <p class='column sort' @click="sortBy = 'team'">Equipo</p>
        <p class='column sort' @click="sortBy = 'balance'">€ Balance</p>
      </div>
    </template>
    <template v-slot:body>
      <div class='table-row' v-for="player in players" :key="player">
        <div class='action column'><button class='btn color' @click="setState(player, true)">Editar</button></div>
        <p class='column id'>{{player.memberID || '-'}}</p>
        <p class='column name'>{{player.nick.value || '-'}}</p>
        <p class='column gender'>{{player.isFemale ? 'Mujer' : 'Hombre'}}</p>
        <p class='column team'>{{player.team || '-'}}</p>
        <p class='column balance'>{{player.balance}}</p>
      </div>
    </template>
  </Table>
  <AddEditData v-if="choosedValue" category="saldo del jugador" :isEditing="isEditing" @submitForm="submit"  @closeForm="setState(undefined)">
    <h5>Miembro: {{ playerID }}</h5>
    <p class="extra-message">Nuevo mes</p>
    <div class='month new border_solid'>
      <input type='month' placeholder='YYYY-MM' pattern="[0-9]{4}-[0-9]{2}" v-model="newMonth.monthYear" @change="checkIfMonthExist" />
      <button class='btn white' @click.prevent="addMonth" :disabled="!newMonth.monthYear && checkIfMonthExist">Agregar</button>
    </div>
    <p class="extra-message">Meses realizados</p>
    <div class='months row' v-if='payments'>
      <div class='month border_solid' v-for="month in payments" :key="month">
        <h5 class='name'>{{ getMonthNameByNumber(month.monthYear) }}</h5>
        <PaymentTemplate v-if="month.payments" v-model:value="month.payments" @removePayment="(index) => removePayment(month, index)" />
        <button class='btn white full-width' @click="addPayment(month)">Agregar pago</button>
      </div>
    </div>
    <p v-for="error in errors" class='error' :key="error">{{ error }}</p>
  </AddEditData>
</template>

<script setup>
import PaymentTemplate from './PaymentTemplate.vue'
import AddEditData from '@/components/AddEditData.vue'
import AdminService from '@/services/admin.service.js'
import Table from '@/components/table/Table.vue'
import XLSX from 'xlsx'
import { ref, onMounted, computed } from 'vue'
import { setNotification, submitForm } from '@/services/util/universal.js'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { getMonthNameByNumber, getCurrentYearMonth, compareYearMonth } from '@/services/util/time.js'

const choosedValue = ref(undefined)
const isEditing = ref(false)
const sortBy = ref('memberID')
const playersList = ref([])
const errors = ref([])
const newMonth = ref({
  monthYear: '',
  payments: []
})
const downloadPeriod = ref({
  start: getCurrentYearMonth(),
  stop: getCurrentYearMonth()
})

onMounted( () => {
  fetchPlayers()
})

const players = computed( () => {
  const list = [...playersList.value]
  if (!list.length) return []
  for (const player of list) {
    player.balance = calcPaymentsBalance(player)
  }
  if (sortBy.value === 'memberID') return sortListOfObjectsBy(list, 'memberID', false)
  if (sortBy.value === 'team') return sortListOfObjectsBy(list, 'team', false)
  if (sortBy.value === 'name') return sortListOfObjectsBy(list, 'nick', false)
  if (sortBy.value === 'balance') return sortListOfObjectsBy(list, 'balance', false, false)
  return list
})

function calcPaymentsBalance (player) {
  let sum = 0
  for (const month of player.payments) {
    for (const payment of month.payments) {
      if (payment.isPaid === 'no') sum -= payment.qty
    }
  }
  return sum
}

const playerID = computed( () => {
  return (!choosedValue.value)
  ? null
  : choosedValue.value.memberID
})

const payments = computed( () => sortListOfObjectsBy(choosedValue.value.payments, 'monthYear', true) )


function fetchPlayers () {
  AdminService.getAll('Players')
    .then(response => {
      playersList.value = response
      setNotification({
        name: 'FetchAllPlayers finances',
        text: 'Players list updated',
        typeOfNotification: 'success'
      })
    })
    .catch(error => {
      setNotification({
        name: 'FetchAllPlayers finances',
        text: error,
        typeOfNotification: 'danger'
      })
    })
}

function checkIfMonthExist () {
  if (!payments.value.find(m => m.monthYear === newMonth.value.monthYear)) return false

  errors.value.push('Mes existe! Por favor edítalo.')
  newMonth.value.monthYear = ''
  return true
}
function addMonth () {
  choosedValue.value.payments.push(newMonth.value)
  choosedValue.value.payments = sortListOfObjectsBy(choosedValue.value.payments, 'monthYear', false, true)
  newMonth.value = {
    monthYear: '',
    payments: []
  }
}
function addPayment (month) { month.payments.push({ type: '', qty: 0, isPaid: '' }) }
function removePayment (month, practiceIndex) { month.payments.splice(practiceIndex, 1) }

function checkForm () {
  for (const month of payments.value) {
    for (const payment of month.payments) {
      if (!payment.type) {
        errors.value.push(getMonthNameByNumber(month.monthYear) + ' ' + new Date(month.monthYear).getFullYear() + ' - select type of payment')
        return false
      }
    }
  }
  return true
}
function GetUsefullData (list) {
  const order = compareYearMonth(downloadPeriod.value.start, downloadPeriod.value.stop)
  const start = downloadPeriod.value.start
  const stop = downloadPeriod.value.stop
  const yearStart = start.split('-')[0]
  const monthStart = start.split('-')[1]
  const yearStop = stop.split('-')[0]
  const monthStop = stop.split('-')[1]
  const listOfM = new Map()

  for(let year = yearStart; order ? year <= yearStop : year >= yearStop; order ? year++ : year--){
    const mStart = (year == yearStart) ? monthStart : ( order ? 1 : 12 )
    const mStop = (year == yearStop) ? monthStop : ( order ? 12 : 1 )
    for(let month = mStart; order ? month <= mStop : month >= mStop; order ? month++ : month--){
      listOfM.set(`${year}-${/^\d$/.test(month) ? '0' + month : month}`, 0)
    }
  }

  return list.map( e => {
    const listOfMonths = new Map(listOfM)

    for (const month of e.payments){
      for (const payment of month.payments){
        if(listOfMonths.has(month.monthYear) && payment.isPaid === 'no') {
          listOfMonths.set(month.monthYear, listOfMonths.get(month.monthYear) - payment.qty)
        }
      }
    }
    const p = { ID: e.memberID, balance: e.balance }
    for (const [key,value] of listOfMonths){
      p[key] = value
    }
    return p
  })
}
function ExportData() {
  const ws = XLSX.utils.json_to_sheet(GetUsefullData(playersList.value))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Players")
  XLSX.writeFile(wb, 'report.xlsx')
}
async function submit(){
  if (!checkForm()) return null
  const { _id, payments } = choosedValue.value
  if (await submitForm(isEditing.value ? 'updatePlayer' : 'addPlayer', { _id, payments })) setState(undefined)
}
function setState(val, isEdit = false) {
  !val
    ? choosedValue.value = undefined
    : choosedValue.value = JSON.parse(JSON.stringify(val)) //deep copy
  isEditing.value = isEdit
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.table-row {
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
.border_solid {
  border: 1px solid rgba($blueDark, .4);
  border-radius: 4px;
}
.months {
  display: flex;
  flex-direction: column;
  max-height: calc(3 * 120px);
  overflow-y: scroll;
  border: 1px solid rgba($blueDark, .2);
  border-radius: 4px;
}
.month {
  padding: 8px;
  margin: 4px;
  .name {
    text-align: center;
    margin: 0.1em 0 .3em;
  }
}
.new {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.download {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 2px 4px;
  button { margin-left: 2ch }
}
@media (min-width: 740px) {

}
</style>
