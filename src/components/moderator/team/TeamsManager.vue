<template>
  <div class='container full-width'>
    <h3>Teams</h3>
    <p class='extra__message'>Manage Club teams</p>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'name'">Name</p>
        <p class='column sort' @click="sortBy = 'league'">League</p>
        <p class='column sort' @click="sortBy = 'gender'">Gender</p>
        <p class='column'>Logo</p>
        <p class='column'>Players</p>
        <p class='column'></p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!teams.length">
          <p class="no-data">No teams to display</p>
        </div>
        <div class='list-row' v-for="team in teams" :key="team">
          <p class='column'><button class='btn color' @click="setState(team, true, true)">Edit</button></p>
          <p class='column'>{{team.name}}</p>
          <p class='column'>{{team.league}}</p>
          <p class='column'>{{team.gender}}</p>
          <p class='column'>{{team.logo? 'Sí' : 'No'}}</p>
          <p class='column'><b>{{team.players.length}}</b>/16</p>
          <p class='column'><button class='btn danger' @click="removeElement('Team', team)">x</button></p>
        </div>
      </div>
    </div>
  <button v-if="!visible" class='btn white' @click="visible = !visible">Add Team</button>
  <AddEditTeam v-else :value="value" :isEditing="isEditing" @clearForm="setState({})" @submitForm="(acction, value) => submitForm(acction, value, setState({}))"/>
  </div>
</template>

<script>
import AddEditTeam from '@/components/moderator/team/AddEditTeam.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification, submitForm, removeElement } from '@/services/util/universal.js'

export default {
  name: 'TeamsManager',
  components: {
    AddEditTeam,
  },
  data () {
    return {
      visible: false,
      isEditing: false,
      value: {},
      sortBy: 'name',
    }
  },
  computed: { 
    teams () { 
      const list = this.$store.getters.getTeams 
        // console.log('sortBy', this.sortBy, list)
        if (this.sortBy === 'name') return sortListOfObjectsBy(list, 'name', false)
        if (this.sortBy === 'league') return sortListOfObjectsBy(list, 'league', false)
        if (this.sortBy === 'gender') return sortListOfObjectsBy(list, 'gender', false)
        return list
    } 
  },
  methods: {
    setNotification,
    sortListOfObjectsBy,
    submitForm,
    removeElement,
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
.list-head,
.list-row {
  grid-template-columns: 60px repeat(3, 1fr) 60px 40px 50px;
}
</style>
