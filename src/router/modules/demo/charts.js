/** When your routing table is too long, you can split it into small modules**/
import Demo from '@/views/demo'

const chartsRouter = {
  path: '/demo/charts',
  name: 'demo/charts',
  component: Demo,
  redirect: 'noRedirect',
  meta: { title: 'charts', icon: 'chart' },
  children: [
    {
      path: 'keyboard',
      name: 'demo/charts/keyboard',
      component: () => import('@/views/demo/charts/keyboard'),
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      name: 'demo/charts/line',
      component: () => import('@/views/demo/charts/line'),
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      name: 'demo/charts/mix',
      component: () => import('@/views/demo/charts/mix-chart'),
      meta: { title: 'mixChart', noCache: true }
    }
  ]
}

export default chartsRouter
