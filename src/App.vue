<template>
  <div class='views'>
    <router-view v-slot="{ Component }">
      <transition name="pageChange" mode="out-in">
          <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <TabMenu />
  <Menu></Menu>
  <CustomNotification />
</template>

<script>
import TabMenu from '@/components/menu/side/TabMenu.vue'
import Menu from '@/components/menu/main/Menu.vue'
import CustomNotification from '@/components/CustomNotification.vue';

export default {
  components: {
    TabMenu,
    Menu,
    CustomNotification
  },
  // computed: {
  //   not() { return this.$store.getters.getNotifications }
  // }
}
</script>
<style lang="scss">
.views {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 44px;
  overflow-x: hidden;
  padding: 4px 4px 44px;
}
.pageChange-enter {
  opacity: 0;
}

.pageChange-enter-active {
  transition: opacity 1s ease-in;
}

// .pageChange-leave {
// }

.pageChange-leave-active {
  transition: opacity 1s ease-out;
  opacity: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

@media (min-width: 600px) {
  .views {
    padding: 1rem 1rem 44px;
  }
}

</style>
