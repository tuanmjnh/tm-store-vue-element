import Demo from '@/views/demo'

const excel = {
  path: '/demo/excel',
  name: 'demo/excel',
  component: Demo,
  redirect: '/demo/excel/export-excel',
  meta: { title: 'excel', icon: 'excel' },
  children: [
    {
      path: 'export',
      name: 'demo/excel/export',
      component: () => import('@/views/demo/excel/export-excel'),
      meta: { title: 'exportExcel' }
    },
    {
      path: 'export-selected',
      name: 'demo/excel/export-selected',
      component: () => import('@/views/demo/excel/select-excel'),
      meta: { title: 'selectExcel' }
    },
    {
      path: 'export-merge-header',
      name: 'demo/excel/export-merge-header',
      component: () => import('@/views/demo/excel/merge-header'),
      meta: { title: 'mergeHeader' }
    },
    {
      path: 'upload',
      name: 'demo/excel/upload',
      component: () => import('@/views/demo/excel/upload-excel'),
      meta: { title: 'uploadExcel' }
    }
  ]
}

const zip = {
  path: '/demo/zip',
  name: 'demo/zip',
  component: Demo,
  redirect: '/demo/zip/download',
  alwaysShow: true,
  meta: { title: 'zip', icon: 'zip' },
  children: [
    {
      path: 'export',
      name: 'demo/zip/export',
      component: () => import('@/views/demo/zip/index'),
      meta: { title: 'exportZip' }
    }
  ]
}

const pdf = {
  path: '/demo/pdf',
  name: 'demo/pdf',
  component: Demo,
  redirect: '/demo/pdf/index',
  children: [
    {
      path: 'index',
      name: 'demo/pdf/index',
      component: () => import('@/views/demo/pdf/index'),
      meta: { title: 'pdf', icon: 'pdf' }
    },
    {
      path: 'download',
      name: 'demo/pdf/download',
      component: () => import('@/views/demo/pdf/download'),
      hidden: true
    }
  ]
}

export { excel, zip, pdf }
