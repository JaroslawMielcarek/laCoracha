<template>
  <div class='row'>
    <h5>El rendimiento</h5>
    <div class = 'list-head'>
      <p class = 'column category'></p>
      <p class = 'column total'>Total</p>
      <p class = 'column'>Good</p>
      <p class = 'column'>Bad</p>
      <p class = 'column percent'>%</p>
      <p class = 'column'></p>
    </div>
    <div class = 'list-body'>
      <div class='list-row' v-for="(property, name) in gamePerformance" :key="property">
        <p class = 'column category'>{{ name }}</p>
        <p class = 'column total'>{{ total(property) }}</p>
        <PlusMinus class = 'column' v-model:value="property.good"/>
        <PlusMinus class = 'column' v-model:value="property.bad"/>
        <p class = 'column percent'>{{ percent(property) }}</p>
        <i :class="['column', 'change', change(property)]"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'
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
.list-head,
.list-row {
  // max 400px  60 + 260 + 80 = 80
  grid-template-columns: 60px 120px 120px 40px 20px;
  .total {
    display: none;
  }
}
.change {
    width: 12px;
    height: 12px;
    border-color: #000;
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

@media (min-width: 600px) {
  .list-head,
  .list-row {
    // max 400px  100 + 260 + 70 = 80
    grid-template-columns: 60px 40px 130px 130px 40px 20px;

    .total {
      display: flex;
      text-align: center;
    }
  }
}
</style>
