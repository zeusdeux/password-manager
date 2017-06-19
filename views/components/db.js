import { ipcRenderer } from 'electron'
import debug from 'debug'

const d = debug('views:db')

export default superClass => class Ipc extends superClass {
  _requestDbOp (op, payload) {
    d('Requesting db op', op, payload)
    ipcRenderer.send('db-op', {
      op,
      payload
    })
  }
  requestInit (payload) {
    d('Requesting init', payload)
    ipcRenderer.send('init', payload)
  }
  registerInitHandler(handler) {
    ipcRenderer.on('init-response', (_event, error) => {
      d('Received init response', error)
      if (error) handler(error)
      else handler(null)
    })
  }
  registerDbResponseHandler(handler) {
    ipcRenderer.on('db-op-response', (_event, { error, op, response }) => {
      d('Received db op response', op, response, error)
      if (error) {
        handler(error)
      } else {
        handler(null, { op, response })
      }
    })
  }
  getAll() {
    // proxy to model.getAll
    this._requestDbOp('getAll')
  }
  get(id) {
    // proxy to model.get
    this._requestDbOp('get', { id })
  }
  add(name, username, password) {
    // proxy to model.add
    this._requestDbOp('add', { name, username, password })
  }
  remove(id) {
    // proxy to model.remove
    this._requestDbOp('remove', { id })
  }
  search(query) {
    // proxy to model.search
    this._requestDbOp('search', { query })
  }
  update(id, name, username, password) {
    // proxt to model.update
    this._requestDbOp('update', { id, name, username, password })
  }
}
