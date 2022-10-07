<template>
  <div class='container full-width'>
    <h3>Equipos</h3>
    <p class='extra__message'>Administrar equipos de club</p>
    <div class='grid row'>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'name'">Nombre</p>
        <p class='column sort' @click="sortBy = 'league'">Liga</p>
        <p class='column sort' @click="sortBy = 'gender'">Género</p>
        <p class='column'>Logo</p>
        <p class='column'>Jugadores</p>
        <p class='column'></p>
      </div>
      <div class='list'>
        <div class='list-row' v-if="!teams.length">
          <p class="no-data">No hay equipos para mostrar</p>
        </div>
        <div class='list-row' v-for="team in teams" :key="team">
          <p class='column'><button class='btn color' @click="setState(team, true)">Editar</button></p>
          <p class='column'>{{team.name}}</p>
          <p class='column'>{{team.league}}</p>
          <p class='column'>{{team.gender}}</p>
          <p class='column'>{{team.logo? 'Sí' : 'No'}}</p>
          <p :class="['column',{overLimit: team.players.length > maxPlayers}]"><b>{{team.players.length}}</b>/{{maxPlayers}}</p>
          <p class='column'><button class='btn danger' @click="removeElement('Team', team)">x</button></p>
        </div>
      </div>
    </div>
    <button v-if="!value" class='btn white' @click="value = this.$store.getters.getDefaultTeam">Agregar Equipo</button>
    <AddEditTeam v-else :value="value" :isEditing="isEditing" @clearForm="setState(undefined)" @submitForm="(acction, value) => submitForm(acction, value, setState(undefined))"/>
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
      isEditing: false,
      value: undefined,
      sortBy: 'name',
    }
  },
  computed: { 
    teams () { 
      const list = this.$store.getters.getTeams
        if (this.sortBy === 'name') return sortListOfObjectsBy(list, 'name', false)
        if (this.sortBy === 'league') return sortListOfObjectsBy(list, 'league', false)
        if (this.sortBy === 'gender') return sortListOfObjectsBy(list, 'gender', false)
        return list
    },
    maxPlayers () { return this.$store.getters.getMaxPlayersInTeam }
  },
  methods: {
    setNotification,
    sortListOfObjectsBy,
    submitForm,
    removeElement,
    setState (value, isEditing = false) {
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
