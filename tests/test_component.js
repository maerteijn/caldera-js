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
  it("We can create a new instance of AnotherComponent with props", () => {
    const another = new AnotherComponent({ name: "My Name" })
    assert.equal(another.props.name, "My Name")
  })

  it("We can just create a new instance of AnotherComponent and insert it", () => {
    const another = new AnotherComponent()
    document.body.appendChild(another)

    // so the default state name is 'My Name' and this should be rendered in the div
    const div = document.body.querySelector("div")
    assert.equal(div.innerHTML, "My Name")
  })

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
