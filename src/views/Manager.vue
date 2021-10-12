<template>
  <app-loader v-if="loading"></app-loader>
  <div class="section-manager-page" v-else>
    <div class="section-manager-title">
      Заказы
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'

export default {
  components: { AppLoader },
  setup() {
    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      loading.value = true
      await Promise.all([
        store.dispatch('loadCategories'),
        store.dispatch('products/loadProducts')
      ])
      loading.value = false
    })

    return {
      loading
    }
  }
}
</script>

<style scoped>

</style>
