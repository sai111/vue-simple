<!-- indexDB文档 -->
## [indexDB 浏览器数据库入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
https://w3c.github.io/IndexedDB/#database-interface

[TOC]

### 一. 概述

[入门教程]:  http://www.ruanyifeng.com/blog/2018/07/indexeddb.html

[入门教程2]: https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/

[入门教程3]: https://segmentfault.com/a/1190000023056335
https://segmentfault.com/a/1190000014950564
#### 1.简单介绍

随着浏览器的功能不断增强，更多的网站考虑，将大量数据储存在客户端，这样可以减少从服务器获取数据，直接从本地获取数据

现有的浏览器数据储存方案，都不适合储存大量数据：

| 储存方式     |    大小    | 限制                                                         |
| ------------ | :--------: | ------------------------------------------------------------ |
| cookie       |    4KB     | 1. 每次请求都会发送会服务器                                  |
| localStorage | 2.5MB-10MB | 1. 大小和浏览器有关    2. 不提供搜哟功能，不能建立自定义索引 |

**indexDB就是浏览器提供的本地数据库**

1. 可以被网页脚本创建和操作
2. indexDB允许储存大量数据，提供查找接口，还能建立索引
3. 以上都是localstorage所不具备的

就数据库类型而言，IndexDB不属于关系型数据库（不支持SQL查询语句），更接近NoSQL数据库

#### 2. **IndexDB具备以下特点：**

1. **键值对储存**  IndexDB内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括JavaScript对象。对象仓库中，数据以“键值对”的形式存放，每一个数据记录都有对应的主键，主键都是独一无二的，不能有重复，否则会抛出一个错误
2. **异步**       IndexDB操作时不回锁死浏览器，用户依然可以进行其他操作，这与Loc alStorage形成对比，后者的操作时同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现
3. **支持事务**   IndexDB支持事务 ([transaction](https://blog.csdn.net/w_linux/article/details/79666086)) , 这意味着一系列操作步骤之中，只要有一步失败，整个事务都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况
4. **同源限制**   IndexDB受到同源限制，每一个数据看对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库
5. **储存空间大** IndexDB的储存空间比 localStorage大得多，一般来说不少于 250MB,甚至没有上限
6. **支持二进制储存** IndexDB不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer对象和Blob对象）



-------



### 二. 基本概念

​        IndexedDB 是一个比较复杂的 API，涉及不少概念。它把不同的实体，抽象成一个个对象接口。学习这个 API，就是学习它的各种对象接口

> * 数据库： IDBDatabase 对象
> * 对象仓库：IDBObjectStore 对象
> * 索引： IDBIndex 对象
> * 事务： IDBTransaction 对象
> * 操作请求：IDBRequest 对象
> * 指针： IDBCursor 对象
> * 主键集合：IDBKeyRange 对象



#### 主要概念：

**（1）数据库**

​	 数据库是一系列相关数据的容器。每个域名（严格地说：协议+ 域名+ 端口）都可以新建任意多个数据库

​     IndexDB数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。如果要修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成



**（2）对象仓库**

​		每个数据库包含若干个对象仓库（object store）它类似于关系型数据库的表格

**（3）数据记录**

​		对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。主键用来建立默认的索引，必须是不同的，否则会报错。主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号

```
{ id: 1, text: 'foo' }
```

上面的对象中，id 属性可以当作主键

数据体可以是任意数据类型，不限于对象



**（4）索引**

​		为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引

**（5）事务**

​       数据记录的读写和删改，都要通过事务完成。事务对象提供`error`、`abort`和`complete`三个事件，用来监听操作结果



----

### 三、操作流程

​        IndexedDB 数据库的各种操作，一般是按照下面的流程进行的。这个部分只给出简单的代码实例，详细的各个对象的API 请看[这里](https://wangdoc.com/javascript/bom/indexeddb.html#indexeddb-%E5%AF%B9%E8%B1%A1)



####     3.1 打开数据库

```javascript
var request = window.indexedDB.open(databaseName, version)
这种方式接受两个参数：数据库的名称（字符串）  数据库版本（整数）
tip: 如果指定的数据库不存在，就会新建数据库
tip: 如果省略数据库版本，打开已有数据库时，默认为当前版本。新建数据库时，版本默认为【1】

```

​      

`IndexedDB.open()` 方法返回一个IDBRequest 对象。这个对象通过三种事件 `error`、`success`、`upgradeneeded`，处理打开数据库的操作结果

**（1）error 事件**

​     **Error** 事件表示打开数据库失败

```javascript
request.onerror = function(event) {
	console.log('数据库打开失败')
}
```



**（1）success 事件**

​     **success** 事件表示成功打开数据库

```javascript
var db
request.onsuccess = function(event) {
	db = request.result
	console.log('数据库打开成功')
}
这是，通过【request】对象的【result】属性拿到数据库对象
```

这时，通过`request`对象的`result`属性拿到数据库对象

**（3）upgradeneeded 事件**

如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件`upgradeneeded`

```javascript
var db
request.onupgradeneeded = function(event) {
	db = even.target.result
}
```

这时，通过事件对象的`target.result`属性，拿到数据库实例



####     3.2 新建数据库

新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。

不同之处在于，后续的操作主要在`upgradeneeded`事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）

方法一：

```javascript
request.onupgradeneeded = function(event) {
  db = event.target.result
  var objectStore = db.createObjectStore('person', { keyPath: 'id' })
}
```

上面代码中，数据库新建成功以后，新增一张叫做`person`的表格，主键是`id`

方法二：

优化后的写法：先判断这张表格是否存在，如果不存在再新建

```javascript
request.onupgradeneeded = function(event) {
  db = event.target.result
  var objectStore
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' })
  }
}
```

-----



⚠️主键（key）是默认建立索引的属性。

   比如，数据记录是`{ id: 1, name: '张三' }`，那么`id`属性可以作为主键。

⚠️主键也可以指定为下一层对象的属性

  比如`{ foo: { bar: 'baz' } }`的`foo.bar`也可以指定为主键



⚠️如果数据记录里面没有适合作为主键的属性，那么可以让IndexedDB 自动生成主键

```
var objectStore = db.createObjectStore(
	'person', { autoIncrement: true }
)
```

-----



新建对象仓库后，下一步可以新建索引

```
request.onupgradeneeded = function(event) {
	db = event.target.result
	var objectStore = db.createObjectStore('person', { keypath: 'id' })
	objectStore.createIndex('name', 'name', { unique: false })
	objectStore.createIndex('email', 'email', { unique: true })
}
```

上面代码中，`IDBObject.createIndex()`的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）



#### 3.2 新建数据库

新增数据指的是向 **对象仓库写入数据记录**。需要通过**事务**完成

```javascript
function add(){
  var request = db.transaction(['person'], 'readwrite')
  	.objectStore('person')
  	.add({ id: 1, name: '测试名称'，age: 24, email: '123456@qq.com' })
  request.onsuccess = function(event) {
    console.log('数据写入成功')
  }
  request.onerror = function(event) {
    console.log('数据写入失败')
  }
}
add()
```

上面代码中，**写入数据需要新建一个事务**。

新建时必须指定表格名称和操作模式（'只读'或‘读写’）

新增事务后，通过`IDBTransaction.objectStore(name)`方法，拿到 IDBObjectStore 对象，再通过表格对象的`add()`方法，向表格写入一条记录



-----

#### 3.4 读取数据

读取数据也是通过`事务`完成

```javascript
function read() {
	var transaction = db.transaction(['person'])
  var objectStore = transaction.objectStore('person')
  var request = objectStore.get(1)
  
  request.onerror = function(event) {
    console.log('事务失败')
  }
  request.onerror = function(event) {
    if (request.result) {
      const tmp = request.result
      console.log('name' + tmp.name, '--age:' + tmp.age)
    } else {
      console.log('未获得数据记录')
    }
  }
}
read()
```

上面代码中，`objectStore.get()`方法用于读取数据，参数是主键的值



-----

#### 3.5 遍历数据

遍历数据表格的所有记录，要使用指针对象 IDBCursor。

> ```javascript
> function readAll() {
>   var objectStore = db.transaction('person').objectStore('person');
> 
>    objectStore.openCursor().onsuccess = function (event) {
>      var cursor = event.target.result;
> 
>      if (cursor) {
>        console.log('Id: ' + cursor.key);
>        console.log('Name: ' + cursor.value.name);
>        console.log('Age: ' + cursor.value.age);
>        console.log('Email: ' + cursor.value.email);
>        cursor.continue();
>     } else {
>       console.log('没有更多数据了！');
>     }
>   };
> }
> 
> readAll();
> ```

上面代码中，新建指针对象的`openCursor()`方法是一个异步操作，所以要监听`success`事件。



------

#### 3.6 更新数据

更新数据要使用`IDBObject.put()`方法。

> ```javascript
> function update() {
>   var request = db.transaction(['person'], 'readwrite')
>     .objectStore('person')
>     .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
> 
>   request.onsuccess = function (event) {
>     console.log('数据更新成功');
>   };
> 
>   request.onerror = function (event) {
>     console.log('数据更新失败');
>   }
> }
> 
> update();
> ```

上面代码中，`put()`方法自动更新了主键为`1`的记录。

----



#### 3.7 删除数据

`IDBObjectStore.delete()`方法用于删除记录。

> ```javascript
> function remove() {
>   var request = db.transaction(['person'], 'readwrite')
>     .objectStore('person')
>     .delete(1);
> 
>   request.onsuccess = function (event) {
>     console.log('数据删除成功');
>   };
> }
> 
> remove();
> ```

---

#### 3.8 使用索引

索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对`name`字段建立了索引。

> ```javascript
> objectStore.createIndex('name', 'name', { unique: false });
> ```

现在，就可以从`name`找到对应的数据记录了。

> ```javascript
> var transaction = db.transaction(['person'], 'readonly');
> var store = transaction.objectStore('person');
> var index = store.index('name');
> var request = index.get('李四');
> 
> request.onsuccess = function (e) {
>   var result = e.target.result;
>   if (result) {
>     // ...
>   } else {
>     // ...
>   }
> }
> ```







参考资料地址：

[IndexedDB API]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[浏览器兼容]: https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API#Browser_compatibility

 https://caniuse.com/#search=IndexedDB

[实例教程]: https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/
[indexedDB使用与出坑记录]: https://juejin.cn/post/6844903570005835789

[[indexedDB聊天记录存储方法总结](https://segmentfault.com/a/1190000023044094)]   https://segmentfault.com/a/1190000023044094?utm_source=sf-similar-article

[简介 IndexedDB 及详解 IndexedDB 在实际项目中可能存在的问题与解决方案]https://blog.csdn.net/caod1991/article/details/103862550

### 四. 使用总结，坑⚠️

- [张鑫旭-HTML5 indexedDB前端本地存储数据库实例教程](https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/)
- [阮一峰-浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
- [阮一峰-IndexedDB API](https://wangdoc.com/javascript/bom/indexeddb.html)

#### ⚠️ 1. 不能动态添加表

  indexedDB 中 `createObjectStore`(类似新增表)和`deleteObjectStore`(类似删除表)方法只有在onupgradeneeded 中调用。而表有时候又是动态的，所以做了一下的封装。

​    

```
/**
 * 根据数据库中是否包含表名会自动升级数据库
 * @param dbName         数据库名称
 * @param storeNames     表名-arrays
 * @param version        数据库版本号
 */
export async function openDatabase(dbName, storeNames = [], version = undefined) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, version)
        request.onsuccess = (event) => {
            const db = event.target.result

            let isNeedUpdate = false
            for (let i = 0; i < storeNames.length; i++) {
                if (!db.objectStoreNames.contains(storeNames[i])) {
                    isNeedUpdate = true
                    break
                }
            }

            function callback(db) {
                if (db) {
                    resolve(db)
                } else {
                    reject(`can't open ${dbName}`)
                }
            }

            if (isNeedUpdate) {
                const version = db.version + 1
                db.close()
                openDatabase(dbName, storeNames, version).then((db) => {
                    callback(db)
                })
            } else {
                callback(db)
            }
        }
        request.onerror = (e) => {
            reject(e)
        }
        request.onblocked = () => {
            reject(`${dbName} is blocked.`)
        }
        request.onupgradeneeded = (event) => {
            const db = event.target.result
            for (const storeName of storeNames) {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, {
                        keyPath: "key"
                        // autoIncrement: true
                    })
                }
            }
        }
    })
}
```



#### ⚠️ 2. 主键不能更新

我的需求是把一个文件列表存入数据库。之前是把文件完整路径作为了主键。但是当遇到修改文件名或移动文件，文件路径就会发生变更的这种情况，就需要更新主键。然而并没有找到这样的方法

> `IDBObjectStore.put(item, key)`方法用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个 IDBRequest 对象。
> 该方法接受两个参数，第一个参数为新数据，第二个参数为主键，该参数可选，且只在自动递增时才有必要提供，因为那时主键不包含在数据值里面。

