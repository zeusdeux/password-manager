export default function (shouldShow) {
  return {
    display: shouldShow ? 'flex' : 'none',
    height: '100vh',
    width: '100vw',
    background: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const form = {
  border: '1px solid black',
  padding: '50px'
}
