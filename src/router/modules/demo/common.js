const common = [
  {
    path: 'guide',
    name: 'demo/guide',
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
    path: 'icon',
    name: 'demo/icon',
    component: () => import('@/views/demo/icons/index'),
    meta: { title: 'icons', icon: 'icon', noCache: true }
  },
  {
    path: 'tab',
    name: 'demo/tab',
    component: () => import('@/views/demo/tab/index'),
    meta: { title: 'tab', icon: 'tab' }
  },
  {
    path: 'theme',
    name: 'demo/theme',
    component: () => import('@/views/demo/theme/index'),
    meta: { title: 'theme', icon: 'theme' }
  },
  {
    path: 'clipboard',
    name: 'demo/clipboard',
    component: () => import('@/views/demo/clipboard/index'),
    meta: { title: 'clipboardDemo', icon: 'clipboard' }
  },
  {
    path: 'i18n',
    name: 'demo/i18n',
    component: () => import('@/views/demo/i18n-demo/index'),
    meta: { title: 'i18n', icon: 'international' }
  },
  {
    path: 'https://github.com/PanJiaChen/vue-element-admin',
    name: 'demo/external-link',
    meta: { title: 'externalLink', icon: 'link' }
  }
]

export default common
