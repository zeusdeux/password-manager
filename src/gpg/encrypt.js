'use strict'

const p = require('pify')
const exec = p(require('child_process').exec)
const d = require('debug')('encrypt')

module.exports = outputFile => (payload, passphrase) => {
  // assume ~/.mypass folder exists
  // TODO: This folder should be created the first time this
  // app is used
  const escapedPayload =
        JSON.stringify(payload).replace(/'/g, `\\'`)
  const cmd = [
    'gpg',
    '--batch',
    '--yes',
    `--passphrase '${passphrase}'`,
    `--output ${outputFile}`,
    '--symmetric',
    '<<<',
    `$'${escapedPayload}'`
  ].join(' ')

  d('encrypt command', cmd)

  return exec(cmd)
}
