<template>
  <Table :category="`${categoryName} - ${translateToSpanish(gender) }`">
    <template v-slot:head>
      <div class='table-row'>
        <div class='column gender-type'>
          <p>{{ translateToSpanish(gender) }}</p>
          <p :class="['current', { closeToLimit: value.currentEnrolled >= (value.maxPlaces - 2)}]"><b>{{ value.currentEnrolled }}</b>/ {{ value.maxPlaces }}</p>
        </div>
        <p class='column sort' @click="sortBy = 'name'">Name</p>
        <p class='column'>Was contacted</p>
        <p class='column sort' @click="sortBy = 'phoneNumber'">No. de tel.</p>
        <p class='column'>Was before</p>
        <p class='column comments'>Comentarios</p>
        <p class='column sort' @click="sortBy = 'dateOfEnrollment'">Date</p>
        <p class='column contactedBy sort' @click="sortBy = 'contactedBy'">Contacted by</p>
        <p class='column'></p>
      </div>
    </template>
    <template v-slot:body>
      <template v-for="candidate in sortListOfObjectsBy(value.list, sortBy, false)" :key="candidate">
        <EnrollmentPlayer :candidate="candidate" />
      </template>
    </template>
  </Table>
</template>

<script setup>

import Table from '@/components/table/Table.vue'
import EnrollmentPlayer from './EnrollmentPlayer.vue'
import { ref } from 'vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { translateToSpanish } from '@/services/util/universal.js'

const props = defineProps({
  value: { type: Object },
  categoryName: { type: String },
  gender: { type: String }
})
const sortBy = ref('')

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.table-row {
  grid-template-columns: 40px 1fr 32px 80px 32px 70px 40px;
  }
.grid:first-of-type {
  margin-top: 0;
}

.gender-type {
  flex-direction: column;
  text-transform: capitalize;
  .current {
    font-size: .9rem;
  }
}
.column {
  &.comments,
  &.contactedBy {
    display: none;
  }
}


@media (min-width: 740px) {

  .table-row {
    grid-template-columns: 70px 1fr 60px 12ch 80px 1fr 12ch 6ch 60px;
  }
}

.column {
  &.comments,
  &.contactedBy {
    display: flex;
  }
}

</style>