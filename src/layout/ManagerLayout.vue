<template :key="isAuthenticated">
  <manager-auth v-if="!isAuthenticated"></manager-auth>
  <div class="section-manager" v-else>
    <manager-navbar></manager-navbar>

    <manager-sidenav></manager-sidenav>

    <div class="section-manager-content">

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
import ManagerAuth from '@/components/manager/ManagerAuth'
import ManagerNavbar from '@/components/manager/ManagerNavbar'
import ManagerSidenav from '@/components/manager/ManagerSidenav'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    return {
      isAuthenticated
    }
  },
  components: { ManagerSidenav, ManagerNavbar, ManagerAuth }
}
</script>

<style scoped>

</style>
