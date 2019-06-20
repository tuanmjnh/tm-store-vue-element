import Demo from '@/views/demo'

const exampleRouter = {
  path: '/demo/example',
  component: Demo,
  redirect: '/demo/example/list',
  name: 'Example',
  meta: {
    title: 'example',
    icon: 'example'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/demo/example/create'),
      name: 'CreateArticle',
      meta: { title: 'createArticle', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/demo/example/edit'),
      name: 'EditArticle',
      meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/demo/example/list'),
      name: 'ArticleList',
      meta: { title: 'articleList', icon: 'list' }
    }
  ]
}

export default exampleRouter
