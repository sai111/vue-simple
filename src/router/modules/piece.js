
const files = require.context('@/packages', true, /entry.vue$/)
const pages = {}
files.keys().forEach((key) => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
// 生成路由规则
const generator = []
Object.keys(pages).forEach((item) => {
  const arr = item.split('/')
  generator.push({
    path: arr[1],
    name: `${pages[item].name.replace(/-/g, '/')}`,
    component: (resolve) => require(['@/packages/' + arr[0] + '/' + arr[1] + '/entry'], resolve),
    meta: { title: arr[1], icon: '' }
  })
})
const piecesRouter = {
  path: '/viewPiece',
  component: () => import('@/views/view-piece/index'),
  name: 'ViewPiece',
  meta: { title: '效果集合', icon: '' },
  children: [
    ...generator
    // ,{
    //   path: 'treeXmind',
    //   component: () => import('@/packages/svg/treeXmind/entry'),
    //   name: 'Entry',
    //   meta: { title: '1效果集合', icon: '' },
    // }
  ]
}
export default piecesRouter
