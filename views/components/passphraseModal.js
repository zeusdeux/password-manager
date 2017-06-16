import { h, Component } from 'preact'
import { default as style, form } from './passphraseModal.style'


export default class extends Component {
  constructor() {
    super()
    this.state.passphrase = ''
  }
  setPassphrase(e) {
    e.preventDefault()
    this.props.set(e.target.firstElementChild.value)
  }
  render() {
    return (
      <div style={style(this.props.shouldShow)} >
        <form style={form} onSubmit={this.setPassphrase.bind(this)}>
          <input placeholder='Enter your master passphrase' value='' />
          <button>Unlock!</button>
        </form>
      </div>
    )
  }
}
