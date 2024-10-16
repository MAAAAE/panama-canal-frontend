<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar> </FooterBar>
    </div>
  </div>
</template>

<script setup>
import { mdiBackburger, mdiForwardburger, mdiMenu } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import menuAside from '@/menuAside.js';
import menuNavBar from '@/menuNavBar.js';
import { useDarkModeStore } from '@/stores/common/darkMode.js';
import BaseIcon from '@/components/BaseIcon.vue';
import NavBar from '@/components/NavBar.vue';
import NavBarItemPlain from '@/components/NavBarItemPlain.vue';
import AsideMenu from '@/components/AsideMenu.vue';
import FooterBar from '@/components/FooterBar.vue';
import keycloak from '@/keycloak';
import { useMenuStore } from '@/stores/common/useMenuStore';

const layoutAsidePadding = 'xl:pl-60';

const darkModeStore = useDarkModeStore();

const router = useRouter();

const menuStore = useMenuStore();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

onMounted(async () => {
  const apiMenu = menuAside.find((item) => item.id === 'api');
  if (!Array.isArray(apiMenu) || !apiMenu.length) {
    await menuStore.fetchMenus();
    apiMenu.menu = menuStore.menus;
  }
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set();
  }

  if (item.isLogout) {
    keycloak.logout();
  }
};
</script>
