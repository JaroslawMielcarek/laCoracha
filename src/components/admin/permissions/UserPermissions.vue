<template>
  <div class='action column'>
    <button class='btn color' v-if='!isEditing' @click="isEditing = !isEditing">Editar</button>
    <button class='btn red' v-else @click="save()">Guardar</button>
  </div>
  <p class='column id'>{{value.memberID || '-'}}</p>
  <p class='column name'>{{value.nick ? value.nick.value : '-'}}</p>
  <p class='column gender'>{{value.isFemale ? 'Mujer' : 'Hombre'}}</p>
  <p class='column team'>{{value.team || '-'}}</p>
  <p class='column roles' v-if="!isEditing">{{topPermision}}</p>
  <CustomSelectInput v-else class='column roles' v-model:value="topPermision" :options="['user', 'moderator', 'admin']" placeholder="Permiso superior" />
</template>

<script>
import CustomSelectInput from '@/components/CustomSelectInput.vue'

export default {
  name: 'UserPermissions',
  components: {
    CustomSelectInput
  },
  emits: ['updateUserPermision'],
  props: {
    value: {
      type: Object,
      default () { return undefined }
    }
  },
  data () {
    return {
      isEditing: false,
      permision: this.topPermision
    }
  },
  computed: {
    topPermision: {
      get () {
        const permissions = this.value.roles.map(r => r.name)
        if (permissions.includes('admin')) return 'admin'
        if (permissions.includes('moderator')) return 'moderator'
        return 'user'
      },
      set (val) {
        this.permision = val
      }
    }
  },
  methods: {
    setRoles (role) {
      if (role === 'moderator') return ['user', 'moderator']
      if (role === 'admin') return ['user', 'moderator', 'admin']
      return ['user']
    },
    save () {
      // if no permision choosed or choosed is equal to already top then return
      if (!this.permision || this.topPermision === this.permision) return this.isEditing = false

      this.$emit('updateUserPermision',{ ...this.value, roles: this.setRoles(this.permision) })
    }
  }
}
</script>
