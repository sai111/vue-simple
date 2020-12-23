const Mock = require('mockjs')
const treeList = {
  title: '中心主题' + Mock.mock('@ctitle(5,20)'),
  value: null,
  children: []
}
// const count = Mock.mock('@natural(1,5)')
const count = 2
for (let i = 0; i < count; i++) {
  treeList.children.push(Mock.mock({
    id: '@id',
    title: '父级标题' + i + '@ctitle(5,10)',
    value: '@url',
    'edit|1': [true, false],
    'direction|1': ['left', 'right'],
    webType: '',
    'children|1-5': [
      {
        id: '@id',
        title: '子级标题' + i + '@ctitle(5,10)',
        value: '@url',
        'edit|1': [true, false],
        webType: '',
        'children|1-5': [
          {
            id: '@id',
            title: '子级标题' + i + '@ctitle(5,10)',
            value: '@url',
            'edit|1': [true, false],
            webType: ''
          }
        ]
      }
    ]
  }))
}
module.exports = [
  {
    url: '/vue-simple/svg/treeXmind/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: treeList
      }
    }
  }
]
