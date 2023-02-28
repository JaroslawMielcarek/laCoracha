<template>
  <div class='block'>
    <h5>Strikes</h5>
    <CustomNumberInput class = 'column' v-model:value="strikes.qty" :max="3" />
    <label>Obtenido por última vez en:</label>
    <input type='date' v-model="strikes.lastStrike" :required="strikes.qty" />
    <p v-if="strikes.qty && !strikes.lastStrike" class='text_small error'>Fecha requerida!</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CustomNumberInput from '@/components/CustomNumberInput.vue'

const props = defineProps({ value: {type: Object, default: undefined} })
const strikes = computed( () => props.value.strikes )
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.block {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
@media (min-width: 600px) {

}
</style>
