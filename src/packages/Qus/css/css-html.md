<!-- css文档 -->

## css标签类型问题整理

> 1. a标签跳转-出现拦截时：
  rel="noopener noreferrer" 配置以下参数可以防止钓鱼网站
  ```
   方式一：
    <a href="http://" target="_blank" rel="noopener noreferrer"></a>

   方式二：
   openHttp(url) {
    const link = document.createELement('a')
    link.target = '_blank'
    link.url = url
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
   }


  ```
> 2. html chrome浏览器禁用谷歌翻译

  ```
  1、在html 标签中加入属性  translate="no"
  <html translate="no">

  2、或者在html文件的head中加入
  <meta name="google" content="notranslate">

  3 、或者在不想被翻译的元素中加入class="notranslate"， 可以是html、div 等各种元素
  ```

3. outline 轮廓线修改
 ```
 outline: none;
 ```

4. 浏览器刷新时
