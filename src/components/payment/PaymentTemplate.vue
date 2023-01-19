<template >
  <div v-for="(payment, index) of value" :class="['row', 'payment']" :key="payment">
    <CustomSelectInput v-model:value="payment.type" :options="['afiliación', 'equipacion', 'otros']" placeholder="tipo de pago" />
    <CustomSelectInput class='isPaid' v-model:value="payment.isPaid" :options="['no', 'efectivo', 'tarjeta']" placeholder="forma de pago" />
    <PlusMinus v-model:value="payment.qty" />
    <button class='btn danger remove' @click="emit('removePayment', index)">x</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import PlusMinus from '@/components/PlusMinus.vue'

const emit = defineEmits(['removePayment', 'update:value'])
const props = defineProps({ value: {type: Array, default: [] }})

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.payment {
  border: 1px dashed rgba($blueDark, .4);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px;
  .remove {
    margin-left: 8px;
    padding-left: 0.8em;
    padding-right: 0.8em;
  }

  .select {
    max-width: 25%;
  }
}
@media (min-width: 600px) {
}
</style>
