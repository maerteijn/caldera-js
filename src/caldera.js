class Caldera {
  static components = []
  static state = {}

  static createReactiveStae(initial) {
    return new Proxy(
      initial,
      {
        set(state, key, value) {
          const oldState = { ...state }
          state[key] = value

          const tagNames = Caldera.components.map(component => component.tagName)
          const elements = document.querySelectorAll(tagNames.join(","))
          elements.forEach(element => {
            element.update(state, oldState)
          })
          return true
        }
      }
    )
  }

  static triggerUpdate(component){
    component.update(Caldera.state, {})
  }

  static setInitalState(initial = {}) {
    return new Promise((resolve, reject) => {
      Caldera.state = Caldera.createReactiveStae(initial)
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

  static definedAll() {
    const promises = Caldera.components.map(
      component => customElements.whenDefined(component.tagName)
    )
    return Promise.all(promises)
  }
}

export default Caldera
