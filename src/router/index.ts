import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/layout/replaceText'
  },
  {
    path: '/layout',
    component: () => import('@/layout/index.vue'),
    children: [{ path: 'replaceText', component: () => import('@/views/replaceText/index.vue') }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
