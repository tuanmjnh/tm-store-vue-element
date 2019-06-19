import Layout from '@/layout'

const excel = {
  path: '/demo/excel',
  component: Layout,
  redirect: '/demo/excel/export-excel',
  name: 'Excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [
    {
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: { title: 'exportExcel' }
    },
    {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/select-excel'),
      name: 'SelectExcel',
      meta: { title: 'selectExcel' }
    },
    {
      path: 'export-merge-header',
      component: () => import('@/views/excel/merge-header'),
      name: 'MergeHeader',
      meta: { title: 'mergeHeader' }
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/excel/upload-excel'),
      name: 'UploadExcel',
      meta: { title: 'uploadExcel' }
    }
  ]
}

const zip = {
  path: '/demo/zip',
  component: Layout,
  redirect: '/demo/zip/download',
  alwaysShow: true,
  name: 'Zip',
  meta: { title: 'zip', icon: 'zip' },
  children: [
    {
      path: 'download',
      component: () => import('@/views/zip/index'),
      name: 'ExportZip',
      meta: { title: 'exportZip' }
    }
  ]
}

const pdf = {
  path: '/demo/pdf',
  component: Layout,
  redirect: '/demo/pdf/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/pdf/index'),
      name: 'PDF',
      meta: { title: 'pdf', icon: 'pdf' }
    },
    {
      path: '/pdf/download',
      component: () => import('@/views/pdf/download'),
      hidden: true
    }
  ]
}

export { excel, zip, pdf }
