import Demo from '@/views/demo'

const guide = {
  path: 'guide',
  component: Demo,
  redirect: '/demo/guide/index',
  children: [
    {
      path: 'index',
      name: 'Guide',
      component: () => import('@/views/demo/guide/index'),
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
      name: 'Documentation',
      component: () => import('@/views/demo/documentation/index'),
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
      name: 'Icons',
      component: () => import('@/views/demo/icons/index'),
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
      name: 'Tab',
      component: () => import('@/views/demo/tab/index'),
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
      name: 'Theme',
      component: () => import('@/views/demo/theme/index'),
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
      name: 'ClipboardDemo',
      component: () => import('@/views/demo/clipboard/index'),
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
      name: 'I18n',
      component: () => import('@/views/demo/i18n-demo/index'),
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
