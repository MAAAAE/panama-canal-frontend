import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'
import keycloak from "@/keycloak.js";
import Vue3Toasity from 'vue3-toastify'
import "vue3-toastify/dist/index.css";

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import 'prismjs/themes/prism-tomorrow.css';

// keycloak init

// src/main.js
keycloak.init({onLoad: 'login-required', checkLoginIframe: false}).then((authenticated) => {
  if (!authenticated) {
    window.location.reload();
  } else {
    keycloak.loadUserInfo().then((info) => {
      mainStore.setUser({ name: info.preferred_username, email: info.email, loginTime:  Intl.DateTimeFormat("ko", { timeStyle: "full" }).format(new Date()) })
    })
    createApp(App)
        .component('PrismEditor', PrismEditor)
        .use(router)
        .use(pinia)
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



}).catch((e) => {
  console.error('Failed to initialize Keycloak', e);
});
// Init Pinia
const pinia = createPinia()

// Create Vue app

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Default title tag
const defaultDocumentTitle = '중앙 API 프록시 서비스'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})



