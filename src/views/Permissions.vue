<template>
  <section class='container'>
    <h1>Área de permisos</h1>
    <p class='extra-message'>Aquí están las configuraciones de permisos.</p>
    <Table category="jugadores">
      <template v-slot:head>
        <div class='table-row'>
          <p class='column'></p>
          <p class='column sort' @click="sortBy = 'memberID'">ID</p>
          <p class='column sort' @click="sortBy = 'name'">Nick</p>
          <p class='column'>Género</p>
          <p class='column sort' @click="sortBy = 'team'">Equipo</p>
          <p class='column sort' @click="sortBy = 'roles'">Roles</p>
        </div>
      </template>
      <template v-slot:body>
        <div class='table-row' v-for="player in players" :key="player">
          <UserPermissions :user="player" @updateUserPermision="updateUserPermision"/>
        </div>
      </template>
    </Table>
    <div>
      <h5>MemberID disponibilidad</h5>
      <div class='row'>
        <button class='btn color' @click="createNextMemberID(nextAvailableID)">Añadir siguiente disponible memberID: {{nextAvailableID}}</button>
      </div>
      <div class='row'>
        <p class='extra-message'>Seleccione memberID para eliminar. También eliminará al jugador conectado a esta memberID.</p>
        <div class='eliminate'>
          <CustomSelectInput v-model:value="memberIDtoDelete" :options="['none',...membersIDsList]" placeholder="memberID to remove" :key="membersIDsList"/>
          <button class='btn red' v-if="memberIDtoDelete !== 'none'" @click="removeMemberID(memberIDtoDelete)">Eliminar memberID {{memberIDtoDelete}}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserPermissions from '@/components/admin/permissions/UserPermissions.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification } from '@/services/util/universal.js'
import AdminService from '@/services/admin.service.js'
import Table from '@/components/table/Table.vue'

export default {
  name: 'Permissions',
  components: {
    UserPermissions,
    CustomSelectInput,
    Table
  },
  data () {
    return {
      visible: false,
      value: {},
      isEditing: true,
      sortBy: 'memberID',
      playersList: [],
      memberIDs: [],
      memberIDtoDelete: 'none',
    }
  },
  created () {
    this.fetchPlayers()
    this.fetchMembersIDs()
  },
  computed: {
    players () {
      const list = this.playersList
      if (!list.length || !this.sortBy) return list

      for (const player of list) {
        player.permissions = this.getRoles(player.roles)
      }

      if (this.sortBy === 'balance') return sortListOfObjectsBy(list, 'balance', false, true)
      return sortListOfObjectsBy(list, this.sortBy, false)
    },
    membersIDsList () { return this.memberIDs.map(p => p).sort() },
    nextAvailableID () { return parseInt(this.membersIDsList.slice(-1)[0]) + 1 }
  },
  methods: {
    sortListOfObjectsBy,
    setNotification,
    setState (value, visible = false) {
      this.visible = visible
      this.value = value
    },
    getRoles (list) { return list.map(r => r.name).join(' ') },

    updateUserPermision(value) {
      AdminService.update('UserPermissions', value)
        .then(response => {
          this.setNotification({
            name: 'updateUserPermissions',
            text: response.message,
            typeOfNotification: 'success'
          })
          this.fetchPlayers()
        })
        .catch(error => {
          this.setNotification({
            name: 'updateUserPermissions',
            text: error.message,
            typeOfNotification: 'danger'
          })
        })
      
    },
    fetchPlayers () {
      AdminService.getAll('Players')
        .then(response => {
          this.playersList = response
        })
        .catch(error => {
          this.setNotification({
            name: 'getAllPlayers',
            text: error,
            typeOfNotification: 'danger'
          })
        })
    },
    fetchMembersIDs () {
      AdminService.getAll('MembersIDs')
        .then(response => {
          this.memberIDs = response
        })
        .catch(error => {
          this.setNotification({
            name: 'getAllMembersID',
            text: error,
            typeOfNotification: 'danger'
          })
        })
    },
    createNextMemberID (id) {
      AdminService.create('MemberID', { memberID: id })
        .then(response => {
          this.setNotification({
            name: 'createMemberID',
            text: response,
            typeOfNotification: 'success'
          })
          this.fetchMembersIDs()
        })
        .catch(error => {
          this.setNotification({
            name: 'createMemberID',
            text: error,
            typeOfNotification: 'danger'
          })
        })
    },
    removeMemberID (id) {
      const result = confirm('Are you sure you want to remove memberID:' + id + ' and player related to this ID?')
      if (!result) return null
      AdminService.remove('MemberID', { memberID: id })
        .then(response => {
          this.fetchPlayers()
          this.fetchMembersIDs()
          this.memberIDtoDelete = 'none'
          this.setNotification({
            name: 'removeMemberID',
            text: response,
            typeOfNotification: 'success'
          })
        })
        .catch(error => {
          this.setNotification({
            name: 'removeMemberID',
            text: error,
            typeOfNotification: 'danger'
          })
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/colors.scss';

.eliminate {
  display: flex;
  & button {
    margin-left: 1ch;
  }
}

.table-row {
  // max 375px 220 = 150 / 2 = 75
  grid-template-columns: 80px 30px minmax(60px, 1fr) 60px 1fr 100px;

  .id,
  .name,
  .number,
  .gender,
  .roles {
    margin-bottom: .1em;
  }
  .number,
  .gender{
    font-weight: 300;
  }
}
</style>
