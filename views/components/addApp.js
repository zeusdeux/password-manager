import { h, Component } from 'preact'

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
  handleSubmit(e) {
    e.preventDefault()

    this.props.add(this.state.appName, this.state.username, this.state.password)
    this.clearState()
  }
  render(_, { show, appName, username, password }) {
    return (
      <section>
        <div style={{display: show ? 'block' : 'none'}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name='appName' placeholder='Enter app name' value={appName} onInput={this.linkState('appName')} />
            <input name='username' placeholder='Enter app username' value={username} onInput={this.linkState('username')} />
            <input name='password' placeholder='Enter app password' value={password} onInput={this.linkState('password')} />
            <button type='submit'>Save</button>
          </form>
        </div>
        <button onClick={this.toggleShow.bind(this)}>Add new app</button>
      </section>
    )
  }
}
