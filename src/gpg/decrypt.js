'use strict'

const { promisify: p } = require('util')
const exec = p(require('child_process').exec)
const d = require('debug')('decrypt')

module.exports = inputFile => passphrase => {
  const cmd = [
    'gpg',
    '--batch',
    '--yes',
    `--passphrase '${passphrase}'`,
    '--decrypt',
    inputFile
  ].join(' ')

  d('decrypt command', cmd)

  return exec(cmd).then(({ stdout }) => JSON.parse(stdout))
}
