import "global-jsdom/register"

import Caldera from "../src/caldera.js"
import HelloWorld from "../demo/js/components/helloworld.js"

Caldera.registerComponent(HelloWorld)
Caldera.setInitalState({ name: "My Name" })
