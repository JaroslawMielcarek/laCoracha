<template>
  <div class='grid'>
    <h5>Strikes</h5>
    <PlusMinus class = 'column' v-model:value="strikes.qty" :max="3" />
    <label>Last date</label>
    <input type='date' v-model="strikes.lastStrike" :required="strikes.qty" />
    <p v-if="strikes.qty && !strikes.lastStrike" class='text_small error'>date required!</p>
  </div>

</template>

<script>
import PlusMinus from '@/components/PlusMinus.vue'

export default {
  name: 'PlayerPerformance',
  components: {
    PlusMinus
  },
  props: {
    value: {
      type: Object,
      default () { return undefined }
    }
  },
  computed: {
    strikes () {
      return this.value.strikes
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

@media (min-width: 600px) {

}
</style>
