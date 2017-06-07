'use strict'

const decrypt = require('../gpg/decrypt')
const encrypt = require('../gpg/encrypt')

const commit = (passphrase, fullDb) => encrypt(passphrase, fullDb)

// TODO: Assert on shape of payload everywhere
const makeGetter = (db, passphrase) => key => {
  if (key in db) {
    return Promise.resolve(db[key])
  } else {
    return Promise.reject(new Error(`No entry found for ${key}`))
  }
}

// payload is { application, username, password }
const makeCreator = (db, passphrase) => payload => {
  return commit(passphrase, Object.assign(db, payload))
}

// payload can have all or one of the following props:
// application, username, password
const makeUpdater = (db, passphrase) => (key, payload) => {
  if (key in db) {
    // side effect :(
    Object.assign(db[key], payload)
    return commit(passphrase, db)
  } else {
    return Promise.reject(new Error(`No entry found for ${key}`))
  }
}

const makeRemover = (db, passphrase) => key => {
  delete db[key]
  return commit(passphrase, db)
}

module.exports = (passphrase) => {
  let db = decrypt(passphrase)

  const get = makeGetter(db, passphrase)
  const create = makeCreator(db, passphrase)
  const update = makeUpdater(db, passphrase)
  const remove = makeRemover(db, passphrase)

  return Object.assign(Object.create(null), {
    get,
    create,
    update,
    remove
  })
}
