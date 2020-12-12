/***
 * 删除文件夹
 * 链接：1.https://www.imooc.com/article/17979
 * 2.https://zhuanlan.zhihu.com/p/25934343
 * 3.https://blog.csdn.net/weixin_43720095/article/details/106111297
 * --------
 *  * 思路：
 * 1. 判断路由是否存在
 * 2. 删除时加个弹窗，二次确认，避免误操作
 */

const chalk = require('chalk')
const fs = require('fs')
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

// 终端初始化函数
//获取从命令行传入的参数列表
function getParamList(val, config) {
  const valList = val.split('=')
  if (valList[0] === config) {
      return valList[1].split(',')
  } else {
      return []
  }
}

// 获取从命令行传入的参数列表（去除默认传入两个）
const agrv = process.argv
log(`${agrv}=<%555-agrv`)
if (argv.length > 0) {
  agrv.forEach((val) => {
    const list = getParamList(val, '--targets')
    log(`删除的目标文件列表<%aa%>${list}`)
    // list.forEach((ele) => {
    //   deleteTarget('../../src/packages/' + ele)
    // })
  })
} else {
  // 如果没有传入参数
  errorLog('没有删除的目标文件夹')
}

// 删除目标文件夹或文件
function deleteTarget(fileUrl) {
  // 如果当前url不存在，则退出
  if (!fs.existsSync(fileUrl)) return
  // 当前文件为文件夹时
  if (fs.statSync(fileUrl).isDirectory()) {
    const files = fs.readdirSync(fileUrl)
    const len = files.length
    let removeNumber = 0
    if (len > 0) {
      files.forEach((file) => {
        removeNumber ++
        const url = fileUrl + '/' + file
        if (fs.statSync(url).isDirectory()) {
          deleteTarget(fileUrl)
        } else {
          fs.unlinkSync(url)
        }
      })
      // 删除当前文件夹下的所有文件后，删除当前空文件夹（注：所有的都采用同步删除）
      if (removeNumber === len) {
        fs.rmdirSync(fileUrl)
        successLog(`删除文件夹${fileUrl}成功`)
      }
    }  else {
      fs.rmdirSync(fileUrl)
    }
  } else {
    // 当前目标文件是文件时
    fs.unlinkSync(fileUrl)
    successLog(`删除文件夹${fileUrl}成功`)
  }
}
