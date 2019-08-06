import Demo from '@/views/demo'

const permissionRouter = {
  path: '/demo/permission',
  name: 'demo/permission',
  component: Demo,
  redirect: '/demo/permission/page',
  alwaysShow: true, // will always show the root menu
  meta: { title: 'permission', icon: 'lock', roles: ['admin', 'editor'] }, // you can set roles in root nav
  children: [
    {
      path: 'page',
      name: 'demo/permission/page',
      component: () => import('@/views/demo/permission/page'),
      meta: { title: 'pagePermission', roles: ['admin'] } // or you can only set roles in sub nav
    },
    {
      path: 'directive',
      name: 'demo/permission/directive',
      component: () => import('@/views/demo/permission/directive'),
      meta: { title: 'directivePermission' } // if do not set roles, means: this page does not require permission
    },
    {
      path: 'role',
      name: 'demo/permission/role',
      component: () => import('@/views/demo/permission/role'),
      meta: { title: 'rolePermission', roles: ['admin'] }
    }
  ]
}

export default permissionRouter
