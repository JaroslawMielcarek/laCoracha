<template>
  <div class='grid'>
    <h5>Strikes</h5>
    <PlusMinus class = 'column' v-model:value="strikes.qty" :max="3" />
    <label>Obtenido por última vez en:</label>
    <input type='date' v-model="strikes.lastStrike" :required="strikes.qty" />
    <p v-if="strikes.qty && !strikes.lastStrike" class='text_small error'>Fecha requerida!</p>
  </div>

</template>

<script setup>
import { computed, defineProps } from 'vue'
import PlusMinus from '@/components/PlusMinus.vue'

const props = defineProps({ value: {type: Object, default: undefined} })
const strikes = computed( () => props.value.strikes )
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

@media (min-width: 600px) {

}
</style>
