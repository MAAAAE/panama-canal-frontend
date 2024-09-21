<script setup>
// import { reactive } from 'vue';
// import { useMainStore } from '@/stores/main';
import { mdiAccount, mdiGithub } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import BaseButton from '@/components/BaseButton.vue';
import UserCard from '@/components/UserCard.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

// const mainStore = useMainStore();

// const profileForm = reactive({
//   name: mainStore.userName,
//   email: mainStore.userEmail,
// });

// const passwordForm = reactive({
//   password_current: '',
//   password: '',
//   password_confirmation: '',
// });
//
// const submitProfile = () => {
//   mainStore.setUser(profileForm);
// };
//
// const submitPass = () => {
//   //
// };
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
