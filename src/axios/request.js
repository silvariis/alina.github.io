import axios from 'axios'
import store from '@/store/modules/auth.module'
import router from '@/router/index'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit.logout()
    router.push('/manager?auth')
  }

  return Promise.reject(error)
})

export default requestAxios
