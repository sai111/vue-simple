// index.js
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
// 导入模板
const {
    vueTemplate,
    entryTemplate,
    configTemplate,
    docTemplate
} = require('./template')
// 生成文件
const generateFile = (path, data) => {
    if (fs.existsSync(path)) {
        errorLog(`${path}文件已存在`)
        return
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', err => {
            if (err) {
                errorLog(err.message)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}
log('请输入要生成的页面组件名称、会生成在 src/packages目录下')
let componentName = ''
process.stdin.on('data', async chunk => {
    // 组件名称=组件文件夹/组件名称
    let str = String(chunk).trim().toString()
    let inputArr = str.split('/')
    const inputName = inputArr[1]
    // 文件夹路径
    const pagePath = resolve('../../src/packages/', inputArr[0])
    const hasPagePath = fs.existsSync(pagePath)
    if (hasPagePath) {
        log(`${inputArr[0]}文件路由不存在，请先新建文件`)
        await dotExistDirectoryCreate(pagePath)
    }
    // Vue页面组件路径
    const componentPath = resolve(`../../src/packages/${inputArr[0]}`, inputName)
    // vue文件
    const vueFile = resolve(componentPath, 'index.vue')
    // 入口文件
    const entryFile = resolve(componentPath, 'entry.vue')
    // js和md
    const configFile = resolve(componentPath, 'config.js')
    const docFile = resolve(componentPath, 'doc.md')
    // 判断组件文件夹是否存在
    const hasComponentExists = fs.existsSync(componentPath)
    if (hasComponentExists) {
        errorLog(`${inputName}页面组件已存在，请重新输入`)
        return
    } else {
        log(`正在生成 component 目录 ${componentPath}`)
        await dotExistDirectoryCreate(componentPath)
    }
    try {
        // 获取组件名
        if (inputName.includes('/')) {
            const inputArr = inputName.split('/')
            componentName = inputArr[inputArr.length - 1]
        } else {
            componentName = inputName
        }
        log(`正在生成 vue 文件 ${vueFile}`)
        await generateFile(vueFile, vueTemplate(componentName))
        log(`正在生成 entry 文件 ${entryFile}`)
        await generateFile(entryFile, entryTemplate(componentName))
        log(`正在生成 config 文件 ${configFile}`)
        await generateFile(configFile, configTemplate(componentName))
        log(`正在生成 md 文件 ${docFile}`)
        await generateFile(docFile, docTemplate(componentName))
        successLog('生成成功')
    } catch (e) {
        errorLog(e.message)
    }

    process.stdin.emit('end')
})
process.stdin.on('end', () => {
    log('exit')
    process.exit()
})

function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, function() {
            resolve(true)
        })
    })
}
// 递归创建目录
function mkdirs(directory, callback) {
    var exists = fs.existsSync(directory)
    if (exists) {
        callback()
    } else {
        mkdirs(path.dirname(directory), function() {
            fs.mkdirSync(directory)
            callback()
        })
    }
}
