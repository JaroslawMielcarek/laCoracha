<template>
  <h4>Sponsors</h4>
  <div class='grid row'>
    <div class='list-head'>
      <p class='column'></p>
      <p class='column'>Name</p>
      <p class='column contribution'>Contr.</p>
      <p class='column'>Main</p>
      <p class='column link'>Link</p>
      <p class='column'>Logo</p>
      <p class='column'></p>
    </div>
    <div class='list large'>
      <div class='list-row' v-if="!sponsors.length">
        <p class="no-data">No sponsors to display</p>
      </div>
      <div class='list-row' v-for="sponsor in sponsors" :key="sponsor">
        <div class='action column'><button class='btn color' @click="setState(sponsor, true, true)">Edit</button></div>
        <p class='column'>{{sponsor.name}}</p>
        <p class='column contribution'>{{sponsor.contribution}}</p>
        <p class='column'>{{sponsor.isMain? 'Sí' : 'No'}}</p>
        <p class='column link'>{{sponsor.link}}</p>
        <p class='column'>{{sponsor.logo ? 'Sí': 'No'}}</p>
        <p class='column'><button class='btn danger' @click="removeSponsor(sponsor)">x</button></p>
      </div>
    </div>
  </div>
  <button v-if="!visible" class='btn white' @click="visible = !visible">Add Sponsor</button>
  <AddEditSponsor v-else :value="value" :isEditing="isEditing" @clearForm="setState({})" @submitForm="submitForm"/>
</template>
<script>

import AddEditSponsor from './AddEditSponsor.vue';
import { setNotification } from '@/services/util/universal.js'

export default {
  components: {
    AddEditSponsor
  },
  data () {
    return {
      visible: false,
      isEditing: false,
      value: {},
    }
  },
  computed: { sponsors () { return this.$store.getters.getSponsors } },
  methods: {
    setNotification,
    removeSponsor (value) { if (confirm('Are you sure you want delete sponsor')) this.$store.dispatch('removeSponsor', value) },
    submitForm (acction, value) {
      this.$store.dispatch(acction, value)
        .then(response => {
          this.setState({})
          this.setNotification({
            name: acction,
            text: response,
            typeOfNotification: 'success'
          })
        })
        .catch(error => {
          this.setNotification({
            name: acction,
            text: error,
            typeOfNotification: 'danger'
          })
        })
    },
    setState (value, visible = false, isEditing = false) {
      this.visible = visible
      this.value = value
      this.isEditing = isEditing
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.list-head, .list-row {
  // max 500px 60 + 90 + 4ch + 40px
  grid-template-columns: 60px 1fr 6ch 4ch 1fr 4ch 40px;
}
.contribution::after {
      content: '€';
      width: 1ch;
      margin-left: 2px;
} 
</style>