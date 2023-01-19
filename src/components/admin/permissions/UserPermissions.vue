<template>
  <div class='action column'>
    <button class='btn color' v-if='!isEditing' @click="isEditing = !isEditing">Editar</button>
    <button class='btn red' v-else @click="save()">Guardar</button>
  </div>
  <p class='column id'>{{ user.memberID || '-' }}</p>
  <p class='column name'>{{ user.nick ? user.nick.value : '-' }}</p>
  <p class='column gender'>{{ user.isFemale ? 'Mujer' : 'Hombre' }}</p>
  <p class='column team'>{{ user.team || '-' }}</p>
  <p class='column roles' v-if="!isEditing">{{ selectedPermision }}</p>
  <CustomSelectInput v-else class='column roles' v-model:value="selectedPermision" :options="['user', 'moderator', 'admin']" placeholder="Permiso superior" />
</template>

<script setup>
import { ref } from 'vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'

const emit = defineEmits(['updateUserPermision'])
const props = defineProps(['user'])

const isEditing = ref(false)
const selectedPermision = ref(topPermision())

function topPermision () { 
  const userPermissions = props.user.roles.map(r => r.name)
  if (userPermissions.includes('admin')) return 'admin'
  if (userPermissions.includes('moderator')) return 'moderator'
  return 'user'
}

function setRoles (role) {
  if (role === 'moderator') return ['user', 'moderator']
  if (role === 'admin') return ['user', 'moderator', 'admin']
  return ['user']
}

function save () {
  // if no permision choosed or choosed is equal to already top then return
  if (!selectedPermision.value || topPermision() === selectedPermision.value) return isEditing = false
  emit('updateUserPermision',{ ...props.user, roles: setRoles(selectedPermision.value) })
}
</script>