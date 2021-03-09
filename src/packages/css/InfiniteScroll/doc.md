<!-- InfiniteScroll文档 -->

1.上拉没反应

解决：①要填充数据的盒必须设置高度、溢出滚动(overflow-y : auto)，才会触发loadMore事件。

     ②发送请求之前，将无线滚动禁掉this.busy = true,数据请求之后，无线滚动设置为false。

2.页面没有任何操作，不断发送请求进行加载

解决：数据请求完成之后，this.busy = false放在ajax请求外面；这样可以避免，当请求数据为0时，不断重复加载


<!--https://blog.csdn.net/LLL_liuhui/article/details/103588512->
