const Mock = require('mockjs')
const list = {
  title: '中心主题' + Mock.mock('@ctitle(5,20)'),
  value: null,
  children: []
}
// const count = Mock.mock('@natural(1,5)')
const count = 2
for (let i = 0; i < count; i++) {
  list.children.push(Mock.mock({
    id: '@id',
    name: '父级标题' + i + '@ctitle(5,10)',
    value: '@url',
    'children|1-5': [
      {
        id: '@id',
        name: '子级标题' + i + '@ctitle(5,10)',
        value: '@url',
        'children|1-5': [
          {
            id: '@id',
            title: '子级标题' + i + '@ctitle(5,10)',
            value: '@url'
          }
        ]
      }
    ]
  }))
}
console.log(list, 'list')
module.exports = [
  {
    url: '/vue-simple/relation/list',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: list
      }
    }
  }
]
