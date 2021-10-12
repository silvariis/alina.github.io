<template>
  <app-loader v-if="loading"></app-loader>
  <div class="section-products section-cart section-products--beige" v-else>
    <div class="section-inner">
      <div class="title">
        Ваш заказ успешно принят!
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

export default {
  components: { AppLoader },
  props: ['curMenu'],
  setup(props) {
    const store = useStore()
    const category = computed(() => store.getters.categoryByPath(props.curMenu))
    const products = computed(() => store.getters['products/products'].filter(el => el.category === props.curMenu))
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
      category,
      products,
      loading
    }
  }
}
</script>

<style scoped>

</style>
