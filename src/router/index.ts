import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    component: () => import('@/layout/index.vue'),
    children: [{ path: 'home', component: () => import('@/views/home/index.vue') }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
