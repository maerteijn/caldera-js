import Component from "../../../src/component.js"

class Overview extends Component {
  static tagName = "page-overview"

  renderTemplate(props = {}) {
    return `
      <div>Overview page</div>
      `
  }

  update(state, oldState) {
    console.log(`update called for ${this.constructor.name} with data ${state}`)
  }
}

export default Overview
