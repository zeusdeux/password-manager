import { h } from 'preact'

export default function({ db, get }) {
  function getDetails(id) {
    get(id)
  }
  const lis = db.map(({id, name}) => <li key={id} onClick={getDetails.bind(null, id)}>{name}</li>)

  return <ul>{lis}</ul>
}
