'use strict'

const d = require('debug')('model')
const { resolve } = require('path')
const getEncrypter = require('../gpg/encrypt')
const getDecrypter = require('../gpg/decrypt')
const { db: { dir, file } } = require('../../config')
const defaultDbPath = resolve(dir, file)

// TODO: Create db path if it doesn't exist
const { promisify } = require('util')
const stat = promisify(require('fs').stat)

// type Name = String
// type Username = String
// type Password = String
// type Id = Int
// type Query = String

// Db :: [(Name, Username, Password)]
// id is the array index for the tuple

// get :: () -> Promise [(Id, Name)]
const getAll = db => () => {
  try {
    return Promise.resolve(
      db.map(({ name, username, password }, index) => {
        return {
          id: index,
          name
        }
      })
    )
  } catch (e) {
    return Promise.reject(e)
  }
}

// get :: Id -> Promise [(Id, Name, Username, Password)]
const get = db => id => {
  return Promise.resolve(db[id])
}

// search :: Query -> Promise [(Id, Name)]
const search = db => query => {

}

// add :: Name -> Username -> Password -> Promise (Maybe (Id, Name))
const add = (db, commit) => (name, username, password) => {
  const id = db.push({ name, username, password }) - 1

  return commit(db).then(_ => {
    return { id, name }
  })
}

// update :: Id -> Name -> Username -> Password -> Promise (Maybe (Id, Name))
const update = (db, commit) => (id, name, username, password) => {
  db[id] = {
    name,
    username,
    password
  }

  return commit(db).then(_ => {
    return { id, name }
  })
}

// remove :: Id -> Promise Bool
const remove = (db, commit) => id => {
  db.splice(id, 1)

  return commit(db).then(_ => true)
}

async function init(passphrase, dbPath = defaultDbPath) {
  const encrypt = getEncrypter(dbPath)
  const decrypt = getDecrypter(dbPath)

  d('Initializing db', passphrase, dbPath)

  try {
    const { size: fileSize } = await stat(dbPath)
    let db = await (!fileSize ? Promise.resolve([]) : decrypt(passphrase))
    const commit = db => encrypt(db, passphrase)

    return {
      getAll: getAll(db),
      get: get(db),
      search: search(db),
      add: add(db, commit),
      update: update(db, commit),
      remove: remove(db, commit)
    }
  } catch (e) {
    /* eslint no-console: 0 */
    console.error(e)
    console.error(`Please create the file at ${defaultDbPath}`)
    process.exit(1)
  }
}


module.exports = init
