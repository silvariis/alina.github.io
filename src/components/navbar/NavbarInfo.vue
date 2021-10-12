<template>
  <div class="section-outer section-header-main">
    <div class="section-inner">
      <div class="section-header-main-logo">
        <mobile-menu></mobile-menu>
        <router-link to="/" class="section-header-main-logo__inner">
          <div class="logo-img">
            <img src="../../assets/logo.png" alt="Logo">
          </div>
          <div class="section-header-main-text">foodleggers</div>
        </router-link>
      </div>
      <a href="tel:+79833590545" class="section-header-main-tel">
        <svg class="tel">
          <use xlink:href="#tel"></use>
        </svg>
        <div class="section-header-main-tel-text">
          +7 983 359 05 45
        </div>
      </a>
      <a href="mailto:alin.nst02@gmail.com" class="section-header-main-mail">
        <svg class="mail">
          <use xlink:href="#mail"></use>
        </svg>
        <div class="section-header-main-mail-text">
          alin.nst02@gmail.com
        </div>
      </a>
      <router-link to="/cart" style="text-decoration: none" class="section-header-main-shopping-cart">
        <svg class="shopping-cart">
          <use xlink:href="#shopping-cart"></use>
        </svg>
        <div class="section-header-main-shopping-cart-text" v-if="cartPrice">
          {{ cartPrice }} ₽
        </div>
        <div class="section-header-main-shopping-cart-text--empty" v-else>
          Корзина пуста
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/navbar/NavbarMobile'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()

    return {
      cartPrice: computed(() => store.getters['cart/cartPrice'])
    }
  },
  components: { MobileMenu }
}
</script>

<style scoped>

</style>
