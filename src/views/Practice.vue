<template>
  <div class='Practice'>
    <h1>Quedadas</h1>
    <PracticeCalendar/>
  </div>
</template>
<script>
import PracticeCalendar from '@/components/practice/PracticeCalendar.vue'

export default {
  name: 'Settings',
  components: {
    PracticeCalendar
  },
  data () {
    return {
    }
  },
}
</script>
