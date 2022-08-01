const { promisify } = require('util')

// download-git-repo是git clone项目的第三方包
const download = promisify(require('download-git-repo'))
// const open = require('open')
const { compile } = require('../utils/compile')
const { writeToFile } = require('../utils/writeToFile')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const path = require('path')

// 创建项目指令
const createProjectAction = async (project, others) => {
  console.log('loading...')
  // 1.clone项目
  await download(vueRepo, project, { clone: true })

  // 2.执行npm install
  // 判断是否是window操作系统，是就是win32值
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3.运行npm run serve
  await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 4.打开浏览器，vue-cli是webpack配置打开的
  // open('"http://localhost:8080/"')
}

// 添加组件指令
const addComponentAction = async (cpnName, dest) => {
  // 1.编译ejs模板 result
  const result = await compile('vue-component.ejs', {
    cpnName,
    lowerName: cpnName.toLowerCase()
  })
  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${cpnName}.vue`)

  writeToFile(targetPath, result)
}

module.exports = {
  createProjectAction,
  addComponentAction
}
