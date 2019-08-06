import Demo from '@/views/demo'

const error = {
  path: '/demo/error',
  name: 'demo/error',
  component: Demo,
  redirect: 'noRedirect',
  meta: { title: 'errorPages', icon: '404' },
  children: [
    {
      path: '401',
      name: 'demo/error/401',
      component: () => import('@/views/error-page/401'),
      meta: { title: 'page401', noCache: true }
    },
    {
      path: '404',
      name: 'demo/error/404',
      component: () => import('@/views/error-page/404'),
      meta: { title: 'page404', noCache: true }
    },
    {
      path: 'log',
      name: 'demo/error/log',
      component: () => import('@/views/demo/error-log/index'),
      meta: { title: 'errorLog', icon: 'bug' }
    }
  ]
}

export default error
