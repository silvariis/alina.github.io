<template>
  <app-loader v-if="loading"></app-loader>
  <div class="section-manager-page" v-else>
    <div class="section-manager-title">
      {{ productId ? `Редактирование продука: ${product.name}` : 'Новый продукт'}}
    </div>
    <form class="section-manager-form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="name">Название</label>
        <input type="text" id="name" placeholder="Введите название" v-model="name">
        <small v-if="nError">{{ nError }}</small>
      </div>

      <div class="form-control">
        <label for="description">Описание</label>
        <input type="text" id="description" placeholder="Введите описание" v-model="description">
        <small v-if="dError">{{ dError }}</small>
      </div>

      <div class="form-control">
        <label for="image">Ссылка на картинку</label>
        <input type="text" id="image" placeholder="Вставьте ссылку" v-model="image">
        <small v-if="iError">{{ iError }}</small>
      </div>

      <div class="form-control">
        <label>Варианты для покупки</label>
        <div class="form-flex">
          <input type="number" id="price" placeholder="Введите цену" v-model="option.price">
          <input type="text" id="size" placeholder="Введите размер" v-model="option.size">
          <a href="#" class="button-apply" @click="addOption(options)">+</a>
        </div>
        <div class="section-manager-options">
          <small v-if="oError">{{ oError }}</small>
          <div class="section-manager-option" v-for="option in options" :key="option.id">
            <span>Цена: {{ option.price }} | Размер: {{ option.size }}</span>
            <a href="#" @click="options = options.filter(oldOption => oldOption.id !== option.id)">Удалить</a>
          </div>
        </div>
      </div>

      <div class="section-manager-button-and-message">
        <button type="submit" :disabled="isSubmitting" class="button-apply">
          {{ productId ? `Обновить` : 'Создать'}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>

import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useProductForm } from '@/use/product-form'
import AppLoader from '@/components/ui/AppLoader'

export default {
  props: ['curMenu', 'productId'],
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const option = reactive({
      price: '',
      size: ''
    })
    const product = props.productId
      ? store.getters['products/productById'](props.productId)
      : store.getters['products/productInitialState']
    const countOptionsCreated = ref(
      props.productId
        ? product.options.length
        : 0
    )

    const addOption = (options) => {
      options.push({
        ...option,
        id: countOptionsCreated.value
      })
      option.price = ''
      option.size = ''
      countOptionsCreated.value++
    }
    const submit = async values => {
      const payload = {
        ...values,
        category: props.curMenu
      }
      props.productId
        ? await store.dispatch('products/updateProduct', payload)
        : await store.dispatch('products/addProduct', payload)
      router.push(`/manager/${props.curMenu}`)
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
      option,
      addOption,
      ...useProductForm(submit, { ...product }),
      product,
      loading
    }
  },
  components: { AppLoader }
}
</script>

<style scoped>

</style>
