import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import components from './modules/demo/components'
import charts from './modules/demo/charts'
import table from './modules/demo/table'
import nested from './modules/demo/nested'
import permission from './modules/demo/permission'
import example from './modules/demo/example'
import { guide, documentation, icon, tab, theme, clipboard, i18n, externalLink } from './modules/demo/common'
import { error, errorLog } from './modules/demo/error'
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
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
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
    path: '/manager',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true, // will always show the root menu
    name: 'Manager',
    meta: {
      title: 'manager',
      icon: 'segmdl2-defender-app',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: { title: 'users', icon: 'user', noCache: true, flag: 1 }
      },
      {
        path: 'roles',
        component: () => import('@/views/roles/index'),
        name: 'roles',
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
        name: 'template-list',
        meta: { title: 'template_list', icon: 'list', noCache: true, flag: 1 }
      },
      {
        path: 'add',
        component: () => import('@/views/template/add'),
        name: 'template-add',
        meta: { title: 'template_add', icon: 'edit', noCache: true }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/template/add'),
        name: 'template_edit',
        meta: { title: 'template_edit', noCache: true, activeMenu: '/template/list' },
        hidden: true
      },
      {
        path: 'trash',
        component: () => import('@/views/template/list'),
        name: 'template-trash',
        meta: { title: 'template_trash', icon: 'trash', noCache: true, flag: 0 }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  // Demo app
  {
    path: '/demo',
    name: 'Demo',
    alwaysShow: true, // will always show the root menu
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'demo', icon: 'guide' },
    /** when your routing map is too long, you can split it into small modules **/
    children: [
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('@/views/demo/guide/index'),
        meta: { title: 'guide', icon: 'guide', noCache: true }
      },
      {
        path: 'documentation',
        name: 'Documentation',
        component: () => import('@/views/demo/documentation/index'),
        meta: { title: 'documentation', icon: 'documentation', affix: false }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/demo'),
        redirect: 'permission/page',
        meta: { title: 'permission', icon: 'lock', roles: ['admin', 'editor'] }, // you can set roles in root nav
        children: [
          {
            path: 'page',
            name: 'PagePermission',
            component: () => import('@/views/demo/permission/page'),
            meta: { title: 'pagePermission', roles: ['admin'] } // or you can only set roles in sub nav
          },
          {
            path: 'directive',
            name: 'DirectivePermission',
            component: () => import('@/views/demo/permission/directive'),
            meta: { title: 'directivePermission' } // if do not set roles, means: this page does not require permission
          },
          {
            path: 'role',
            name: 'RolePermission',
            component: () => import('@/views/demo/permission/role'),
            meta: { title: 'rolePermission', roles: ['admin'] }
          }
        ]
      },
      components,
      // charts,
      {
        path: 'charts',
        name: 'Charts',
        component: () => import('@/views/demo'),
        redirect: 'charts/keyboard',
        meta: { title: 'charts', icon: 'chart' },
        children: [
          {
            path: 'keyboard',
            name: 'KeyboardChart',
            component: () => import('@/views/demo/charts/keyboard'),
            meta: { title: 'keyboardChart', noCache: true }
          },
          {
            path: 'line',
            name: 'LineChart',
            component: () => import('@/views/demo/charts/line'),
            meta: { title: 'lineChart', noCache: true }
          },
          {
            path: 'mix-chart',
            name: 'MixChart',
            component: () => import('@/views/demo/charts/mix-chart'),
            meta: { title: 'mixChart', noCache: true }
          }
        ]
      },
      // nested,
      {
        path: 'nested',
        name: 'Nested',
        component: () => import('@/views/demo'),
        redirect: '/demo/nested/menu1/menu1-1',
        meta: { title: 'nested', icon: 'nested' },
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/demo/nested/menu1/index'), // Parent router-view
            meta: { title: 'menu1' },
            redirect: '/nested/menu1/menu1-1',
            children: [
              {
                path: 'menu1-1',
                name: 'Menu1-1',
                component: () => import('@/views/demo/nested/menu1/menu1-1'),
                meta: { title: 'menu1-1' }
              },
              {
                path: 'menu1-2',
                name: 'Menu1-2',
                component: () => import('@/views/demo/nested/menu1/menu1-2'),
                redirect: '/nested/menu1/menu1-2/menu1-2-1',
                meta: { title: 'menu1-2' },
                children: [
                  {
                    path: 'menu1-2-1',
                    name: 'Menu1-2-1',
                    component: () => import('@/views/demo/nested/menu1/menu1-2/menu1-2-1'),
                    meta: { title: 'menu1-2-1' }
                  },
                  {
                    path: 'menu1-2-2',
                    name: 'Menu1-2-2',
                    component: () => import('@/views/demo/nested/menu1/menu1-2/menu1-2-2'),
                    meta: { title: 'menu1-2-2' }
                  }
                ]
              },
              {
                path: 'menu1-3',
                name: 'Menu1-3',
                component: () => import('@/views/demo/nested/menu1/menu1-3'),
                meta: { title: 'menu1-3' }
              }
            ]
          },
          {
            path: 'menu2',
            name: 'Menu2',
            component: () => import('@/views/demo/nested/menu2/index'),
            meta: { title: 'menu2' }
          }
        ]
      },
      // table,
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/demo'),
        redirect: '/demo/table/complex-table',
        meta: { title: 'Table', icon: 'table' },
        children: [
          {
            path: 'dynamic-table',
            name: 'DynamicTable',
            component: () => import('@/views/demo/table/dynamic-table/index'),
            meta: { title: 'dynamicTable' }
          },
          {
            path: 'drag-table',
            name: 'DragTable',
            component: () => import('@/views/demo/table/drag-table'),
            meta: { title: 'dragTable' }
          },
          {
            path: 'inline-edit-table',
            name: 'InlineEditTable',
            component: () => import('@/views/demo/table/inline-edit-table'),
            meta: { title: 'inlineEditTable' }
          },
          {
            path: 'complex-table',
            name: 'ComplexTable',
            component: () => import('@/views/demo/table/complex-table'),
            meta: { title: 'complexTable' }
          }
        ]
      },
      example,
      icon,
      tab,
      error,
      errorLog,
      excel,
      zip,
      pdf,
      theme,
      clipboard,
      i18n,
      externalLink
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
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

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
