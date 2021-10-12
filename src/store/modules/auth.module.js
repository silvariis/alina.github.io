import axios from 'axios'
import { error } from '@/utils/error'

const TOKEN_KEY = 'jwt-token'
const EMAIL_KEY = 'email'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY) || null,
      email: localStorage.getItem(EMAIL_KEY) || null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(EMAIL_KEY)
      state.token = null
      state.email = null
    },
    setEmail(state, email) {
      state.email = email
      localStorage.setItem(EMAIL_KEY, email)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setEmail', data.email)
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch('message/setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    },
    email(state) {
      return state.email
    }
  }
}
// TODO UNAUTH
