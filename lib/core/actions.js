const { promisify } = require('util')

// download-git-repo是git clone项目的第三方包
const download = promisify(require('download-git-repo'))
// const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')

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

module.exports = {
  createProjectAction
}
