import Caldera from "../src/caldera.js"
import HelloWorld from "./js/components/helloworld.js"

Caldera.registerComponent("hello-world", HelloWorld)
Caldera.setInitalState({ name: "My Name" })

// these are here for debugging purposes
window.caldera = Caldera
