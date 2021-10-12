
<template>
  <span class="section-cart-item__count-minus" @click="$emit('decrementQuantity')"></span>
  <input type="number" min="1" class="section-cart-item__count-input" v-model="count" @input="$emit('inputQuantity', count)">
  <span class="section-cart-item__count-plus" @click="$emit('incrementQuantity')"></span>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  emits: ['incrementQuantity', 'decrementQuantity', 'inputQuantity'],
  props: ['quantity'],
  setup(props) {
    const count = ref(props.quantity)
    watch(count, () => {
      if (count.value < 0 || !count.value) {
        count.value = 1
      } else if (count.value > 999) {
        count.value = 999
      }
    })
    return {
      count
    }
  }
}
</script>

<style scoped>

</style>
