<template>
  <div>
    <ul class='tabs-header'>
      <li :class="['tab-title',{active: selectedTitle === tab}]" v-for="tab in tabs" :key="tab" @click="selectedTitle = tab">{{ tab }}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, useSlots, provide } from 'vue';

const slots = useSlots()
const tabs = ref(slots.default().map(tab => tab.props.title))
const selectedTitle = ref(tabs.value[0])

provide('selectedTitle', selectedTitle)

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.tabs-header{
  display: flex;
  border-bottom: 1px solid $blueDark;
  margin: 14px 0;
}
.tab-title{
  padding: 4px 8px;
  cursor: pointer;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &.active {
    background-color: $blueDark;
    color: $white;
  }
}

</style>