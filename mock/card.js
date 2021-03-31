const Mock = require('mockjs')

const List = []
const count = 10
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@title(5, 10)',
    'status|1': ['high', 'middle', 'low', '']
  }))
}

module.exports = [{
    url: '/vue-element-admin/card/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: List.length,
          list: List
        }
      }
    }
  }
  //{
  //  url: '/vue-element-admin/article/detail',
  //  type: 'get',
  //  response: config => {
  //    const { id } = config.query
  //    for (const article of List) {
  //      if (article.id === +id) {
  //        return {
  //          code: 20000,
  //          data: article
  //        }
  //      }
  //    }
  //  }
  //}
]
