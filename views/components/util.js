export function bind(target, key, { value: fn }) {
  return {
    configurable: true,
    get() {
      return fn.bind(this)
    }
  }
}
