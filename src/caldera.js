class Caldera {
  static components = []
  static state = {}

  static createReactiveState(initial) {
    return new Proxy(initial, {
      set(state, key, value) {
        const oldState = { ...state }
        state[key] = value

        const tagNames = Caldera.components.map(component => component.tagName)
        const elements = document.querySelectorAll(tagNames.join(","))
        elements.forEach(element => {
          element.update(state, oldState)
        })
        return true
      },
    })
  }

  static triggerUpdate(component) {
    component.update(Caldera.state, {})
  }

  static setInitalState(initial = {}) {
    return new Promise((resolve, reject) => {
      Caldera.state = Caldera.createReactiveState(initial)
      resolve()
    })
  }

  static registerComponent(component) {
    if (component.tagName === undefined) {
      throw `Please define a static property tagName on component ${component.localName}`
    }
    Caldera.components.push(component)
    customElements.define(component.tagName, component)
  }

  static ready() {
    const documentReady = new Promise(resolve => {
      document.addEventListener("DOMContentLoaded", resolve)
    })

    const promises = Caldera.components.map(component =>
      customElements.whenDefined(component.tagName)
    )
    return Promise.all([...promises, documentReady])
  }
}

export default Caldera
