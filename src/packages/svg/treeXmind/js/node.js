import { markNodeData } from './utils'
import objectAssign from './merge'

const getPropertyFromData = function(node, prop) {
  const props = node.store.props
  const data = node.data || {}
  const config = props[prop]
  if (typeof config === 'function') {
    return config(data, node)
  } else if (typeof config === 'string') {
    return data[config]
  } else if (typeof config === 'undefined') {
    const dataProp = data[prop]
    return dataProp === undefined ? '' : dataProp
  }
}

let nodeIdSpeed = 0

export default class Node {
  constructor(options, isLeftChild = false) {
    this.isLeftChild = isLeftChild
    this.id = nodeIdSpeed++
    this.data = null
    this.isCurrent = false
    this.isCurrent = false
    this.visible = true
    this.parent = null
    this.expanded = false
    this.leftExpanded = false
    this.direction = 'right'
    for (const key in options) {
      // if (options.hasOwnProperty(key)) {
      //   this[key] = options[key]
      // }
      this[key] = options[key]
    }
    this.level = 0
    this.childNodes = []
    this.leftChildNodes = []
    this.sum = 0
    this.len = 0
    if (this.parent) {
      this.level = this.parent.level + 1
    }
    if (this.data) {
      this.sum = this.data.sum
      this.len = this.data.len
      this.direction = this.data.directionFlag
    }
    const store = this.store
    if (!store) {
      throw new Error('[Node]store is required!')
    }
    store.registerNode(this)
    if (this.data) {
      this.setData(this.data, isLeftChild)
      if (store.defaultExpandAll || !store.showCollapsable) {
        this.expanded = true
        this.leftExpanded = true
      }
    }

    if (!Array.isArray(this.data)) {
      markNodeData(this, this.data)
    }
    if (!this.data) return
    const defaultExpandedKeys = store.defaultExpandedKeys
    const key = store.key
    // 展开的条件
    if (
      key &&
      defaultExpandedKeys &&
      defaultExpandedKeys.indexOf(this.key) !== -1
    ) {
      this.expand(null, true)
    }

    if (
      key &&
      store.currentNodeKey !== undefined &&
      this.key === store.currentNodeKey
    ) {
      store.currentNode = this
      store.currentNode.isCurrent = true
    }
    this.updateLeafState()
  }

  // 赋值
  setData(data, isLeftChild) {
    if (!Array.isArray(data)) {
      markNodeData(this, data)
    }
    // const store = this.store
    this.data = data
    this.childNodes = []
    let children
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data
    } else {
      children = getPropertyFromData(this, 'children') || []
    }
    for (let i = 0; i < children.length; i++) {
      this.insertChild({ data: children[i] }, null, null, isLeftChild)
    }
  }

  get key() {
    const nodeKey = this.store.key
    if (this.data) return this.data[nodeKey]
    return null
  }

  get label() {
    return getPropertyFromData(this, 'label')
  }
  // 是否左右模式
  hasLeftChild() {
    const store = this.store
    return store.onlyBothTree && store.direction === 'horizontal'
  }

  // 插入数据
  insertChild(child, index, batch, isLeftChild) {
    if (!child) throw new Error('insertChild error: child is required')
    if (!(child instanceof Node)) {
      if (!batch) {
        const children = this.getChildren(true)
        if (children.indexOf(child.data) === -1) {
          if (typeof index === 'undefined' || index < 0) {
            children.push(child.data)
          } else {
            children.splice(index, 0, child.data)
          }
        }
      }
      objectAssign(child, { parent: this, store: this.store })
      child = new Node(child, isLeftChild)
    }
    child.level = this.level + 1
    if (typeof index === 'undefined' || index < 0) {
      this.childNodes.push(child)
    } else {
      this.childNodes.splice(index, 0, child)
    }
    this.updateLeafState()
  }

  getChildren(forceInit = false) {
    if (this.level === 0) return this.data
    const data = this.data
    if (!data) return null
    const props = this.store.props
    let children = 'children'
    if (props) {
      children = props.children || 'children'
    }
    if (data[children] === undefined) {
      data[children] = null
    }
    if (forceInit && !data[children]) {
      data[children] = []
    }
    return data[children]
  }

  // 判断是否是分支
  updateLeafState() {
    if (
      this.store.lazy === true &&
      this.loaded !== true &&
      typeof this.isLeafByUser !== 'undefined'
    ) {
      this.isLeaf = this.isLeafByUser
      return
    }
    const childNodes = this.childNodes
    if (!this.store.lazy || (this.store.lazy === true && this.loaded === true)) {
      this.isLeaf = !childNodes || childNodes.length === 0
      return
    }
    this.isLeaf = false
  }
  // 节点的收起
  collapse() {
    this.expanded = false
  }
  // 节点的展开
  expand(callback, expandParent) {
    const done = () => {
      if (expandParent) {
        let parent = this.parent
        while (parent.level > 0) {
          parent.isLeftChild ? (parent.leftExpanded = true) : (parent.expanded = true)
          parent = parent.parent
        }
      }
      this.isLeftChild ? (this.leftExpanded = true) : (this.expanded = true)
      if (callback) callback()
    }
    done()
  }

  // 移除child
  /**
   * indexOf对大小写敏感
   * indexOf如何没有找到返回-1
   * deregisterNode这个方法不理解意思
   */
  removeChild(child) {
    const children = this.getChildren() || []
    const dataIndex = children.indexOf(child.data)
    // 如果存在,截取完整数据
    if (dataIndex > -1) {
      children.splice(dataIndex, 1)
    }
    const index = this.childNodes.indexOf(child)
    if (index > -1) {
      this.store && this.store.deregisterNode(child)
      child.parent = null
      this.childNodes.splice(index, 1)
    }
    this.updateLeafState()
  }

  // 在这之后插入
  insertBefore(child, ref) {
    let index
    if (ref) {
      index = this.childNodes.indexOf(ref)
    }
    this.insertChild(child, index)
  }

  insertAfter(child, ref) {
    let index
    if (ref) {
      index = this.childNodes.indexOf(ref)
      if (index !== -1) index += 1
    }
    this.insertChild(child, index)
  }
}
