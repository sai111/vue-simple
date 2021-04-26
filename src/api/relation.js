import request from '@/utils/request'

export function getRelationList(query) {
  return request({
    url: '/vue-simple/relation/list',
    method: 'get',
    params: query
  })
}
