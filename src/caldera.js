class Caldera {
  static components = []
  static state = {}

  static createReactiveStae() {
    return new Proxy(
      {},
      {
        set(state, key, value) {
          const oldState = { ...state }
          state[key] = value

          const elements = document.querySelectorAll(
            Caldera.components.join(",")
          )
          elements.forEach(element => {
            element.update(state, oldState)
          })
          return true
        }
      }
    )
  }

  static setInitalState(initial = {}) {
    Caldera.state = Caldera.createReactiveStae({})
    Object.keys(initial).forEach(key => (this.state[key] = initial[key]))
  }

  static registerComponent(tagname, component) {
    Caldera.components.push(tagname)
    customElements.define(tagname, component)
  }
}

export default Caldera
