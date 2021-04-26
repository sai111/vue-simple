
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
    function each(data, level = 1, parent = null) {
      if (data && Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const v = data[i]
          v.level = level
          if (level > max) {
            max = level
          }
          if (parent) {
            v.parent = parent
            v.len = parent.children.length
          }
          if (v.children && v.children.length > 0) {
            each(v.children, level + 1, v)
          }
        }
      }
    }
    each(data, 1)
    return max
  }
}
