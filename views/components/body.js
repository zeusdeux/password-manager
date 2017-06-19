import { h } from 'preact'
import AppList from './appList'
import AddApp from './addApp'

export default function ({ db, get, add }) {
  if (db) {
    return (
      <section>
        <AppList db={db} get={get} />
        <AddApp add={add} />
      </section>
    )
  } else return null
}
