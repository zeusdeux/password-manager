'use strict'

const p = require('pify')
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
    `$'${JSON.stringify(payload).replace(/'/g, `\\'`)}'`
  ].join(' ')

  d('encrypt command', cmd)

  return exec(cmd)
}
