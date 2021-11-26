import { assert } from "./utils.js"

describe("HelloWorld Component", () => {
  it("The Helloworld component renders the name from the state", () => {
    document.body.innerHTML = `<hello-world state-id="name"></hello-world>`

    // so the default state name is 'My Name' and this should be rendered in a span
    const span = document.body.querySelector("span")
    assert.equal(span.innerHTML, "My Name")
  })
})
