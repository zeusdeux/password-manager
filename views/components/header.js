import { h } from 'preact'

export default function ({ db }) {
  return (
    <header>
      <h1>Header: {db.join(', ')}</h1>
    </header>
  )
}
