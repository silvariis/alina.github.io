import { createStore } from 'vuex'
import cart from './modules/cart.module'
import auth from './modules/auth.module'
import message from './modules/message.module'
import products from './modules/products.module'
import axios from '@/axios/request'

export default createStore({
  state: {
    categories: [],
    isLoading: true,
    refCount: 0
  },
  mutations: {
    addCategory(state, category) {
      state.categories.push(category)
    },
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async addCategory({ commit, dispatch, rootGetters }, payload) {
      try {
        const token = rootGetters['auth/token']
        const { data } = await axios.post(`/categories.json?auth=${token}`, payload)
        commit('addCategory', { ...payload, id: data.name })
        dispatch('message/setMessage', {
          value: 'Категория успешно создана',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        console.log(e)
      }
    },
    async loadCategories({ commit }) {
      const { data } = await axios.get('/categories.json')
      const categories = Object.keys(data).map(id => ({ ...data[id], id }))
      commit('setCategories', categories)
    },
    async removeCategories({ commit, dispatch, rootGetters }, id) {
      try {
        const token = rootGetters['auth/token']
        await axios.delete(`/categories/${id}.json?auth=${token}`)
        dispatch('message/setMessage', {
          value: 'Категория успешно удалена',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoryByPath: (state) => (pathName) => {
      return state.categories.find(el => el.path === pathName)
    }
  },
  modules: {
    cart,
    auth,
    message,
    products
  }
})

// {
//   title: 'burgers',
//   list: [
//     {
//       name: 'Чизбургер',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
//       options: [
//         {
//           price: 450,
//           size: 'Большой',
//           id: 1
//         },
//         {
//           price: 350,
//           size: 'Средний',
//           id: 2
//         },
//         {
//           price: 250,
//           size: 'Маленький',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     },
//     {
//       name: 'Фишбургер',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute rure dolor in',
//       options: [
//         {
//           price: 550,
//           size: 'Большой',
//           id: 1
//         },
//         {
//           price: 450,
//           size: 'Средний',
//           id: 2
//         },
//         {
//           price: 350,
//           size: 'Маленький',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     }
//   ]
// },
// {
//   title: 'pizza',
//   list: [
//     {
//       name: 'Пеперони',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
//       options: [
//         {
//           price: 450,
//           size: 'Большая',
//           id: 1
//         },
//         {
//           price: 350,
//           size: 'Средняя',
//           id: 2
//         },
//         {
//           price: 250,
//           size: 'Маленькая',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     },
//     {
//       name: 'Гавайская',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute rure dolor in',
//       options: [
//         {
//           price: 550,
//           size: 'Большая',
//           id: 1
//         },
//         {
//           price: 450,
//           size: 'Средняя',
//           id: 2
//         },
//         {
//           price: 350,
//           size: 'Маленькая',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     }
//   ]
// },
// {
//   title: 'coffee',
//   list: [
//     {
//       name: 'Американо',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
//       options: [
//         {
//           price: 450,
//           size: 'Большой',
//           id: 1
//         },
//         {
//           price: 350,
//           size: 'Средний',
//           id: 2
//         },
//         {
//           price: 250,
//           size: 'Маленький',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     },
//     {
//       name: 'Раф',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute rure dolor in',
//       options: [
//         {
//           price: 550,
//           size: 'Большой',
//           id: 1
//         },
//         {
//           price: 450,
//           size: 'Средний',
//           id: 2
//         },
//         {
//           price: 350,
//           size: 'Маленький',
//           id: 3
//         }
//       ],
//       imageSrc: 'https://canapeclub.ru/image/cache/catalog/burger/megashefburger-min-500x500.jpg'
//     }
//   ]
// }
