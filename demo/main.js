import Caldera from "../src/caldera.js"

import HelloWorld from "./js/components/helloworld.js"

import Overview from "./js/pages/overview.js"

Caldera.registerComponent(HelloWorld)
Caldera.registerComponent(Overview)
Caldera.setInitalState({ name: "My Name" })

Caldera.ready().then(() => {
  // TODO add the simple router here from https://github.com/praveen-me/simple-vanila-router/blob/master/app.js
  // to select the right page
  const appElement = document.querySelector("div#app")
  appElement.innerHTML = `<hello-world state-id="name"></hello-world>`
})

// these are here for debugging purposes
window.caldera = Caldera
