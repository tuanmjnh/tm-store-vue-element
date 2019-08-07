import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import common from './modules/demo/common'
import components from './modules/demo/components'
import charts from './modules/demo/charts'
import table from './modules/demo/table'
import nested from './modules/demo/nested'
import permission from './modules/demo/permission'
import example from './modules/demo/example'
import error from './modules/demo/error'
import { excel, zip, pdf } from './modules/demo/export'

// vue-loader at least v13.0.0+
// module.exports = file => () => import('@/views/' + file + '.vue')
// module.exports = file => require('@/views/' + file + '.vue').default
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    constant: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    constant: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
    constant: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    constant: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
    constant: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    constant: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/profile',
    name: 'profile',
    component: Layout,
    // alwaysShow: true, // will always show the root menu
    // redirect: '/profile/index',
    hidden: true,
    meta: { title: 'profile' },
    children: [
      {
        path: 'index',
        name: 'profile/index',
        component: () => import('@/views/profile/index'),
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true, // will always show the root menu
    name: 'manager',
    meta: { title: 'manager', icon: 'segmdl2-defender-app', roles: ['admin'] }, // you can set roles in root nav
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'manager/users',
        meta: { title: 'users', icon: 'user', noCache: true, flag: 1 }
      },
      {
        path: 'roles',
        component: () => import('@/views/roles/index'),
        name: 'manager/roles',
        meta: { title: 'roles', icon: 'lock', noCache: true }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true, // will always show the root menu
    name: 'template',
    meta: { title: 'template', icon: 'document', roles: ['admin'] }, // you can set roles in root nav
    children: [
      {
        path: 'list',
        component: () => import('@/views/template/list'),
        name: 'template/list',
        meta: { title: 'template_list', icon: 'list', noCache: true, flag: 1 }
      },
      {
        path: 'add',
        component: () => import('@/views/template/add'),
        name: 'template/add',
        meta: { title: 'template_add', icon: 'edit', noCache: true }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/template/add'),
        name: 'template/edit',
        meta: { title: 'template_edit', noCache: true, activeMenu: '/template/list' },
        hidden: true
      },
      {
        path: 'trash',
        component: () => import('@/views/template/list'),
        name: 'template/trash',
        meta: { title: 'template_trash', icon: 'trash', noCache: true, flag: 0 }
      }
    ]
  },
  // Demo app
  {
    path: '/demo',
    name: 'demo',
    alwaysShow: true, // will always show the root menu
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'demo', icon: 'guide' },
    /** when your routing map is too long, you can split it into small modules **/
    children: [...common, ...[
      permission,
      components,
      charts,
      nested,
      table,
      example,
      error,
      excel,
      zip,
      pdf
    ]]
  },
  { path: '*', name: '404', redirect: '/404', hidden: true, constant: true, exception: true }
]

// const r = function(router) {
//   const res = []
//   router.forEach(route => {
//     const tmp = { ...route }
//     if (tmp.children) {
//       tmp.children = r(tmp.children)
//     }
//     res.push(tmp)
//   })
//   return res
// }
// const rs = r(asyncRoutes)
// console.log(JSON.stringify(rs))

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function addRoutes(routers) {
  console.log(router.options.routes)
  routers = routers.filter(x => { if (!router.includes(x.name)) return x })
  router.addRoutes(routers)
}

export default router
