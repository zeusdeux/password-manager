'use strict'

const p = require('pify')
const exec = p(require('child_process').exec)
const d = require('debug')('decrypt')

module.exports = inputFile => async passphrase => {
  const cmd = [
    'gpg',
    '--batch',
    '--yes',
    `--passphrase '${passphrase}'`,
    '--decrypt',
    inputFile
  ].join(' ')

  d('decrypt command', cmd)

  try {
    return JSON.parse(await exec(cmd))
  } catch (error) {
    throw error
  }
}
