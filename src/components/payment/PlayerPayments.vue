<template>
  <div class='add_edit'>
    <CustomAlert v-if="errorList" :text="errorList" @confirm="this.errors = []" />
    <h5>Miembro: {{ playerID }} - pagos</h5>
    <div class='month'>
      <h5 class='name'>Nuevo mes</h5>
      <input class='row' type='month' placeholder='YYYY-MM' pattern="[0-9]{4}-[0-9]{2}" v-model="newMonth.monthYear" @change="checkIfMonthExist" />
      <button class='btn white full-width' @click="addMonth" :disabled="!newMonth.monthYear">Agregar</button>
    </div>
    <div class='months row' v-if='player.payments'>
      <div class='month' v-for="month in player.payments" :key="month">
        <h5 class='name'>{{ getMonthName(month.monthYear) }}</h5>
        <PaymentTemplate v-if="month.payments" v-model:value="month.payments" @removePayment="(index) => removePayment(month, index)" />
        <button class='btn white full-width' @click="addPayment(month)">Agregar pago</button>
      </div>
    </div>
    <div class='row flex-row'>
      <button class='btn color full-width' @click="submitForm">Actualizar</button>
      <p class='btn text' @click="clearForm">Claro</p>
    </div>
  </div>
</template>

<script>
import PaymentTemplate from '@/components/payment/PaymentTemplate.vue'
import CustomAlert from '@/components/CustomAlert.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { getMonthName } from '@/services/util/time.js'

export default {
  name: 'PlayerPerformance',
  components: {
    PaymentTemplate,
    CustomAlert
  },
  emits: ['clear', 'updated'],
  props: {
    value: {
      type: Object,
      default () { return undefined }
    }
  },
  data () {
    return {
      errors: [],
      newMonth: {
        monthYear: '',
        payments: []
      },
      player: { ...this.value, payments: this.sortListOfObjectsBy(this.value.payments, 'monthYear', true) }
    }
  },
  computed: {
    playerID () { return this.value.memberID },
    payments () { return this.sortListOfObjectsBy(this.value.payments, 'monthYear', true) },
    errorList () { return this.errors.join('\n') },
    months () { return this.$store.getters.getMonths }
  },
  methods: {
    sortListOfObjectsBy,
    getMonthName,
    checkIfMonthExist () {
      if (this.payments.find(m => m.monthYear === this.newMonth.monthYear)) {
        this.errors.push('Mes existe! por favor edítalo')
        this.newMonth.monthYear = ''
      }
    },
    addMonth () {
      this.player.payments.push(this.newMonth)
      this.player.payments = this.sortListOfObjectsBy(this.player.payments, 'monthYear', false, true)
      this.newMonth = {
        monthYear: '',
        payments: []
      }
    },
    addPayment (month) {
      month.payments.push({ type: '', qty: 0, isPaid: '' })
    },
    removePayment (month, practiceIndex) {
      month.payments.splice(practiceIndex, 1)
    },
    clearForm () {
      this.$emit('clear')
    },
    checkForm () {
      for (const month of this.payments) {
        for (const payment of month.payments) {
          if (!payment.type) {
            this.errors = this.getMonthName(month.monthYear) + ' ' + new Date(month.monthYear).getFullYear() + ' - select type of payment'
            return false
          }
        }
      }
      return true
    },
    submitForm () {
      if (!this.checkForm()) return null

      const { _id, payments } = this.player
      const player = { _id, payments }
      this.$store.dispatch('updatePlayer', player)
        .then(response => {
          this.errors = [response]
          this.clearForm()
          this.$emit('updated')
        })
        .catch(error => {
          this.errors = error
        })
    }
  }
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
