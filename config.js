const { homedir } = require('os')

module.exports = {
  db: {
    dir: process.env.MYPASS_HOMEDIR || `${homedir()}/.mypass/`,
    file: process.env.MYPASS_HOMEFILE || '.donuts'
  }
}
