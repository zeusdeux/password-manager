import { ipcRenderer } from 'electron'
import { h, Component } from 'preact'
import Header from './header'
import Body from './body'
import PassphraseModal from './passphraseModal'
import debug from 'debug'

const d = debug('main')

export default class extends Component {
  constructor() {
    super()
    this.state.db = null // use getAll from model here
    this.state.app = null // get should update this
    this.state.error = {} // errors from actions should be here

    ipcRenderer.on('init-response', (_event, error) => {
      if (error) {
        this.setState({
          error: error
        })
      } else {
        ipcRenderer.send('db-op', { op: 'getAll' })
        this.setState({
          error: {}
        })
      }
    })

    ipcRenderer.on('db-op-response', (_event, {op, response}) => {
      switch (op) {
      case 'getAll':
        this.setState({
          db: response
        })
        break
      case 'get':
        this.setState({
          app: response
        })
        break
      case 'add':
        this.setState({
          db: [...this.state.db, response]
        })
        break
      default: d(op, response)
      }
    })
  }
  setPassphrase(newPassphrase) {
    // call model.getAll with new passphrase
    // update db and passphrase here if
    // returned promise resolves
    // if it rejects, show error
    ipcRenderer.send('init', newPassphrase)
  }
  get(id) {
    // proxy to model.get
    ipcRenderer.send('db-op', {
      op: 'get',
      payload: {
        id
      }
    })
  }
  add(name, username, password) {
    // proxy to model.add
    ipcRenderer.send('db-op', {
      op: 'add',
      payload: {
        name,
        username,
        password
      }
    })
  }
  remove(id) {
    // proxy to model.remove
    d(id)
  }
  update(id, name, username, password) {
    // proxt to model.update
    d(id, name, username, password)
  }
  render() {
    return (
      <main>
        <ErrorBar error={this.state.error.message} />
        <Deets app={this.state.app} />
        <PassphraseModal shouldShow={!this.state.db} set={this.setPassphrase.bind(this)} />
        <section>
          <Header db={this.state.db} />
          <Body
            db={this.state.db}
            get={this.get.bind(this)}
            add={this.add.bind(this)}
            remove={this.remove.bind(this)}
            update={this.update.bind(this)} />
        </section>
      </main>
    )
  }
}

function Deets({ app }) {
  if (app) {
    return <p>{app.name},{app.username},{app.password}</p>
  } else {
    return null
  }
}

function ErrorBar({ error }) {
  if (error) {
    return <p>{error}</p>
  } else {
    return null
  }
}
