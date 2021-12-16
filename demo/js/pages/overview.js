import Component from "../../../src/component.js"

class Overview extends Component {
  static tagName = "page-overview"

  renderTemplate() {
    return `
      <div>Overview page: ${this.props.id}</div>
      <a href="${this.router.reverse("detail", { id: 1 })}">Click me</a>
      `
  }

  update(state, oldState) {
    console.log(`update called for ${this.constructor.name} with data ${state}`)
  }
}

export default Overview
