import { assert } from "./utils.js"

import Caldera from "../src/caldera.js"
import { Route } from "../src/router.js"
import Component from "../src/component.js"

class MyPage extends Component {
  static tagName = "my-page"
}

const routes = [
  { name: "default", path: "/", component: MyPage },
  { name: "detail", path: "/detail/:id", component: MyPage },
]

Caldera.registerComponent(MyPage)

describe("Test the Route class", () => {
  it("We can create a new instance of a Route", () => {
    const route = new Route({ ...routes[1], router: undefined })
    assert.instanceOf(route, Route)
  })

  it("A route can be matched by it's path", () => {
    const route = new Route({ ...routes[0], router: undefined })
    assert.isNull(route.match("/non-existant"))
    assert.isNotNull(route.match("/"))
  })

  it("We support parameters like :id too!", () => {
    const route = new Route({ ...routes[1], router: undefined })
    assert.isNull(route.match("/detail"))
    assert.isNotNull(route.match("/detail/1"))
  })

  it("Parameters can be extracted from the route", () => {
    const route = new Route({ ...routes[1], router: undefined })
    assert.isObject(route.params("/detail"))
    assert.deepEqual(route.params("/detail/"), {})

    assert.isObject(route.params("/detail/1"))
    assert.deepEqual(route.params("/detail/1"), { id: "1" })
  })

  it("A route without parameters will return {}", () => {
    const route = new Route({ ...routes[0], router: undefined })
    assert.isObject(route.params("/"))
    assert.deepEqual(route.params("/"), {})
  })
})
