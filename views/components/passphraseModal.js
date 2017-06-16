import { h, Component } from 'preact'
import { default as style, form } from './passphraseModal.style'


export default class extends Component {
  constructor() {
    super()
    this.state.passphrase = ''
  }
  setPassphrase(e) {
    e.preventDefault()
    this.props.set(this.state.passphrase)
    this.setState({ passphrase: '' })
  }
  handleChange(e) {
    this.setState({
      passphrase: e.target.value
    })
  }
  render() {
    return (
      <div style={style(this.props.shouldShow)} >
        <form style={form} onSubmit={this.setPassphrase.bind(this)}>
          <input placeholder='Enter your master passphrase' value={this.state.passphrase} onChange={this.handleChange.bind(this)} />
          <button>Unlock!</button>
        </form>
      </div>
    )
  }
}
