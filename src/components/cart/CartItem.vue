<template>
  <div class="section-products-item section-products-item--beige">
    <div class="section-products-item-inner">
      <div class="section-products-item__img">
        <img :src="product.image" :alt="product.name">
      </div>
      <div class="section-products-item__title">
        {{ product.name }}
      </div>
      <div class="section-products-item__description">
        {{ product.options.size }}
      </div>
      <textarea class="section-cart-item__comment" placeholder="Комментарий" @input="addComment" v-model="comment"></textarea>
    </div>
    <div class="section-products-item__price-and-button">
      <div class="section-products-item__price">{{ price }} ₽</div>
        <div class="section-cart-item__count">
          <cart-counter
              :quantity="product.quantity"
              @increment-quantity="add"
              @decrement-quantity="removeOne"
              @input-quantity="changeQuantity"
              :key="product.quantity"
          ></cart-counter>
        </div>
    </div>
  </div>

  <!--  <div class="section-cart-item">-->
<!--    <div class="section-cart-item-image">-->
<!--      <img :src="product.imageSrc" :alt="product.name">-->
<!--    </div>-->
<!--    <div class="section-cart-item-content">-->
<!--      <div class="section-cart-item-content&#45;&#45;left">-->
<!--        <div class="section-cart-item__title">-->
<!--          {{ product.name }}-->
<!--        </div><div class="section-cart-item__size">-->
<!--        {{ product.options.size }}-->
<!--      </div>-->
<!--        <textarea class="section-cart-item__comment" placeholder="Комментарий"></textarea>-->
<!--      </div>-->
<!--      <div class="section-cart-item-content&#45;&#45;right">-->
<!--        <div class="section-cart-item__count">-->
<!--          <cart-counter :count-value="product.count"></cart-counter>-->
<!--        </div>-->
<!--        <div class="section-cart-item__price">{{ product.options.price * product.count }} ₽</div>-->
<!--        <div class="section-cart-item__delete-button">-->
<!--          del-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import CartCounter from '@/components/cart/CartCounter'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { debounce } from '@/use/debounce'

export default {
  props: ['product'],
  setup(props) {
    const price = computed(() => props.product.options.price * props.product.quantity)
    const store = useStore()
    const comment = ref('')

    return {
      price,
      comment,
      add: () => store.dispatch('cart/addInCart', props.product),
      removeOne: () => store.dispatch('cart/removeOneFromCart', props.product),
      changeQuantity: (value) => store.dispatch(
        'cart/changeProductQuantity', {
          product: props.product,
          value
        }),
      addComment: debounce(() => {
        store.dispatch('cart/addComment', {
          ...props.product,
          comment: comment.value
        })
      }, 180)
    }
  },
  components: { CartCounter }
}
</script>

<style scoped>

</style>
