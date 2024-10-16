<script setup>
import { computed, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { mdiCheckDecagram } from '@mdi/js';
import BaseLevel from '@/components/BaseLevel.vue';
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue';
import CardBox from '@/components/CardBox.vue';
import PillTag from '@/components/PillTag.vue';

const mainStore = useMainStore();

const userName = computed(() => mainStore.userName);
const loginTime = computed(() => mainStore.loginTime);
ref(false);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          안녕하세요, <b>{{ userName }}</b
          >!
        </h1>
        <p>
          마지막 로그인시간은 <b>{{ loginTime }}</b> 입니다.
        </p>
        <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
