<template>
  <div class="section-manager-sidenav">
    <router-link :to="`/manager/${ category.path }`" class="section-manager-sidenav__item" v-for="category in categories" :key="category.path">
      {{ `${ category.title } (${ category.path })` }}
    </router-link>
    <a href="#" class="section-manager-sidenav__item section-manager-sidenav__item" @click="modal = true">
      <span class="section-manager-sidenav__add-text">
         Добавить категорию
      </span>
      <span class="section-manager-sidenav__add-plus">
         +
      </span>
    </a>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <manager-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import ManagerModal from '@/components/manager/ManagerModal'
import AppModal from '@/components/ui/AppModal'

export default {
  components: { AppModal, ManagerModal },
  setup() {
    const modal = ref(false)
    const store = useStore()
    const categories = computed(() => store.getters.categories)

    return {
      modal,
      categories
    }
  }
}
</script>

<style scoped>

</style>
