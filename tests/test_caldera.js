import { assert } from "./utils.js"

import Caldera from "../src/caldera.js"
import Component from "../src/component.js"

class MyComponent extends Component {
  static tagName = "my-component"
}

describe("Test Caldera", () => {
  it("Test the Caldera component registry", () => {
    const nrComponents = Caldera.components.length
    Caldera.registerComponent(MyComponent)

    assert.lengthOf(Caldera.components, nrComponents + 1)
    assert.equal(Caldera.components[nrComponents], MyComponent)
  })
})
