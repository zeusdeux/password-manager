import { h, Component } from 'preact'
import { default as style, form } from './passphraseModal.style'
import { bind } from './util'

export default class extends Component {
  constructor() {
    super()
    this.state.passphrase = ''
  }
  @bind
  setPassphrase(e) {
    e.preventDefault()
    this.props.set(this.state.passphrase)
    this.setState({ passphrase: '' })
  }
  @bind
  handleInput(e) {
    this.setState({
      passphrase: e.target.value
    })
  }
  render({ shouldShow }, { passphrase }) {
    return (
      <div style={style(shouldShow)} >
        <form style={form} onSubmit={this.setPassphrase}>
          <input autoFocus type='text' placeholder='Enter your master passphrase' value={passphrase} onInput={this.handleInput} />
          <button>Unlock!</button>
        </form>
      </div>
    )
  }
}
