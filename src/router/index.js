import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import piecesRouter from './modules/piece'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  piecesRouter,
  {
    path: '/dataProgress',
    component: () => import('@/views/data-progress/index'),
    name: 'DataProgress',
    meta: { title: '数据处理', icon: '' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/data-progress/index'),
        name: 'DataProgress',
        meta: { title: '数组1', icon: '' },
        children: []
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
