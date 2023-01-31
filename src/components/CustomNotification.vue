<template>
  <div class='notifications-wrapper'>
    <div v-for="notification, index in toRemoveQueue" :class="['notification', notification.typeOfNotification]" :key="notification">
      <p v-for="text in notification.text" class="text"  :key="text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, watch } from 'vue';

const store = useStore()
const toRemoveQueue = ref([])

watch(store.getters.getNotifications, () => {
  const list = store.getters.getNotifications 
  const ids = new Set(toRemoveQueue.value.map(n => n.id))
  const dif = list.filter(n => !ids.has(n.id)) // check for new notifications

  if (!dif.length) return null // do nothing if notifications are removed from store
  
  console.log('dif list ids', dif, list, ids)

  toRemoveQueue.value.unshift(...dif)
  const t = setTimeout(() => {
    toRemoveQueue.value.pop()
    clearTimeout(t)
  }, 10000)
})

</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.notifications-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  gap: 4px;
  z-index: 10;
}
.notification {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  opacity: .85;
  display: flex;
  flex-direction: column;
  background-color: $blueDark;
  color: $white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 20px;
  &.success {
    background-color: $valid;
  }
  &.info {
    background-color: rgba($blueDark,.4)
  }
  &.warning {
    background-color: rgba($warning, .4)
  }
  &.danger {
    background-color: $dangerous;
  }
  .text {
    white-space: pre-wrap;
  }
}
</style>
