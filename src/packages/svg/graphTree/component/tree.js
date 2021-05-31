export default class TransferTree {
  constructor(options) {
    this.tree = []
    this.init(options.data)
  }
  init(data) {
    //this.maxLevel = this.getMaxFloor(data, 1)
    this.rhTransferData(data)
    this.tree = data
  }

  rhTransferData(data, level = 1, id) {
    const _self = this
    if (Array.isArray(data)) {
      data.forEach((v, i) => {
        v.level = level
        v.parentId = id || 0
        v.sequence = i
        if (v.children && v.children.length) {
          const _clen = v.children.length
          const isOdd = !(_clen % 2 === 0)
          v.cChildIndex = isOdd ? ((_clen + 1) / 2) - 1 : (_clen / 2)
          v.isOdd = isOdd
          _self.rhTransferData(v.children, level + 1, v.id)
        } else {
          v.cChildIndex = 0
          v.isOdd = true
        }
      })
    }
  }

  getMaxFloor(data) {
    let max = 0
    let parentArr = []

    function each(data, level = 1, id = 0) {
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
          //v.len = len2
          //len2 += Math.max(1, v.children ? v.children.length : 0)
          if (v.children && v.children.length > 0) {
            each(v.children, level + 1, v.id)
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

  /**
   * https://www.d3js.org.cn/document/d3-hierarchy/
   * http://www.qiutianaimeili.com/html/page/2020/08/2059av2l2r7z184.html
   * @param {*} 数据预处理
   * 使用 d3.hierarchy 进行数据的处理，转化为层级图都需要的数据 
   * 转换为：
   * children: 节点的子节点
   * data: 节点的原始数据
   * depth: 节点深度，根节点为 0
   * height: 节点的高度，叶子节点为 0
   * parent: 节点的父节点，根节点为 null
   * 资料：
   * https://github.com/antvis/hierarchy
   */
}
