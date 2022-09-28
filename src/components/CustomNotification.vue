<template>
  <div>
    <div v-for="notification in notificationList" :class="['notification', notification.typeOfNotification]" :key="notification">
      <p v-for="text in notification.text" class="text" :key="text">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notificationList () { return this.$store.getters.getNotifications }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.notification {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  opacity: .85;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: $blueDark;
  color: $white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 20px;
  transition: all .6s ease-in-out;

  &.success,
  &.info,
  &.warning,
  &.danger {
    top: 0;
  }
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
