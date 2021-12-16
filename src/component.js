import Caldera from "./caldera.js"

class Component extends HTMLElement {
  props = {}
  router = undefined

  constructor(props = {}, router = undefined) {
    super()
    this.props = props
    this.router = router
    this.statePath = this.getAttribute("state-path")
  }

  renderTemplate() {
    return `
      <div>
        <pre>Called from the ${this.constructor.name} class</pre>
        <pre>Please override the renderTemplate method</pre>
      </div>
      `
  }

  connectedCallback() {
    this.innerHTML = this.renderTemplate()
    Caldera.triggerUpdate(this)
  }

  disconnectedCallback() {}

  update(state, oldState) {
    throw "Please implement an update method"
  }

  static traverse(data, path) {
    return path && path.split(".").reduce((value, key) => value?.[key], data)
  }
}

export default Component
