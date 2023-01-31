<template>
  <section class='container'>
    <h1>Área de Finanzas</h1>
    <p class='extra-message'>Aquí están los ajustes de finanzas. Haga clic sobre (ID o Nick o Equipo o Saldo) para ordenar por esos valores</p>
    <PlayerPayments/>
    <CollectivePaymentActions />
    <SponsorsManager/>
  </section>
</template>

<script setup>
import PlayerPayments from '@/components/admin/payment/PlayerPayments.vue'
import CollectivePaymentActions from '@/components/admin/finances/CollectivePaymentActions.vue'
import SponsorsManager from '@/components/admin/finances/SponsorsManager.vue'

</script>

<style lang="scss" scoped>
@import '@/colors.scss';

</style>
