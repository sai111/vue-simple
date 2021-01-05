<!-- axios文档 -->
## 业务相关总结

### axiso传参的几种方式

> 1. get请求
```
  我们一般采用query parameters 将参数携带到url后面
  封装形式为：使用params传递参数，一般用于get请求中

  export function getList(data) {
    return fetch({
      url: '/list',
      method: 'get',
      params: data
    })
  }

  在地址栏的体现如下：
  http://localhost:3030/api/category/list?keyword=test
```

> 2. post 传递json对象的request payload
```
  一般使用【post、put、delete】时，采用此方式传参

  export function addList(data) {
    return fetch({
      url: '/list',
      method: 'post',
      data: data
    })
  }

  体现如下：
   { name: 'test' }
```

> 3. 传递表单数据的form Data
```
  此参数传递的试json字符串，直接将json对象转化
  目前用于文件上传

  import qs from 'qs'
  export function addFile(data) {
    return fetch({
      url: '/file',
      method: 'post',
      data: qs.stringify(data)
    })
  }

  体现如下：
   file: (binary)
```

> 4. 路由形式的参数
```
  一般直接写url中，多种请求都可以使用此方式

  export function getDetail(data) {
    return fetch({
      url: '/list/:id/detail',
      method: 'get',
      pathData: data
    })
  }

  在地址栏的体现如下：
  http://localhost:3030/api/category/list/123/detail
```
