<template>
  <div class="layout">
    <div class="t"> 
      <h2>Bienvenidos {{this.$store.getters.getUsername}}</h2>
      <p class='extra__message'>Aquí encontrarás tus datos y configuraciones</p>
    </div>
    <div class='container' id="payments_calendar">
      <h3>Calendario de pagos</h3>
      <PaymentCalendar />
    </div>
    <div class='container' id="informacion_basic">
      <h3>Información básica</h3>
      <p class='extra__message'>Lo usaremos para:</p>
      <BasicInfo />
    </div>
    <div class='container' id="position_preferences">
      <h3>Elija preferencia de posición:</h3>
      <p class='extra__message'>Seleccione de mayor deseo a menor</p>
      <PreferedPositions />
    </div>
    <!-- <div class='container'>
      <h3>Choose prefered hours:</h3>
      <p class='extra__message'>When are you usually able to participate:</p>
      <PreferedHours />
    </div> -->
    <div class='container' id="privacy_preferences">
      <h3>Preferencias de privacidad:</h3>
      <p class='extra__message'>Selecciona lo que estás dispuesto a compartir en nuestra página.</p>
      <PrivacyPref />
    </div>
  </div>
</template>

<script>
import BasicInfo from '@/components/settings/BasicInfo.vue'
// import PreferedHours from '@/components/settings/PreferedHours.vue'
import PreferedPositions from '@/components/settings/PreferedPositions.vue'
import PrivacyPref from '@/components/settings/PrivacyPref.vue'
import PaymentCalendar from '@/components/payment/PaymentCalendar.vue'

export default {
  name: 'Settings',
  components: {
    BasicInfo,
    // PreferedHours,
    PreferedPositions,
    PrivacyPref,
    PaymentCalendar
  },
}
</script>

<style lang="scss">
@import '@/colors.scss';

@media only screen and (min-width: 992px){
  .layout {
    display: grid;
    grid-template:
      "top top"
      "basic payments"
      "position privacy";
    grid-gap: minmax(10px 1rem);
  }
  .t {
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
