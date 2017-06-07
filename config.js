const { resolve } = require('path')
const { homedir } = require('os')

module.exports = {
  db: resolve(
    process.env.MYPASS_HOMEDIR || `${homedir()}/.mypass/`,
    process.env.MYPASS_HOMEFILE || '.donuts'
  )
}
