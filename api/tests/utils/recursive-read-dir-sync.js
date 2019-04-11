const fs = require('fs')

module.exports = recursiveReaddirSync

function recursiveReaddirSync (dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(recursiveReaddirSync(file))
    } else {
      results.push(file)
    }
  })
  return results
}
