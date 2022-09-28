<template >
  <h4>Collective payments actions</h4>
  <div>
    <div class='flex-row'>
      <p class='label'>Automatic membership fee:</p>
      <ToggleSlider  :checked="automaticMonthlyPayment" @toggled="setMonthlyPayment()"/>
    </div>
    <p class='extra__message'>every 1st day of the month (€30) </p>
  </div>
  <CustomAlert v-if="alert" :text="alert" @confirm="this.alert = ''"/>
</template>

<script>
import ToggleSlider from '@/components/ToggleSlider.vue'
import AdminService from '@/services/admin.service.js'
import CustomAlert from '@/components/CustomAlert.vue'
import { setNotification } from '@/services/util/universal.js'

export default {
  name: 'PlayerPerformance',
  components: {
    ToggleSlider,
    CustomAlert
  },
  data () {
    return {
      automaticMonthlyPayment: false,
      alert: ''
    }
  },
  created () {
    AdminService.status('MonthlyPayment')
      .then(response => {
        this.automaticMonthlyPayment = response
      })
      .catch(error => {
        // console.log('statusMonthlyPayment error', error.response.data.message)
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
          // console.log('setMonthlyPayment response', response)
          this.setNotification({
            name: 'setMonthlyPayment',
            text: response,
            typeOfNotification: 'success'
          })
          this.automaticMonthlyPayment = !this.automaticMonthlyPayment
        })
        .catch(error => {
          // console.log('setMonthlyPayment error', error.response.data.message)
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
