/** When your routing table is too long, you can split it into small modules **/
import Demo from '@/views/demo'

const tableRouter = {
  path: '/demo/table',
  name: 'demo/table',
  component: Demo,
  redirect: '/demo/table/complex-table',
  meta: { title: 'Table', icon: 'table' },
  children: [
    {
      path: 'dynamic-table',
      name: 'demo/table/dynamic',
      component: () => import('@/views/demo/table/dynamic-table/index'),
      meta: { title: 'dynamicTable' }
    },
    {
      path: 'drag-table',
      name: 'demo/table/drag',
      component: () => import('@/views/demo/table/drag-table'),
      meta: { title: 'dragTable' }
    },
    {
      path: 'inline-edit-table',
      name: 'demo/table/edit',
      component: () => import('@/views/demo/table/inline-edit-table'),
      meta: { title: 'inlineEditTable' }
    },
    {
      path: 'complex-table',
      name: 'demo/table/complex',
      component: () => import('@/views/demo/table/complex-table'),
      meta: { title: 'complexTable' }
    }
  ]
}
export default tableRouter
