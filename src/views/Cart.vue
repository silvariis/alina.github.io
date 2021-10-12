<template>
  <app-loader v-if="loading"></app-loader>
  <div class="section-cart section-products section-products--beige" v-else>
    <div class="section-inner">
      <div class="title">
        {{ cart.items.length ? 'Ваш заказ' : 'Корзина пуста' }}
      </div>
      <div class="section-products-items">
        <cart-item v-for="(product, idx) in cart.items" :key="idx" :product="product"></cart-item>
      </div>
      <div class="section-cart-button">
        <button v-if="cart.items.length" class="cart-apply" @click="makeOrder">Заказать доставку</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CartItem from '@/components/cart/CartItem'
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import { useRouter } from 'vue-router'

export default {
  components: { AppLoader, CartItem },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const router = useRouter()
    const cart = store.getters['cart/cart']

    const makeOrder = async () => {
      await store.dispatch('cart/postOrder', cart)
      await store.dispatch('cart/clearCart')
      router.push('/success-order')
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
      cart,
      loading,
      makeOrder
    }
  }
}
</script>

<style scoped>

</style>
