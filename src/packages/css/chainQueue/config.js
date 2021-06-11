/** chainQueus配置项 */
// 前端本地队列
let isFunc = (v) => typeof v === 'function'
const assert = (condition, msg) => {
  if (!condition) throw new Error(`${msg}`)
}

class chainQueue {
  constructor(items) {
    this.items = items || []
    this.maxNum = 20
  }
  // 添加数组队列
  enterArrayQueue(node) {
    Array.isArray(node)
    node.map((item) => this.items.push(item))
  }
  
  // 添加队列
  enterQueue(node) {
    if (this.items.length > this.maxNum) {
      return
    }
    if (Array.isArray(node)) {
      node.map((item) => this.items.push(item))
    } else {
      this.items.push(node)
    }
  }

  // 删除队列，返回删除的当前数据
  deleteQueue(func = () => {}) {
    assert(isFunc(func), `${func} is not function`)
    func(this.items.shift())
  }

  // 返回队列的第一个
  front() {
    return this.items[0]
  }
  // 清楚队列
  clear() {
    this.items = []
  }

  get size() {
    return this.items.length
  }
  get isEmpty() {
    return !this.items.length
  }
  print() {
    console.log(this.items.toString(), this.items, 'bbbbbb--->>>')
  }
  return () {
    return this.items
  }
}

export default chainQueue
