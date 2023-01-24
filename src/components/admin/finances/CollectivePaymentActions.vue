<template >
  <h4>Acciones de pagos colectivos</h4>
  <div>
    <div class='flex-row'>
      <p class='label'>Cuota de membresía automática:</p>
      <ToggleSlider  :checked="automaticMonthlyPayment" @toggled="setMonthlyPayment()"/>
    </div>
    <p class='extra-message'>cada 1er día del mes (30€)</p>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import ToggleSlider from '@/components/ToggleSlider.vue'
import AdminService from '@/services/admin.service.js'
import { setNotification } from '@/services/util/universal.js'

const automaticMonthlyPayment = ref(false)

onMounted( () => {
  AdminService.status('MonthlyPayment')
  .then(response => { automaticMonthlyPayment.value = response })
  .catch(error => {
    setNotification({
      name: 'statusMonthlyPayment',
      text: error.response.data.message,
      typeOfNotification: 'danger'
    })
  })
})

function setMonthlyPayment () {
  AdminService.setMonthlyPayment('', { automaticMonthlyPayment: !automaticMonthlyPayment.value })
    .then(response => {
      setNotification({
        name: 'setMonthlyPayment',
        text: response,
        typeOfNotification: 'success'
      })
      automaticMonthlyPayment.value = !automaticMonthlyPayment
    })
    .catch(error => {
      setNotification({
        name: 'setMonthlyPayment',
        text: error.response.data.message,
        typeOfNotification: 'danger'
      })
    })
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
