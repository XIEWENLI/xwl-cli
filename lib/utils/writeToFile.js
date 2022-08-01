const fs = require('fs')

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  writeToFile
}
