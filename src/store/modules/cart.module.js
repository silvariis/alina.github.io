import axios from '@/axios/request'

export default {
  namespaced: true,
  state() {
    return {
      cart: {
        price: 0,
        items: []
      }
    }
  },
  mutations: {
    addInCart(state, product) {
      const item = state
        .cart
        .items
        .find(el => el.id === product.id)
      if (item) {
        item.quantity++
      } else {
        state.cart.items.push(product)
      }
      state.cart.price += +product.options.price
    },
    removeOneFromCart(state, product) {
      const item = state.cart.items.find(el => el.id === product.id)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        }
      }
      state.cart.price -= +product.options.price
    },
    clearCart(state) {
      state.cart = {
        price: 0,
        items: []
      }
    },
    changeProductQuantity(state, payload) {
      const item = state.cart.items.find(el => el.id === payload.product.id)

      if (item) {
        const costDifference = Number(payload.value * item.options.price) - Number(item.options.price * item.quantity)
        item.quantity = payload.value
        state.cart.price += costDifference
      }
    },
    addComment(state, product) {
      let item = state.cart.items.find(el => el.id === product.id)

      if (item) {
        item = { ...product }
      }
    }
  },
  actions: {
    addInCart({ commit }, product) {
      commit('addInCart', product)
    },
    removeOneFromCart({ commit }, product) {
      commit('removeOneFromCart', product)
    },
    changeProductQuantity({ commit }, payload) {
      commit('changeProductQuantity', payload)
    },
    addComment({ commit }, product) {
      commit('addComment', product)
    },
    clearCart({ commit }) {
      commit('clearCart')
    },
    async postOrder(_, cart) {
      await axios.post('/orders.json', cart)
    }
  },
  getters: {
    cart(state) {
      return state.cart
    },
    cartPrice(state) {
      return state.cart.price
    }
  }
}
