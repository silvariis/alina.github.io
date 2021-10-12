<template>
  <div class="section-header-product-links section-header-product-links--main-active">
    <div class="section-header-product-links-wrapper">
      <div v-for="category in categories" :key="category.id" class="section-header-product-link">
        <router-link :to="'/menu/' + category.path" class="section-header-product-link">{{ category.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const categories = computed(() => store.getters.categories)

    return {
      categories
    }
  }
}
</script>

<style scoped>

</style>
