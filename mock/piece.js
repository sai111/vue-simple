const Mock = require('mockjs')
const treeList = []
const count = Mock.mock('@natural(1,5)')
for (let i = 0; i < count; i++) {
  treeList.push(Mock.mock({
    id: '@id',
    title: '父级标题' + i + '@ctitle(5,10)',
    value: '@url',
    'edit|1': [true, false],
    webType: '',
    'children|3-5': [
      {
        id: '@id',
        title: '子级标题' + i + '@ctitle(5,10)',
        value: '@url',
        'edit|1': [true, false],
        webType: ''
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
        data: {
          total: treeList.length,
          list: treeList
        }
      }
    }
  }
]
