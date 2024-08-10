import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/common/HomeView.vue'
import keycloak from "@/keycloak";
import { useMainStore } from '@/stores/main'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/',
    name: 'dashboard',
    component: Home,
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/common/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/common/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/common/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/common/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/common/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/LoginView.vue')
  },
  {
    meta: {
      title: 'Category 관리'
    },
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/CategoryView.vue')
  },
  {
    meta: {
      title: 'API 관리'
    },
    path: '/spec',
    name: 'spec',
    component: () => import('@/views/spec/SpecView.vue')
  },
  {
    meta: {
      title: 'Route 관리',
    },
    path: '/route',
    name: 'route',
    component: () => import('@/views/route/RouteView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/common/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (keycloak.authenticated) {
      next(removeQueryParams(to));
  } else {
    keycloak.login({redirectUri: window.location.origin})
  }
})
function removeQueryParams(to) {
  if (to.path.includes("&state"))
    return { path: to.path.substring(0, to.path.indexOf("&state")) , query: {}, hash: to.hash }
}

export default router
