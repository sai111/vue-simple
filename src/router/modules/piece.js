import Layout from '@/layout'
const piecesRouter = {
  path: '/viewPieces',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Pieces',
  meta: {
    title: '组件收集',
    icon: ''
  },
  children: [
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/charts/keyboard'),
    //   name: 'KeyboardChart',
    //   meta: { title: 'Keyboard Chart', noCache: true }
    // }
  ]
}

export default piecesRouter
