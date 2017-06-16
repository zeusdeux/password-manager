import { h, Component } from 'preact'

export default class extends Component {
  constructor() {
    super()
    this.state.show = false
  }
  toggleShow() {
    this.setState({
      show: !this.state.show
    })
  }
  handleSubmit(e) {
    e.preventDefault()

    const { appName, username, password } =
          Array
          .from(e.target.children)
          .reduce((arr, el) => {
            if (el.nodeName === 'INPUT') {
              arr[el.name] = el.value
            }
            return arr
          }, {})
    this.props.add(appName, username, password)
    this.toggleShow()
  }
  render() {
    return (
      <section>
        <div style={{display: this.state.show ? 'block' : 'none'}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name='appName' placeholder='Enter app name' />
            <input name='username' placeholder='Enter app username' />
            <input name='password' placeholder='Enter app password' />
            <button type='submit'>Save</button>
          </form>
        </div>
        <button onClick={this.toggleShow.bind(this)}>Add new app</button>
      </section>
    )
  }
}
