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
        {{ product.description }}
      </div>
      <div class="section-products-item__radios">
        <div class="section-products-item__radio" v-for="option in product.options" :key="option.id">
          <label>
            <input type="radio" :name="product.name" :value="option.id" class="radio" v-model="selectedOption">
            <span class="radio__text">{{ `${option.price} ₽ - ${option.size}` }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="section-products-item__choice-message" v-if="selectedOption === null">
      Выберите размер
    </div>
    <div class="section-products-item__price-and-button" v-else>
      <div class="section-products-item__price">{{ product.options.find(el => el.id === selectedOption).price }} ₽</div>
      <button class="section-products-item__button" @click="add">
        В корзину
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['product'],
  setup(props) {
    const store = useStore()
    const selectedOption = ref(null)

    const add = () => {
      const payload = {
        ...props.product,
        options: props.product.options.find(el => el.id === selectedOption.value),
        quantity: 1
      }
      store.dispatch('cart/addInCart', payload)
    }

    return {
      selectedOption,
      add
    }
  }
}
</script>

<style scoped>

</style>
