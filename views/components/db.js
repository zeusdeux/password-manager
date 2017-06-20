import { ipcRenderer } from 'electron'
import debug from 'debug'
import { bind } from './util'

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
  @bind
  get(id) {
    // proxy to model.get
    this._requestDbOp('get', { id })
  }
  @bind
  add(name, username, password) {
    // proxy to model.add
    this._requestDbOp('add', { name, username, password })
  }
  @bind
  remove(id) {
    // proxy to model.remove
    this._requestDbOp('remove', { id })
  }
  @bind
  search(query) {
    // proxy to model.search
    this._requestDbOp('search', { query })
  }
  @bind
  update(id, name, username, password) {
    // proxt to model.update
    this._requestDbOp('update', { id, name, username, password })
  }
}
