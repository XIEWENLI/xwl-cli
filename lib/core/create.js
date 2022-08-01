const program = require('commander')

const { createProjectAction, addComponentAction } = require('./actions')

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  // 添加组件指令
  program
    .command('addcpn <cpnName>')
    .description(
      'add vue component, 例如: xwlvue addcpn HelloWorld [-d src/components]'
    )
    .action(cpnName => {
      addComponentAction(cpnName, program.opts().dest || 'src/components')
    })
}

module.exports = createCommands
