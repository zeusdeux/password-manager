'use strict'

const { promisify: p } = require('util')
const exec = p(require('child_process').exec)
const d = require('debug')('encrypt')

module.exports = outputFile => (payload, passphrase) => {
  // assume ~/.mypass folder exists
  // TODO: This folder should be created the first time this
  // app is used
  const cmd = [
    'gpg',
    '--batch',
    '--yes',
    `--passphrase '${passphrase}'`,
    `--output ${outputFile}`,
    '--symmetric',
    '<<<',
    `'${JSON.stringify(payload)}'`
  ].join(' ')

  d('encrypt command', cmd)

  return exec(cmd)
}
