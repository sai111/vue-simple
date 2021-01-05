<!-- 前端下载文件的说明文档 -->
### form表单下载

> 1. 后段直接返回文件流，前端读取文件流写入到文件中，这种方式可以加上鉴权，前端直接js写入文件流时超过500M时，浏览器卡死或者文件下载不全的问题，这时建议直接采用file-saver 插件写入文件，此版本的插件在chrome浏览器上最大可支持2G文件下载

import { saveAs } from '@/utils/lib/fileSaver.js'
downloadReport(params).then((res) => {
  const name = sessionStorage.getItem('resHeaders')
  saveAs(new Blob([res]), name)
})
