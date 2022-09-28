<template>
  <div class='container'>
    <h1>Permissions Area</h1>
    <p class='extra__message'>Here are permissions settings</p>
    <div class='row'>
      <h5>Permission</h5>
      <div class='list-head'>
        <p class='column'></p>
        <p class='column sort' @click="sortBy = 'memberID'">ID</p>
        <p class='column sort' @click="sortBy = 'name'">Nick</p>
        <p class='column'>Gender</p>
        <p class='column sort' @click="sortBy = 'team'">Team</p>
        <p class='column sort' @click="sortBy = 'roles'">Roles</p>
      </div>
      <div class='list large'>
        <div class='list-row' v-if="!players.length">
          <p class="no-data">No players to display</p>
        </div>
        <div class='list-row' v-for="player in players" :key="player">
          <UserPermissions :value="player" @updateUserPermision="updateUserPermision"/>
        </div>
      </div>
    </div>
    <div class='row memberID'>
      <h5>MemberID availability</h5>
      <div class='row'>
        <button class='btn color' @click="createNextMemberID(nextAvailableID)">Add next available memberID {{nextAvailableID}}</button>
      </div>
      <p class='extra__message'>Select memberID to remove. It will also remove player connected to this ID</p>
      <div class='row'>
        <CustomSelectInput v-model:value="memberIDtoDelete" :options="['none',...membersIDsList]" placeholder="memberID to remove" :key="membersIDsList"/>
        <button class='btn red' v-if="memberIDtoDelete !== 'none'" @click="removeMemberID(memberIDtoDelete)">Remove memberID {{memberIDtoDelete}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserPermissions from '@/components/admin/permissions/UserPermissions.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import { setNotification } from '@/services/util/universal.js'
import AdminService from '@/services/admin.service.js'

export default {
  name: 'Permissions',
  components: {
    UserPermissions,
    CustomSelectInput,
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

.memberID {
  .row {
    display: flex;
    align-items: center;
  }
}

.list-head,
.list-row {
  // max 375px 220 = 150 / 2 = 75
  grid-template-columns: 60px 30px minmax(60px, 1fr) 60px 1fr 100px;

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
