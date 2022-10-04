<template >
  <h4>Acciones de pagos colectivos</h4>
  <div>
    <div class='flex-row'>
      <p class='label'>Cuota de membresía automática:</p>
      <ToggleSlider  :checked="automaticMonthlyPayment" @toggled="setMonthlyPayment()"/>
    </div>
    <p class='extra__message'>cada 1er día del mes (30€)</p>
  </div>
</template>

<script>
import ToggleSlider from '@/components/ToggleSlider.vue'
import AdminService from '@/services/admin.service.js'
import { setNotification } from '@/services/util/universal.js'

export default {
  name: 'PlayerPerformance',
  components: {
    ToggleSlider,
  },
  data () {
    return {
      automaticMonthlyPayment: false,
    }
  },
  created () {
    AdminService.status('MonthlyPayment')
      .then(response => {
        this.automaticMonthlyPayment = response
      })
      .catch(error => {
        this.setNotification({
          name: 'statusMonthlyPayment',
          text: error.response.data.message,
          typeOfNotification: 'danger'
        })
      })
  },
  methods: {
    setNotification,
    setMonthlyPayment () {
      AdminService.setMonthlyPayment('', { automaticMonthlyPayment: !this.automaticMonthlyPayment })
        .then(response => {
          this.setNotification({
            name: 'setMonthlyPayment',
            text: response,
            typeOfNotification: 'success'
          })
          this.automaticMonthlyPayment = !this.automaticMonthlyPayment
        })
        .catch(error => {
          this.setNotification({
            name: 'setMonthlyPayment',
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
.flex-row {
  justify-content: flex-start;
  align-items: center;
}
.label {
  margin-bottom: 0;
  margin-right: 1ch;
}
@media (min-width: 600px) {

}
</style>
