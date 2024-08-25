import {
  mdiMonitor,
  mdiGithub,
  mdiViewList,
  mdiMenu
} from '@mdi/js'

export default [
  {
    id: 'dashboard',
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    id: 'category',
    to: '/category',
    label: 'Category 관리',
    icon: mdiMenu
  },
  {
    id: 'api',
    label: 'API 관리',
    // to: '/spec',
    icon: mdiViewList,
    menu: []
  },
  {
    id: 'route',
    label: 'Route 관리',
    to: '/route',
    icon: mdiViewList,
  },
  {
    id: 'github',
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },
]
