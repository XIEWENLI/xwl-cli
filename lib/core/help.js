const program = require('commander')

const helpOptions = () => {
  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如: -d [./]src/components'
  )

  program.on('--help', function () {
    console.log('on方法')
  })
}

module.exports = helpOptions
