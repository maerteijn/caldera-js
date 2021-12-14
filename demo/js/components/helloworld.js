import Component from "../../../src/component.js"

class HelloWorld extends Component {
  static tagName = "hello-world"

  renderTemplate() {
    return `
      <h1>Hello <span>Default value</span></h1>
      `
  }

  update(state, oldState) {
    const value = Component.traverse(state, this.statePath)
    this.querySelector("span").textContent = value
  }
}

export default HelloWorld
