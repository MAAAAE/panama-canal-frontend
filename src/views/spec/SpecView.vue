<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox form @submit.prevent="create">
        <FormField label="Title">
          <FormControl v-model="createAPISpec.title" type="text" placeholder="ex. OPEN-API" :icon="mdiTag" />
        </FormField>
        <FormField label="Endpoint">
          <div class="flex space-x-2">
            <FormControl
                class="w-1/6"
                v-model="createAPISpec.method"
                type="select"
                :options="['GET', 'POST', 'PUT', 'DELETE', 'PATCH']"
                :icon="mdiEarth"
            />
            <FormControl
                class="flex-grow"
                v-model="createAPISpec.uri"
                type="text"
                placeholder="https://localhost:8080/"
                :icon="mdiEarth"
            />
          </div>
        </FormField>
        <FormField label="Custom Route">
          <FormControl v-model="createAPISpec.customRoute" type="text" placeholder="/open-api" :icon="mdiTag" />
        </FormField>
        <FormField label="Headers">
          <FormControl v-model="createAPISpec.headers" type="text" placeholder="Content-Type: application/json" :icon="mdiTag" />
        </FormField>
        <template #footer>
          <div class="flex justify-end">
            <BaseButton label="Create" type="submit" color="info" @click="create" />
          </div>
        </template>
      </CardBox>

      <SpecList></SpecList>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { mdiEarth, mdiTag } from '@mdi/js';
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import SpecList from "@/views/spec/SpecList.vue";
import {useSpecStore} from "@/stores/spec/userSpecStore";

const specStore = useSpecStore();
const props = defineProps({
  categoryId: {
    type: Number,
    default: 1,
  }
});
onMounted(() => {
  specStore.fetchApiSpecs(props.categoryId);
  console.log(specStore.specs);
});


const createAPISpec = ref({
  title: '',
  method: 'GET',
  uri: '',
  customRoute: '',
  headers: '',
});


const create = () => {
  console.log('Create API:', createAPISpec.value);
  // 새 API 항목 추가
  apiList.value.push({
    id: Date.now(),
    method: createAPISpec.value.method,
    endpoint: createAPISpec.value.uri,
    secret: '********************',
    showSecret: false,
    headers: createAPISpec.value.headers,
    showDetails: false,
  });


  createAPISpec.value = {
    title: '',
    method: 'GET',
    uri: '',
    customRoute: '',
    headers: '',
  };
};


const apiList = ref([
  {
    id: 1,
    method: 'GET',
    title: '주문 조회',
    endpoint: '/api/v1/resource',
    secret: '********************',
    showSecret: false,
    headers: 'Authorization: Bearer token',
    showDetails: false,
  },
  {
    id: 2,
    method: 'POST',
    title: '주문 생성',
    endpoint: '/api/v1/resource/create',
    secret: '********************',
    showSecret: false,
    headers: 'Content-Type: application/json',
    showDetails: false,
  },

]);
</script>

<style scoped>
</style>
