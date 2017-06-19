import { h, Component } from 'preact'

export default function ({ db, search }) {
  if (db) {
    return (
      <header>
        <Search performSearch={search} />
      </header>
    )
  } else return null
}

class Search extends Component {
  constructor({ performSearch }) {
    super()
    this.state.query = ''
    this.state.search = debounce(performSearch, 125)
  }
  handleInput(query) {
    this.state.search(query)
    this.setState({ query })
  }
  render() {
    return (
      <div>
        <label>Search:
          <input type='text' name='query' placeholder='Enter app name' value={this.state.query} onInput={e => this.handleInput(e.target.value)} />
        </label>
      </div>
    )
  }
}

function debounce(fn, duration) {
  let timeout

  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
      clearTimeout(timeout)
    }, duration)
  }
}
