'use strict'

const { promisify: p } = require('util')
const exec = p(require('child_process').exec)
const { db } = require('../../config')

module.exports = (passphrase, inputFile = db) => {
  const cmd = [
    'gpg',
    '--batch',
    '--yes',
    `--passphrase '${passphrase}'`,
    '--decrypt',
    db
  ].join(' ')

  console.log('decrypt command', cmd)

  return exec(cmd).then(({ stdout }) => JSON.parse(stdout))
}
