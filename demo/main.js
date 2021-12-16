import Caldera from "../src/caldera.js"
import Router from "../src/router.js"

import HelloWorld from "./js/components/helloworld.js"
import Overview from "./js/pages/overview.js"

import routes from "./routes"

Caldera.registerComponent(HelloWorld)
Caldera.registerComponent(Overview)

Caldera.setInitalState({ name: "My Name" })

Caldera.ready().then(() => {
  const appElement = document.querySelector("div#app")
  const router = new Router(routes, "hash", appElement)

  // go to the initial route
  router.navigateTo(router.currentPath || router.defaultPath)

  // these are here for debugging purposes
  window.caldera = Caldera
  window.router = router
  window.hello = HelloWorld
})
