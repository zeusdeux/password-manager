'use strict'

const { promisify: p } = require('util')
const exec = p(require('child_process').exec)
const { db } = require('../../config')

module.exports = (passphrase, payload, outputFile = db) => {
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

  console.log('encrypt command', cmd)

  return exec(cmd)
}
