import Demo from '@/views/demo'

const error = {
  path: '/demo/error',
  component: Demo,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: { title: 'errorPages', icon: '404' },
  children: [
    {
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: 'Page401',
      meta: { title: 'page401', noCache: true }
    },
    {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: 'Page404',
      meta: { title: 'page404', noCache: true }
    }
  ]
}

const errorLog = {
  path: '/demo/error-log',
  component: Demo,
  children: [
    {
      path: 'log',
      component: () => import('@/views/demo/error-log/index'),
      name: 'ErrorLog',
      meta: { title: 'errorLog', icon: 'bug' }
    }
  ]
}

export { error, errorLog }
