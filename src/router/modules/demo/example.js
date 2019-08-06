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
      meta: { title: 'articleList', icon: 'list' }
    },
    {
      path: 'create',
      name: 'demo/example/create',
      component: () => import('@/views/demo/example/create'),
      meta: { title: 'createArticle', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'demo/example/edit',
      component: () => import('@/views/demo/example/edit'),
      meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
      hidden: true
    }
  ]
}

export default exampleRouter
