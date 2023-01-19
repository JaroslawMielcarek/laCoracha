<template>
  <div class='add_edit'>
    <h5>Miembro: {{ playerID }}</h5>
    <div class='month'>
      <h5 class='name'>Nuevo mes</h5>
      <input class='row' type='month' placeholder='YYYY-MM' pattern="[0-9]{4}-[0-9]{2}" v-model="newMonth.monthYear" @change="checkIfMonthExist" />
      <button class='btn white full-width' @click="addMonth" :disabled="!newMonth.monthYear">Agregar</button>
    </div>
    <div class='months row' v-if='player.payments'>
      <div class='month' v-for="month in player.payments" :key="month">
        <h5 class='name'>{{ getMonthNameByNumber(month.monthYear) }}</h5>
        <PaymentTemplate v-if="month.payments" v-model:value="month.payments" @removePayment="(index) => removePayment(month, index)" />
        <button class='btn white full-width' @click="addPayment(month)">Agregar pago</button>
      </div>
    </div>
    <p v-for="error in errors" class='error' :key="error">{{ error }}</p>
    <div class='flex-row'>
      <button class='btn color full-width' @click="submitForm">Actualizar</button>
      <p class='btn text' @click="emit('clearForm')">Claro</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import PaymentTemplate from '@/components/payment/PaymentTemplate.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { getMonthNameByNumber } from '@/services/util/time.js'

const emit = defineEmits(['clearForm', 'submitForm'])
const props = defineProps({ value: {type: Object, default: undefined }})

const errors = ref([])
const newMonth = ref({
  monthYear: '',
  payments: []
})
const player = ref({
  ...props.value,
  payments: sortListOfObjectsBy(props.value.payments, 'monthYear', true)
})

const playerID = ref( props.value.memberID )
const payments = ref( sortListOfObjectsBy(props.value.payments, 'monthYear', true) )

function checkIfMonthExist () {
  if (payments.value.find(m => m.monthYear === newMonth.value.monthYear)) {
    errors.push('Mes existe! por favor edítalo')
    newMonth.value.monthYear = ''
  }
}
function addMonth () {
  player.value.payments.push(newMonth.value)
  player.value.payments = sortListOfObjectsBy(player.value.payments, 'monthYear', false, true)
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
function submitForm () {
  if (!checkForm()) return null

  const { _id, payments } = player.value
  return emit('submitForm', 'updatePlayer', { _id, payments })
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.months {
  display: flex;
  flex-direction: column;
  max-height: calc(3 * 120px);
  overflow-y: scroll;
  border: 1px solid rgba($blueDark, .2);
  border-radius: 4px;
}
.month {
  border: 1px solid rgba($blueDark, .4);
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
  .name {
    text-align: center;
    margin: 0.1em 0 .3em;
  }
}
@media (min-width: 600px) {

}
</style>
