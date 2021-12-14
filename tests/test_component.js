import { assert } from "./utils.js"

import Caldera from "../src/caldera.js"
import Component from "../src/component.js"

class AnotherComponent extends Component {
  static tagName = "another-component"

  update(state, oldState) {
    this.querySelector("div").innerHTML = state.name
  }
}

Caldera.registerComponent(AnotherComponent)
Caldera.setInitalState({ name: "My Name" })

describe("Test the AnotherComponent", () => {
  it("The AnotherComponent component renders the name from the state", () => {
    document.body.innerHTML = `<another-component></another-component>`

    // so the default state name is 'My Name' and this should be rendered in the div
    const div = document.body.querySelector("div")
    assert.equal(div.innerHTML, "My Name")
  })

  it("The AnotherComponent component updates when the state is updated", () => {
    document.body.innerHTML = `<another-component></another-component>`

    Caldera.state.name = "Another name"
    const div = document.body.querySelector("div")
    assert.equal(div.innerHTML, "Another name")
  })
})
