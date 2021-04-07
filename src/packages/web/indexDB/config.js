/** indexDB配置项 */
import { openDB } from 'idb'
const DEFAULT_LIMIT = 10
// https://github.com/jakearchibald/idb
/**
 * 基于浏览器indexedDB实现的栈存储工具
 * 在不兼容 IndexedDB的情况下回采用 localStorage 回退方案
 * options:
 * databaseName: string 数据库名称
 * databaseVersion： Number|String 版本
 * storeNames: Array  创建的Store
 * limit: Number 栈长度限制，默认值10
 * api: 名称 | 描述 | 参数
 * get | 获取栈 | `(databaseName = string, storeName = string, key = numher)`
 * set | （推入栈）设置栈 | `(databaseName = string, storeName = string, key = numher, value: any)`
 * length | 获取栈长度 | `(databaseName = string, storeName = string, key = numher)`
 * getForIndex | 获取栈对应位置值 | `(databaseName = string, storeName = string, key = numher, index: numher)`
 * updateForIndex | 修改某一项 | `(databaseName = string, storeName = string, key = numher, index: numher, value: any)`
 * deleteForIndex | 删除某一项 | `(databaseName = string, storeName = string, key = numher, index: numher)`
 * deleteStartForIndex | 删除某一项后所有 | `(databaseName = string, storeName = string, key = numher, end: numher)`
 * delete | 删除栈/删除栈集合 | `(databaseName = string, storeName = string, key?: string)`
 */

// IndexedDB
export class BrowserHistoryStorage {
  constructor(namespaceMap, limits) {
    this.limits = limits // 栈长度限制
    this.namespaceMap = namespaceMap
  }
  // 获取栈
  async get(databaseName, storeName, key) {
    return (await this.namespaceMap[databaseName]).get(storeName, key)
  }
  // （推入栈）设置栈
  async set(databaseName, storeName, key, value) {
    const stack = await this.get(databaseName, storeName) || []
    stack.push(value)
    while (stack.length > this.limits[databaseName]) {
      stack.shift()
      // shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值
    }
    return (await this.namespaceMap[databaseName]).put(storeName, stack, key)
  }
  //  获取栈长度
  async length(databaseName, storeName, key) {
    const stack = await this.get(databaseName, storeName, key) || []
    return stack.length
  }
  // 获取栈对应位置值
  async getForIndex(databaseName, storeName, key, index) {
    const stack = await this.get(databaseName, storeName, key) || []
    return stack[index]
  }
  // 修改某一项
  async updateForIndex(databaseName, storeName, key, index, value) {
    const stack = await this.get(databaseName, storeName, key) || []
    stack[index] = value
    return (await this.namespaceMap[databaseName]).put(storeName, stack, key)
  }
  // 删除某一项
  async deleteForIndex(databaseName, storeName, key, index) {
    const stack = await this.get(databaseName, storeName, key) || []
    stack.splice(index, 1) // splice（index, 1）删除指定的一项，返回删除元素的数组
    return (await this.namespaceMap[databaseName]).put(storeName, stack, key)
  }

  // 删除某一项后所有
  async deleteStartForIndex(databaseName, storeName, key, end) {
    let stack = await this.get(databaseName, storeName, key) || []
    stack = stack.slice(0, end)
    return (await this.namespaceMap[databaseName]).put(storeName, stack, key)
  }

  // 删除栈/删除栈集合
  async delete(databaseName, storeName, key) {
    if (databaseName && storeName && !key) {
      return (await this.namespaceMap[databaseName]).clear(storeName)
    } else if (databaseName && storeName && key) {
      return (await this.namespaceMap[databaseName]).delete(storeName, key)
    }
  }
}

// localStorage
export class BrowserHistoryLocalStorage {
  constructor(namespaceMap, limits) {
    this.namespaceMap = namespaceMap
    this.limits = limits
  }

  getDatabase(databaseName) {
    return JSON.parse(localStorage.getItem(this.namespaceMap[databaseName] || '{}'))
  }

  getStoreName(databaseName, storeName) {
    return (this.getDatabase(databaseName)[storeName] || {})
  }

  put(databaseName, storeName, key, stack) {
    const database = this.getDatabase(databaseName)
    if (!database[storeName]) {
      database[storeName] = {}
    }
    database[storeName][key] = stack
    return localStorage.setItem(databaseName, JSON.stringify(this.getDatabase))
  }

  // 获取栈
  get(databaseName, storeName, key) {
    return this.getStoreName(databaseName, storeName)[key]
  }

  // （推入栈）设置栈
  set(databaseName, storeName, key, value) {
    const stack = this.get(databaseName, storeName, key) || []
    stack.push(value)
    while (stack.length > this.limits[databaseName]) {
      stack.shift()
    }
    return this.put(databaseName, storeName, key, stack)
  }

  //  获取栈长度
  length(databaseName, storeName, key) {
    const stack = this.get(databaseName, storeName, key) || []
    return stack.length
  }

  // 获取栈对应位置值
  getForIndex(databaseName, storeName, key, index) {
    const stack = this.get(databaseName, storeName, key) || []
    return stack[index]
  }

  // 修改某一项
  updateForIndex(databaseName, storeName, key, index, value) {
    const stack = this.get(databaseName, storeName, key) || []
    stack[index] = value
    return this.put(databaseName, storeName, key, stack)
  }

  // 删除某一项
  deleteForIndex(databaseName, storeName, key, index) {
    const stack = this.get(databaseName, storeName, key) || []
    stack.splice(index, 1)
    return this.put(databaseName, storeName, key, stack)
  }

  // 删除某一项后所有
  deleteStartForIndex(databaseName, storeName, key, end) {
    let stack = this.get(databaseName, storeName, key) || []
    stack = stack.slice(0, end)
    return this.put(databaseName, storeName, key, stack)
  }

  // 删除栈/删除栈集合
  delete(databaseName, storeName, key) {
    if (databaseName && storeName && !key) {
      return localStorage.removeItem(database)
    } else if (databaseName && storeName && key) {
      const store = this.getStoreName(databaseName, storeName)
      const newStore = {}
      // Object.entries 遍历对象的属性
      for (const [storeKey, storeValue] of Object.entries(store)) {
        if (key !== storeKey) {
          newStore[storeKey] = storeValue
        }
      }
      const database = this.getDatabase(databaseName)
      database[storeName] = newStore
      localStorage.setItem(databaseName, JSON.stringify(database))
    }
  }
}

// 创建idb
export const createDBStore = (options) => {
  if (!options) {
    throw new Error('请传入 options 参数')
  }
  if ('indexedDB' in self) {
    if (!Array.isArray(options)) {
      options = [options]
    }
    const namespaces = {}
    const limits = {}
    options.forEach((option) => {
      limits[option.databaseName] = option.limit || DEFAULT_LIMIT
      namespaces[option.databaseName] = openDB(option.databaseName, option.databaseVersion, {
        upgrade(db) {
          option.storeNames.forEach((storeName) => db.createObjectStore(storeName))
        }
      })
    })
    return new BrowserHistoryStorage(namespaces, limits)
  } else {
    if (!Array.isArray(options)) {
      options = [options]
    }
    const namespaces = {}
    const limits = {}
    options.forEach((option) => {
      limits[option.databaseName] = option.limit || DEFAULT_LIMIT
      namespaces[option.databaseName] = option.databaseName
    })
    return new BrowserHistoryLocalStorage(namespaces, limits)
  }
}

export default { createDBStore }
