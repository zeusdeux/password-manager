import { h, Component } from 'preact'
import { bind } from './util'

export default class extends Component {
  constructor() {
    super()
    this.state.show = false
  }
  linkState(key) {
    return e => this.setState({
      [key]: e.target.value
    })
  }
  @bind
  toggleShow() {
    this.setState({
      show: !this.state.show
    })
  }
  clearState() {
    this.setState({
      appName: '',
      username: '',
      password: '',
      show: false
    })
  }
  @bind
  handleSubmit(e) {
    const { appName, username, password } = this.state

    e.preventDefault()
    this.props.add(appName, username, password)
    this.clearState()
  }
  render(_, { show, appName, username, password }) {
    return (
      <section>
        <div style={{display: show ? 'block' : 'none'}}>
          <form onSubmit={this.handleSubmit}>
            <input name='appName' placeholder='Enter app name' value={appName} onInput={this.linkState('appName')} />
            <input name='username' placeholder='Enter app username' value={username} onInput={this.linkState('username')} />
            <input name='password' placeholder='Enter app password' value={password} onInput={this.linkState('password')} />
            <button type='submit'>Save</button>
          </form>
        </div>
        <button onClick={this.toggleShow}>Add new app</button>
      </section>
    )
  }
}
