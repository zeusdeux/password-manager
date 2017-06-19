'use strict'

const d = require('debug')('model')
const { resolve } = require('path')
const getEncrypter = require('../gpg/encrypt')
const getDecrypter = require('../gpg/decrypt')
const { db: { dir, file } } = require('../../config')
const defaultDbPath = resolve(dir, file)
const { search: ssearch, transforms: { rank, noHighlight } } = require('subsequence-search')

// TODO: Create db path if it doesn't exist
const p = require('pify')
const stat = p(require('fs').stat)

// type Name = String
// type Username = String
// type Password = String
// type Id = Int
// type Query = String

// Db :: [(Name, Username, Password)]
// id is the array index for the tuple

// getAll :: () -> Promise [(Id, Name)]
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
  d('In get', id)
  return Promise.resolve(Object.assign({ id }, db[id]))
}

// search :: Query -> Promise [(Id, Name)]
const search = db => query => {
  try {
    d('In search', { query })
    const data = {
      data: db.map((app, id) => {
        app.id = id
        return app
      }),
      searchInProps: ['name']
    }
    const result = ssearch({
      rank: rank('name'),
      noHighlight,
      pluck: ({ data }) => data.map(d => {
        return { id: d.id, name: d.name }
      })
    }, data, query)

    d('In search', { result })

    return Promise.resolve(result)
  } catch (error) {
    return Promise.reject(error)
  }
}

// add :: Name -> Username -> Password -> Promise (Maybe (Id, Name))
const add = (db, commit) => (name, username, password) => {
  const id = db.push({ name, username, password }) - 1

  d('In add', db)
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

// remove :: Id -> Promise [(Id, Name)]
const remove = (db, commit) => id => {
  db.splice(id, 1)

  return commit(db).then(_ => getAll(db)())
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
    let pseudoError = {
      message: e.message
    }
    /* eslint no-console: 0 */
    if (e.code === 'ENOENT' && e.syscall === 'stat') {
      pseudoError.message = `No db found. Please create the file at ${defaultDbPath}`
    } else if (e.cmd) {
      pseudoError.message = 'Incorrect passphrase. Please try again'
    }
    console.error(e)
    throw pseudoError
  }
}


module.exports = init
