import axios from '@/axios/request'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addProduct(state, product) {
      state.products.push(product)
    },
    removeProduct(state, id) {
      state.products = state.products.filter(el => el.id !== id)
    }
  },
  actions: {
    async addProduct({ commit, dispatch, rootGetters }, payload) {
      try {
        const token = rootGetters['auth/token']
        const { data } = await axios.post(`/products.json?auth=${token}`, payload)
        commit('addProduct', { ...payload, id: data.name })
        dispatch('message/setMessage', {
          value: 'Продукт успешно создан',
          type: 'primary'
        }, { root: true })
      } catch (e) {
      }
    },
    async updateProduct({ commit, dispatch, rootGetters }, payload) {
      try {
        const token = rootGetters['auth/token']
        await axios.put(`/products/${payload.id}.json?auth=${token}`, payload)
        dispatch('message/setMessage', {
          value: 'Продукт успешно обновлен',
          type: 'primary'
        }, { root: true })
      } catch (e) {
      }
    },
    async removeProduct({ commit, dispatch, rootGetters }, id) {
      try {
        const token = rootGetters['auth/token']
        await axios.delete(`/products/${id}.json?auth=${token}`)
        commit('removeProduct', id)
        dispatch('message/setMessage', {
          value: 'Продукт успешно удален',
          type: 'primary'
        }, { root: true })
      } catch (e) {
      }
    },
    async removeProductsByCategory({ commit, dispatch, getters, rootGetters }, category) {
      const token = rootGetters['auth/token']
      const productIds = getters.products.filter(el => el.category === category).map(el => el.id)
      const promises = productIds.map(id => axios.delete(`/products/${id}.json?auth=${token}`))
      await Promise.all(promises)
    },
    async loadProducts({ commit }) {
      try {
        const { data } = await axios.get('/products.json')
        const products = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('setProducts', products)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    productById: (state) => (id) => {
      return state.products.find(el => el.id === id)
    },
    productInitialState() {
      return {
        name: '',
        description: '',
        image: '',
        category: '',
        options: []
      }
    }
  }
}
