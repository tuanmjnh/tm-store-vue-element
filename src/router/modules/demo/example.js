import Layout from '@/layout'

const exampleRouter = {
  path: '/demo/example',
  component: Layout,
  redirect: '/demo/example/list',
  name: 'Example',
  meta: {
    title: 'example',
    icon: 'example'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/example/create'),
      name: 'CreateArticle',
      meta: { title: 'createArticle', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/example/edit'),
      name: 'EditArticle',
      meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/example/list'),
      name: 'ArticleList',
      meta: { title: 'articleList', icon: 'list' }
    }
  ]
}

export default exampleRouter
