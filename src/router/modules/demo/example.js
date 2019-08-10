import Demo from '@/views/demo'

const exampleRouter = {
  path: '/demo/example',
  name: 'demo/example',
  component: Demo,
  redirect: '/demo/example/list',
  meta: { title: 'example', icon: 'example' },
  children: [
    {
      path: 'list',
      name: 'demo/example/list',
      component: () => import('@/views/demo/example/list'),
      meta: { title: 'list', icon: 'list' }
    },
    {
      path: 'add',
      name: 'demo/example/add',
      component: () => import('@/views/demo/example/add'),
      meta: { title: 'add', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'demo/example/edit',
      component: () => import('@/views/demo/example/edit'),
      meta: { title: 'edit', noCache: true, activeMenu: '/example/list' },
      hidden: true
    }
  ]
}

export default exampleRouter
