<template>
  <div class='player-performance'>
    <h5>El rendimiento</h5>
    <div class = 'list-row'>
      <p class = 'column category'></p>
      <p class = 'column total'>Total</p>
      <p class = 'column'>Good</p>
      <p class = 'column'>Bad</p>
      <p class = 'column percent'>%</p>
      <p class = 'column'></p>
    </div>
    <div class='list-row' v-for="(property, name) in gamePerformance" :key="property">
      <p class = 'column category'>{{ name }}</p>
      <p class = 'column total'>{{ total(property) }}</p>
      <PlusMinus class = 'column' v-model:value="property.good"/>
      <PlusMinus class = 'column' v-model:value="property.bad"/>
      <p class = 'column percent'>{{ percent(property) }}</p>
      <i :class="['column', 'change', change(property)]"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PlusMinus from '@/components/PlusMinus.vue'

const emit = defineEmits('update:value')
const props = defineProps({ value: {type: Object, default: undefined} })
const gamePerformance = computed({
  get () {return props.value},
  set (newValue) { emit('update:value', newValue)}
})
function total (obj) { return obj.good + obj.bad }
function percent (obj) { return obj.good ? parseFloat(obj.good / total(obj) * 100).toFixed(1) : 0 }
function change (obj) {
  obj.percent = percent(obj)

  if (obj.percent > obj.prevPercent) {
    return 'improved'
  }
  if (obj.percent < obj.prevPercent) {
    return 'worsen'
  }
  return 'no-change'
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.list-row {
  display: grid;
  // max 400px  60 + 260 + 80 = 80
  grid-template-columns: minmax(60px, 2fr) minmax(120px, 6fr) minmax(120px, 6fr) minmax(40px, 2fr) minmax(20px, 1fr);
  justify-items: center;
  align-items: baseline;
  .total {
    display: none;
  }
}
.category {
  justify-self: flex-start;
}
.change {
    width: 12px;
    height: 12px;
    border-color: $black;
    /* position: absolute; */
    border-bottom: 2px solid;
    border-left: 2px solid;
    position: relative;
    &.improved,
    &.worsen {
      top: calc(50% - 7px);
    }
    &.improved {
      transform: rotate(135deg);
      border-color: $valid;
    }
    &.worsen {
      transform: rotate(-45deg);
      border-color: $dangerous;
    }
    &.no-change {
      height: 2px;
      border-left: none;
      top: 50%;
    }
  }

@media (min-width: 740px) {
  .list-row {
    // max 400px  100 + 260 + 70 = 80
  grid-template-columns: minmax(60px, 2fr) minmax(40px, 2fr) minmax(120px, 6fr) minmax(120px, 6fr) minmax(40px, 2fr) minmax(20px, 1fr);

    .total {
      display: flex;
      text-align: center;
    }
  }
}
</style>
