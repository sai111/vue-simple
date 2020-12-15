const piecesRouter = {
  path: '/viewPiece',
  component: () => import('@/views/view-piece/index'),
  name: 'ViewPiece',
  meta: { title: '效果集合', icon: '' },
  children: [
    // {
    //   path: '',
    //   component: () => import('@/views/view-piece/index'),
    //   name: 'ViewPiece',
    //   meta: { title: '1效果集合', icon: '' },
    // }
    // ,{
    //   path: 'treeXmind',
    //   component: () => import('@/packages/svg/treeXmind/entry'),
    //   name: 'Entry',
    //   meta: { title: '1效果集合', icon: '' },
    // }
  ]
}

export default piecesRouter
