<template>
  <app-loader v-if="loading"></app-loader>
  <component :is="layout + '-layout'" v-else></component>
</template>

<script>
import ShopLayout from '@/layout/ShopLayout'
import ManagerLayout from '@/layout/ManagerLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const loading = computed(() => store.state.loading)

    return {
      layout: computed(() => route.meta.layout),
      loading
    }
  },
  components: { AppLoader, ShopLayout, ManagerLayout }
}
</script>

<style scoped>

</style>
