import { h, Component } from 'preact'

export default class extends Component {
  constructor() {
    super()
    this.state.show = false
  }
  handleChange(key, e) {
    this.setState({
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
  render() {
    return (
      <section>
        <div style={{display: this.state.show ? 'block' : 'none'}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name='appName' placeholder='Enter app name' value={this.state.appName} onChange={this.handleChange.bind(this, 'appName')} />
            <input name='username' placeholder='Enter app username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
            <input name='password' placeholder='Enter app password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
            <button type='submit'>Save</button>
          </form>
        </div>
        <button onClick={this.toggleShow.bind(this)}>Add new app</button>
      </section>
    )
  }
}
