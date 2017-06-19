import { h, Component } from 'preact'
import Header from './header'
import Body from './body'
import PassphraseModal from './passphraseModal'
import mixinDbOps from './db'

export default class extends mixinDbOps(Component) {
  constructor() {
    super()
    this.state.db = null // use getAll from model here
    this.state.app = null // get should update this
    this.state.error = null // errors from actions should be here

    this.registerInitHandler(error => {
      if (!error) {
        this.getAll()
      }
      this.setState({
        error
      })
    })

    this.registerDbResponseHandler((error, { op, response }) => {
      let state = {}

      if (!error) {
        switch (op) {
        case 'getAll':
          state = {
            db: response
          }
          break
        case 'get':
          state = {
            app: response
          }
          break
        case 'add':
          state = {
            db: [...this.state.db, response]
          }
          break
        default:
          error = new Error(`${op} is not supported`)
        }
      }
      state.error = error
      this.setState(state)
    })
  }
  setPassphrase(newPassphrase) {
    this.requestInit(newPassphrase)
  }
  render() {
    return (
      <main>
        <ErrorBar error={this.state.error} />
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
    return <p>{error.message}</p>
  } else {
    return null
  }
}
