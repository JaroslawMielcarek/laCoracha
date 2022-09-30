<template>
  <div class='yearHeader'>
    <span :class="['prev', 'year', { disabled: currYear <= minYear } ]" @click=" currYear -= 1 ">&lt;</span>
    <h4 class='year'>{{currYear}}</h4>
    <span :class="['next', 'year', { disabled: currYear >= maxYear } ]" @click=" currYear += 1 ">&gt;</span>
  </div>
  <p v-if="!payments.length" class='no-data'>¡No hay historial de pagos en este período!</p>
  <div v-else class='calendar'>
    <div class='month' v-for="element in payments" :key="element">
      <h5 class='name'>{{ getMonthNameByNumber(element.monthYear) }}</h5>
      <div :class="['payment', {paid: payment.isPaid !== 'no'}]" v-for="payment in element.payments" :key="payment">
        <p class='type'>{{payment.type}}:</p>
        <p class='qty'>{{payment.qty}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMonthNameByNumber } from '@/services/util/time.js'
export default {
  name: 'PaymentCalendar',
  components: {
  },
  data () {
    return {
      currYear: new Date().getFullYear()
    }
  },
  methods: {
    getMonthNameByNumber
  },
  computed: {
    maxYear () { return new Date().getFullYear() + 2 },
    minYear () { return new Date().getFullYear() - 5 },
    userData () { return this.$store.getters.getUser },
    payments () {
      if (!this.userData) return []
      const list = this.userData.payments || []
      return list.filter(p => {
        const paymentYear = new Date(p.monthYear).getFullYear()
        if (paymentYear === this.currYear) return p
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.yearHeader {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .prev,
  .next {
    font-size: 2em;
    padding: 0 1em;
    cursor: pointer;
    &.disabled {
      color: rgba($blueDark, .4);
      pointer-events: none;
    }
  }
}
.no-data {
  text-align: center;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  margin: 0 auto;
}
.month {
  padding: 8px;
  border: 1px solid rgba($blueDark, .4);
  border-radius: 4px;
  min-width: 140px;
  .name {
    text-align: center;
    margin: 0.1em 0 .3em;
  }
}
.payment {
  display: flex;
  align-items: baseline;
  // height: 1.5rem;
  p {
    margin: 0;
  }

  &::before {
    content: '\2717';
    width: 1ch;
    margin-right: 1ch;
    color: $dangerous;
  }
  &.paid {
    &::before {
      content: '\2713';
      color: $valid;
    }
    .type,
    .qty {
    text-decoration: line-through;
    }
  }
  .type,
  .qty {
    display: inline-block;
  }
  .type {
    margin-right: 1ch;
  }
  .qty {
    &::after{
      content: '€';
      width: 1ch;
    }
  }
}

@media (min-width: 600px) {
.calendar {
  grid-template-columns: repeat(3, 150px);
}
}
</style>
