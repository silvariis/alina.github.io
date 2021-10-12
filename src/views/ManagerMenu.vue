<template>
  <app-loader v-if="loading"></app-loader>
  <div class="section-manager-page" v-else>
    <div class="section-manager-title">
      <span>
        Редактирование меню: {{ category.title }}
        <a class="button-delete" href="#" @click="removeCategory(category.id)">Удалить</a>
      </span>
    </div>

    <table class="section-manager-table">
      <thead>
      <tr>
        <td>
          <router-link :to="`/manager/${category.path}/new`" class="section-manager-add-product">Добавить продукт</router-link>
        </td>
      </tr>
      </thead>
      <tbody>
        <tr>
          <th></th>
          <th>Изображение</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Размеры и цены</th>
        </tr>

        <tr v-for="(product, idx) in products" :key="product.id">
          <td>{{ idx + 1 }}</td>
          <td>
            <img :src="product.image" :alt="product.name">
          </td>
          <td>{{ product.name }}</td>
          <td class="section-manager-product__description">{{ product.description }}</td>
          <td>
            <div v-for="option in product.options" :key="option.id">
              {{ `${option.size}: ${option.price} ₽` }}
            </div>
          </td>
          <td class="section-manager-product__buttons">
            <div class="section-manager-product__button">
              <router-link :to="`/manager/${category.path}/${product.id}`">Редактировать</router-link>
            </div>
            <div class="section-manager-product__button delete">
              <a href="#" @click="removeProduct(product.id)">Удалить</a>
            </div>
          </td>
        </tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'

export default {
  components: { AppLoader },
  props: ['curMenu'],
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const loading = ref(true)
    const category = computed(() => store.getters.categoryByPath(props.curMenu))
    const products = computed(() => store.getters['products/products'].filter(el => el.category === props.curMenu))
    const removeProduct = (id) => {
      store.dispatch('products/removeProduct', id)
    }
    const removeCategory = async (id) => {
      await store.dispatch('removeCategories', id)
      router.push('/manager')
      await store.dispatch('products/removeProductsByCategory', category.value.path)
    }

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
      removeProduct,
      removeCategory,
      loading
    }
  }
}
</script>

<style scoped>

</style>
