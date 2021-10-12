import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu'
import Cart from '@/views/Cart'
import Manager from '@/views/Manager'
import ManagerMenu from '@/views/ManagerMenu'
import ManagerItem from '@/views/ManagerItem'
import SuccessOrder from '@/views/SuccessOrder'

const routes = [
  {
    path: '/menu/:curMenu',
    name: 'menu',
    component: Menu,
    props: true,
    meta: {
      layout: 'shop'
    }
  },
  {
    path: '/',
    redirect: '/menu/burgers'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      layout: 'shop'
    }
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    meta: {
      layout: 'manager'
    }
  },
  {
    path: '/manager/:curMenu',
    name: 'ManagerMenu',
    component: ManagerMenu,
    meta: {
      layout: 'manager'
    },
    props: true
  },
  {
    path: '/manager/:curMenu/new',
    component: ManagerItem,
    props: true,
    meta: {
      layout: 'manager',
      isNew: true
    }
  },
  {
    path: '/manager/:curMenu/:productId',
    component: ManagerItem,
    props: true,
    meta: {
      layout: 'manager'
    }
  },
  {
    path: '/success-order',
    component: SuccessOrder,
    meta: {
      layout: 'shop'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link'
})

export default router
