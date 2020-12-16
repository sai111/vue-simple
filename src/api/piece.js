import request from '@/utils/request'

export function getTree(query) {
  return request({
    url: '/vue-simple/svg/treeXmind/list',
    method: 'get',
    params: query
  })
}
