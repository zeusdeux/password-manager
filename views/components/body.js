import { h } from 'preact'
import AppList from './appList'
import AddApp from './addApp'

export default function ({ db, get, add, remove, update }) {
  if (db) {
    return (
      <section>
        <AppList db={db} get={get} remove={remove} update={update} />
        <AddApp add={add} />
      </section>
    )
  } else return null
}