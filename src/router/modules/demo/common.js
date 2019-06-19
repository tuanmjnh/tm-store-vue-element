import Layout from '@/layout'

const guide = {
  path: '/demo/guide',
  component: Layout,
  redirect: '/guide/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'Guide',
      meta: { title: 'guide', icon: 'guide', noCache: true }
    }
  ]
}

const profile = {
  path: '/demo//profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: { title: 'profile', icon: 'user', noCache: true }
    }
  ]
}

const documentation = {
  path: '/demo//documentation',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'Documentation',
      meta: { title: 'documentation', icon: 'documentation', affix: false }
    }
  ]
}

const icon = {
  path: '/demo/icon',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }
  ]
}

const tab = {
  path: '/demo/tab',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' }
    }
  ]
}

const theme = {
  path: '/demo/theme',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/theme/index'),
      name: 'Theme',
      meta: { title: 'theme', icon: 'theme' }
    }
  ]
}

const clipboard = {
  path: '/demo/clipboard',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/clipboard/index'),
      name: 'ClipboardDemo',
      meta: { title: 'clipboardDemo', icon: 'clipboard' }
    }
  ]
}

const i18n = {
  path: '/demo/i18n',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/i18n-demo/index'),
      name: 'I18n',
      meta: { title: 'i18n', icon: 'international' }
    }
  ]
}

const externalLink = {
  path: '/demo/external-link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/PanJiaChen/vue-element-admin',
      meta: { title: 'externalLink', icon: 'link' }
    }
  ]
}

export { guide, documentation, profile, icon, tab, theme, clipboard, i18n, externalLink }
