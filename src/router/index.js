import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: HomeView,
    children: [
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/AdminProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/CouponsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
