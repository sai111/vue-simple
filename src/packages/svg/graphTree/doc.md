<!-- graphTree文档 -->
* 数据结构：树图的数据一般是嵌套结构
 ``` javascript
 
    const data = {
      id: 'root',
      label: '根节点',
      children: [
        {
          id: "node1",
          label: "节点一",
          collapsed: true, // 此节点默认将收缩
         	children: []
        }
      ]
    }
  
 ```





* 布局特殊性
  * 树图的布局算法一般是不改变源数据的，而是重新生成一份数据，将源数据作为新数据的一个属性。如果每次都需要做次遍历转换数据到节点和边的数据增加了用户的实现复杂度。
  * 树图的每次新增/删除/展开/收缩节点，都需要重新计算布局。遍历一份结构化数据对应到图上每个节点去做更新操作，也很麻烦





layout 配置项

| 名称        | 类型       | 默认值 | 描述                                    |
| ----------- | ---------- | ------ | --------------------------------------- |
| getId       | {function} |        | 定制节点 id                             |
| getChildren | {function} |        | 返回当前节点的所有子节点                |
| getHGap     | {function} | 20     | 指定当前节点的水平间距                  |
| getVGap     | {function} | 20     | 指定当前节点的垂直间距                  |
| getWidth    | {function} | 20     | 指定当前节点宽度                        |
| getHeight   | {function} | 20     | 指定当前节点高度                        |
| fixedRoot   | boolean    | false  | 展开收起时候是否固定根节点，默认为false |

实例方法

- addChild(data, parent): 新增数据节点。

- - data: 新增的数据节点。
  - parent: 新增数据节点的父节点，当parent为空时，默认新增的数据节点为根节点。

- removeChild(id): 删除节点，以及以此节点为祖先节点的所有节点。

- - id: 节点id

- updateChild(data, parent): 更新当前节点以及所有以此节点的子节点。

- - data: 节点源数据
  - parent: 当前节点的父节点，若无父节点，则是全量更新。

- refreshLayout(fitView): graph 源数据在外部被修改时调用，重新布局绘制。

- - fitView: 是否需要在布局完成后是否将图自适应展示。这个选项是一方面是由于性能的考虑，另一方面是若配置了动画，先自适应再执行动画视觉效果更好。





重构思路

主要是内部集成布局算法，根据算法返回结果渲染数据，定义动画

* 内部集成布局算法 `@antv/hierarchy` ，layout 以配置项的形式传入