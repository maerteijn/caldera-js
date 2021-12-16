import Overview from "./js/pages/overview.js"

const routes = [
  { name: "default", path: "/", component: Overview },
  { name: "detail", path: "/detail/:id", component: Overview },
  { name: "another", path: "/detail/:id/another/:name", component: Overview },
]

export default routes
