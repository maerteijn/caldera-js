import Component from "../../../src/component.js"

class Overview extends Component {
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
