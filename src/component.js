import Caldera from "./caldera.js"

class Component extends HTMLElement {
  props = {}
  router = undefined

  constructor(props = {}, router = undefined) {
    super()
    console.log(`constructor of ${this}`)
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
    console.log(`${this.constructor.name} connected`)
    this.innerHTML = this.renderTemplate()
    Caldera.triggerUpdate(this)
  }

  disconnectedCallback() {
    console.log(`${this.constructor.name} disconnected`)
  }

  update(state, oldState) {
    throw "Please implement an update method"
  }

  static traverse(data, path) {
    return path && path.split(".").reduce((value, key) => value?.[key], data)
  }
}

export default Component
