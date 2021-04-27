export default class TransferTree {
  constructor(options) {
    this.tree = []
    this.init(options.data)
  }

  init(data) {
    this.maxLevel = this.getMaxFloor(data, 1)
    this.tree = data
  }
  getMaxFloor(data) {
    let max = 0
    let parentArr = []
    function each(data, level = 1, id = 0, len1 = 0, len2 = 0) {
      if (data && Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const v = data[i]
          v.level = level
          if (level > max) {
            max = level
          }
          v.sequence = i
          if (id && v.id === id) {
            parentArr = [v]
          }
          v.len = len2
          len2 += Math.max(1, v.children ? v.children.length : 0)
          if (v.children && v.children.length > 0) {
            each(v.children, level + 1, v.id, len1, len2)
            if (parentArr !== undefined) {
              parentArr = parentArr.concat(v)
              v.parent = parentArr
            }
          }
        }
      }
    }
    each(data, 1, 0)
    return max
  }
  treeFindPath(tree, func, path = []) {
    if (!tree) return []
    for (const data of tree) {
      path.push(data)
      if (func(data)) return path
      if (data.children) {
        const findChildren = treeFindPath(data.children, func, path)
        if (findChildren.length) return findChildren
      }
      path.pop()
    }
    return []
  }
  getParentId(list, id) {
    for (const i in list) {
      if (list[i].id === id) {
        return [list[i]]
      }
      if (list[i].children) {
        const node = getParentId(list[i].children, id)
        if (node !== undefined) {
          return node.concat(list[i])
        }
      }
    }
  }
}
