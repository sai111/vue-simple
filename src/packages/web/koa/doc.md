<!-- koa文档 -->
// getPath.js
const multer = require('koa-multer')
const path = require('path')

// 配置
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function(req, file, cb) {
    cb(null, 'public/phoneManageSystem')
    // path.resolve('public/phoneManageSystem')
  },
  // 修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})

// 加载配置
var upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 10000 }
})

export default upload

<!--/***
 * 具体显示链接地址：https://blog.csdn.net/qq_30868289/article/details/83586291
 * koa-multer中间件
 * 利用中间件Multer实现上传功能，链接地址：https://blog.csdn.net/charlene0824/article/details/51154306
 * nodejs - multer模块教程,使用multer进行附件上传，链接地址：链接地址：https://blog.csdn.net/charlene0824/article/details/51154306
 */-->
