import Demo from '@/views/demo'

const guide = {
  path: '/demo/guide',
  component: Demo,
  redirect: '/demo/guide/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/guide/index'),
      name: 'Guide',
      meta: { title: 'guide', icon: 'guide', noCache: true }
    }
  ]
}

const documentation = {
  path: '/demo/documentation',
  component: Demo,
  redirect: '/demo/documentation/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/documentation/index'),
      name: 'Documentation',
      meta: { title: 'documentation', icon: 'documentation', affix: false }
    }
  ]
}

const icon = {
  path: '/demo/icon',
  component: Demo,
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/icons/index'),
      name: 'Icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }
  ]
}

const tab = {
  path: '/demo/tab',
  component: Demo,
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/tab/index'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' }
    }
  ]
}

const theme = {
  path: '/demo/theme',
  component: Demo,
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/theme/index'),
      name: 'Theme',
      meta: { title: 'theme', icon: 'theme' }
    }
  ]
}

const clipboard = {
  path: '/demo/clipboard',
  component: Demo,
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/clipboard/index'),
      name: 'ClipboardDemo',
      meta: { title: 'clipboardDemo', icon: 'clipboard' }
    }
  ]
}

const i18n = {
  path: '/demo/i18n',
  component: Demo,
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/i18n-demo/index'),
      name: 'I18n',
      meta: { title: 'i18n', icon: 'international' }
    }
  ]
}

const externalLink = {
  path: '/demo/external-link',
  component: Demo,
  children: [
    {
      path: 'https://github.com/PanJiaChen/vue-element-admin',
      meta: { title: 'externalLink', icon: 'link' }
    }
  ]
}

export { guide, documentation, icon, tab, theme, clipboard, i18n, externalLink }
