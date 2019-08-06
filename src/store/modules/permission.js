import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
  if (route.path) {
    return roles.some(role => role.routes.includes(route.path))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, authRoutes, exception) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // console.log(tmp.path.indexOf(`${parent}/`))
    if (tmp.exception) exception.push(tmp)
    // console.log(tmp)
    // const path = parent ? `${parent}/${tmp.path}` : tmp.path
    // console.log(path)
    if (authRoutes.includes(tmp.name)) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, authRoutes)
      res.push(tmp)
    } else {
      if (tmp.children && tmp.children.length === 1) {
        tmp.children = filterAsyncRoutes(tmp.children, authRoutes)
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  exception: [],
  isAddRoutes: true
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ADD_ROUTES: (state, value) => {
    state.isAddRoutes = value
  }
}

const actions = {
  generateRoutes({ commit, rootState }, roles) {
    // let authRoutes = []
    // rootState.roles.items.forEach(e => { if (roles.includes(e.id)) authRoutes = authRoutes.concat(e.routes) })
    return new Promise(resolve => {
      // const accessedRoutes = filterAsyncRoutes(asyncRoutes, authRoutes)

      let accessedRoutes

      if (roles.includes('admin')) accessedRoutes = asyncRoutes || []
      else accessedRoutes = filterAsyncRoutes(asyncRoutes, rootState.auth.routes, state.exception) // filterAsyncRoutes(asyncRoutes, authRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  isAddRoutes({ commit }, value) {
    return new Promise(resolve => {
      commit('SET_ADD_ROUTES', value)
      resolve(true)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
