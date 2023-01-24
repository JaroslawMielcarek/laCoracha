<template>
  <section class="grid-layout">
    <div class="grid-header"> 
      <h2>Bienvenidos {{this.$store.getters.getUsername}}</h2>
      <p class='extra-message'>Aquí encontrarás tus datos y configuraciones</p>
    </div>
    <div class='flex-column-container ' id="payments_calendar">
      <h3>Calendario de pagos</h3>
      <PaymentCalendar />
    </div>
    <div class='flex-column-container ' id="informacion_basic">
      <h3>Información básica</h3>
      <p class='extra-message'>Lo usaremos para:</p>
      <BasicInfo />
    </div>
    <div class='flex-column-container ' id="position_preferences">
      <h3>Elija preferencia de posición:</h3>
      <p class='extra-message'>Seleccione de mayor deseo a menor</p>
      <PreferedPositions />
    </div>
    <div class='flex-column-container ' id="privacy_preferences">
      <h3>Preferencias de privacidad:</h3>
      <p class='extra-message'>Selecciona lo que estás dispuesto a compartir en nuestra página.</p>
      <PrivacyPref />
    </div>
  </section>
</template>

<script>
import BasicInfo from '@/components/settings/BasicInfo.vue'
import PreferedPositions from '@/components/settings/PreferedPositions.vue'
import PrivacyPref from '@/components/settings/PrivacyPref.vue'
import PaymentCalendar from '@/components/payment/PaymentCalendar.vue'

export default {
  name: 'Settings',
  components: {
    BasicInfo,
    PreferedPositions,
    PrivacyPref,
    PaymentCalendar
  },
}
</script>

<style lang="scss">
@import '@/colors.scss';

@media only screen and (min-width: 992px){
  .grid-layout {
    display: grid;
    grid-template:
      "top top"
      "basic payments"
      "position privacy";
    gap: 0vmin 10vmin;
  }
  .grid-header {
    grid-area: top;
  }
  #informacion_basic {
    grid-area: basic;
  }
  #payments {
    grid-area: payments;
  }
  #position_preferences {
    grid-area: position;
  }
  #privacy_preferences {
    grid-area: privacy;
  }
}
</style>
