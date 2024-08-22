import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'
import keycloak from "@/keycloak.js";
import Vue3Toasity from 'vue3-toastify'
import "vue3-toastify/dist/index.css";

// keycloak init

// src/main.js
keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (!authenticated) {
    window.location.reload();
  } else {
    keycloak.loadUserInfo().then((info) => {
      mainStore.setUser({ name: info.preferred_username, email: info.email, loginTime:  Intl.DateTimeFormat("ko", { timeStyle: "full" }).format(new Date()) })
    })
    createApp(App).use(router).use(pinia)
        .use(Vue3Toasity)
        .mount('#app')
  }

  // Optional: Add a token refresher
  setInterval(() => {
    console.log('refresh..')
    keycloak.updateToken(70).catch(() => {
      keycloak.login({redirectUri: '/'});
    });
  }, 10000);



}).catch(() => {
  console.error('Failed to initialize Keycloak');
});
// Init Pinia
const pinia = createPinia()

// Create Vue app

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = '중앙 API 프록시 서비스'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})



