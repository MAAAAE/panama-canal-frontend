import {
  mdiMonitor,
  mdiGithub,
  mdiViewList,
  mdiMenu
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/category',
    label: 'Category 관리',
    icon: mdiMenu
  },
  {
    label: 'API 관리',
    to: '/spec',
    icon: mdiViewList,
    menu: [
      {
        label: '동적 구현 필요1'
      },
      {
        label: '동적 구현 필요2'
      }
    ]
  },
  {
    label: 'Route 관리',
    to: '/route',
    icon: mdiViewList,
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },
]
