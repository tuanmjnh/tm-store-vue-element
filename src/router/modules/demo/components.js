/** When your routing table is too long, you can split it into small modules **/
import Demo from '@/views/demo'

const componentsRouter = {
  path: '/demo/components',
  name: 'demo/components',
  component: Demo,
  // redirect: '/demo/components',
  meta: { title: 'components', icon: 'component' },
  children: [
    {
      path: 'tinymce',
      name: 'demo/components/tinymce',
      component: () => import('@/views/demo/components-demo/tinymce'),
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      name: 'demo/components/markdown',
      component: () => import('@/views/demo/components-demo/markdown'),
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      name: 'demo/components/json-editor',
      component: () => import('@/views/demo/components-demo/json-editor'),
      meta: { title: 'jsonEditor' }
    },
    {
      path: 'split-pane',
      name: 'demo/components/split-pane',
      component: () => import('@/views/demo/components-demo/split-pane'),
      meta: { title: 'splitPane' }
    },
    {
      path: 'avatar-upload',
      name: 'demo/components/avatar-upload',
      component: () => import('@/views/demo/components-demo/avatar-upload'),
      meta: { title: 'avatarUpload' }
    },
    {
      path: 'dropzone',
      name: 'demo/components/dropzone',
      component: () => import('@/views/demo/components-demo/dropzone'),
      meta: { title: 'dropzone' }
    },
    {
      path: 'sticky',
      name: 'demo/components/sticky',
      component: () => import('@/views/demo/components-demo/sticky'),
      meta: { title: 'sticky' }
    },
    {
      path: 'count-to',
      name: 'demo/components/count-to',
      component: () => import('@/views/demo/components-demo/count-to'),
      meta: { title: 'countTo' }
    },
    {
      path: 'mixin',
      name: 'demo/components/mixin',
      component: () => import('@/views/demo/components-demo/mixin'),
      meta: { title: 'componentMixin' }
    },
    {
      path: 'back-to-top',
      name: 'demo/components/back-to-top',
      component: () => import('@/views/demo/components-demo/back-to-top'),
      meta: { title: 'backToTop' }
    },
    {
      path: 'drag-dialog',
      name: 'demo/components/drag-dialog',
      component: () => import('@/views/demo/components-demo/drag-dialog'),
      meta: { title: 'dragDialog' }
    },
    {
      path: 'drag-select',
      name: 'demo/components/drag-select',
      component: () => import('@/views/demo/components-demo/drag-select'),
      meta: { title: 'dragSelect' }
    },
    {
      path: 'dnd-list',
      name: 'demo/components/dnd-list',
      component: () => import('@/views/demo/components-demo/dnd-list'),
      meta: { title: 'dndList' }
    },
    {
      path: 'drag-kanban',
      name: 'demo/components/drag-kanban',
      component: () => import('@/views/demo/components-demo/drag-kanban'),
      meta: { title: 'dragKanban' }
    }
  ]
}

export default componentsRouter
