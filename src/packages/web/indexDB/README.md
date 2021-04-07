# Browser Stack

> 基于浏览器 IndexedDB 实现的栈存取工具
> 在不兼容 IndexedDB 的情况下会采取 localStorage 回退方案

```javascript
  import { createDBStore } from './config.js'

  const db = createDBStore({
    databaseName: 'DB1',
    databaseVersion: 1,
    storeNames: ['Store1']
  })

  await db.set('DB1', 'Store1', 'Label', 2020)
  await db.set('DB1', 'Store1', 'Label', 2021)

  await db.get('DB1', 'Store1', 'Label') // [2020, 2021]
 
```

## createDBStore

### 参数

`(options: options)`

```javascript
 const options = {
  databaseName: '', // string 数据库名称
  databaseVersion: 1,  // Number|String 版本
  storeNames: [], // Array  创建的Store
  limit: 10, // Number 栈长度限制，默认值10
 }
```
### API

> API 在createDBStore 返回的实例上使用

| 名称 | 描述 | 参数 |
| :---- | :------ | :--- |
| get | 获取栈 | `(databaseName = string, storeName = string, key = numher)` |
| set | （推入栈）设置栈 | `(databaseName = string, storeName = string, key = numher, value: any)` |
| length | 获取栈长度 | `(databaseName = string, storeName = string, key = numher)`|
| getForIndex | 获取栈对应位置值 | `(databaseName = string, storeName = string, key = numher, index: numher)` |
| updateForIndex | 修改某一项 | `(databaseName = string, storeName = string, key = numher, index: numher, value: any)`|
| deleteForIndex | 删除某一项 | `(databaseName = string, storeName = string, key = numher, index: numher)` |
| deleteStartForIndex | 删除某一项后所有 | `(databaseName = string, storeName = string, key = numher, end: numher)` |
| delete | 删除栈/删除栈集合 | `(databaseName = string, storeName = string, key?: string)` |

