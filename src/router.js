class Route {
  router = undefined
  name = undefined
  path = undefined
  component = undefined

  constructor(router, name, path, component) {
    this.router = router
    this.name = name
    this.path = path
    // convert the easy to read /detail/:id syntax to a regular expression
    // so we can easily match routes
    this.regex = new RegExp(
      `^${path.replaceAll(/:([^\s/]+)/g, "(?<$1>[\\w-_]+)")}/?$`
    )
    this.component = component
  }

  match(path) {
    return path && path.match(this.regex)
  }

  params(path) {
    return (path && this.match(path).groups) || {}
  }

  initComponent(path) {
    return new this.component(this.params(path), this.router)
  }

  render(path) {
    const instance = new this.component(this.params(path), this.router)
    const element = this.router.element

    if (element.hasChildNodes()) {
      element.replaceChild(instance, element.firstChild)
    } else {
      element.appendChild(instance)
    }
  }

  reverse(params = {}) {
    // this just renames {"id": 1} to {":id": 1}
    const mapoping = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [`:${key}`, value])
    )

    return this.path.replace(
      new RegExp(Object.keys(mapoping).join("|"), "g"),
      match => mapoping[match]
    )
  }
}

class Router {
  routes = []
  mode = "hash" // can he "hash" or "history"
  element = undefined

  constructor(initial = [], mode = "hash", element = undefined) {
    this.routes = initial.map(
      entry => new Route(this, entry.name, entry.path, entry.component)
    )
    this.mode = mode
    this.element = element

    window.addEventListener("popstate", event => {
      const path = this.currentPath
      const selectedRoute = this.findRouteByPath(path)

      if (selectedRoute) {
        selectedRoute.render(path)
      } else {
        this.navigateTo(this.defaultPath)
      }
    })
  }

  get currentPath() {
    const currentPath = {
      hash: window.location.hash.split("#")[1],
      history: window.location.pathname,
    }
    return currentPath[this.mode]
  }

  get defaultPath() {
    return this.routes.length && this.routes[0].path
  }

  buildLocation(path) {
    const location = {
      hash: `${window.location.origin}/${window.location.search}#${path}`,
      history: `${window.location.origin}/${path}${window.location.search}${window.location.hash}`,
    }
    return location[this.mode]
  }

  reverse(name, params) {
    const route = this.routes.find(route => route.name == name)
    return route.reverse(params)
  }

  findRouteByPath(path) {
    return this.routes.find(route => route.match(path))
  }

  navigateTo(path, pushHistory = true) {
    const selectedRoute = this.findRouteByPath(path)

    if (selectedRoute) {
      const location = this.buildLocation(path)
      pushHistory && window.history.pushState({}, path, location)
      selectedRoute.render(path)
    } else {
      throw `Route with path ${path} not found`
    }
  }
}

export default Router
