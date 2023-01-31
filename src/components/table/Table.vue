<template>
  <div class='grid'>
    <div class='filter-panel' v-if="filterOptions.length">
      <label>Mostrar: </label>
      <CustomSelectInput :value="showBy" :options="filterOptions" @update:value="(val) => emit('update:showBy', val)" placeholder="Eligue periodo" />
    </div>
    <div class="table-head">
      <slot name='head'></slot>
    </div>
    <div class='table-body'>
      <slot name='body'>
        <p class="no-data">No hay {{ props.category }} para mostrar</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import CustomSelectInput from '@/components/CustomSelectInput.vue'
const emit = defineEmits(['update:showBy'])
const props = defineProps({
  category: {type: String, default: 'data'},
  filterOptions: {type: Array, default: []},
  showBy: {type: String, default: ''}
})

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.grid {
  margin-top: 24px;
}
.filter-panel{
  display: flex;
  align-items: baseline;
  gap: 1ch;
}
.table-head {
  border-bottom: 1px solid rgba($blueDark, 0.2);

  // .sort {
  //   cursor: pointer;

  //   &:hover {
  //     background-color: rgba($blueDark, 0.1);
  //   }
  // }
}
</style>