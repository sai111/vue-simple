import request from '@/utils/request'

export function getCardList(query) {
  return request({
    url: '/vue-element-admin/card/list',
    method: 'get',
    params: query
  })
}
