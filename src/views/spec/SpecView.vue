<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTag" title="API 관리" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>나만의 API 문서를 만들어 관리해보세요. </b>
      </NotificationBar>
      <CardBox is-form @submit.prevent="onSubmit">
        <FormField label="Title">
          <FormControl
            v-model="createAPISpec.name"
            type="text"
            placeholder="ex. OPEN-API"
            :icon="mdiTag"
          />
        </FormField>
        <FormField label="Endpoint">
          <div class="flex space-x-2">
            <FormControl
              v-model="createAPISpec.method"
              class="w-1/6"
              type="select"
              :options="['GET', 'POST', 'PUT', 'DELETE', 'PATCH']"
              :icon="mdiEarth"
            />
            <FormControl
              v-model="createAPISpec.endpoint"
              class="flex-grow"
              type="text"
              placeholder="https://localhost:8080/"
              :icon="mdiEarth"
            />
          </div>
        </FormField>
        <FormField label="Custom Route">
          <FormControl
            v-model="createAPISpec.customRouteId"
            type="select"
            :options="routeStore.existRoutesOptions"
            :icon="mdiTag"
          />
        </FormField>
        <FormField label="Request Example">
          <PrismEditor
            v-model="createAPISpec.request"
            class="my-editor"
            :highlight="highlighter"
            line-numbers
          />
        </FormField>
        <template #footer>
          <div class="flex justify-end">
            <BaseButton label="Create" type="submit" color="info" />
          </div>
        </template>
      </CardBox>

      <SpecList></SpecList>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { mdiEarth, mdiMonitorCellphone, mdiTag } from '@mdi/js';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue';
import CardBox from '@/components/CardBox.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import SpecList from '@/views/spec/SpecList.vue';
import { routeStore } from '@/service/route/RouteService';
import {
  createAPISpec,
  createSpec,
  specStore,
} from '@/service/spec/SpecService';
import { highlight } from 'prismjs/components/prism-core';
import { PrismEditor } from 'vue-prism-editor';

import 'prismjs/components/prism-json';
import { useRoute } from 'vue-router';
import { categoryStore } from '@/service/category/CategoryService';
import NotificationBar from '@/components/NotificationBar.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

const route = useRoute();
const categoryId = ref(route.params.id);

onMounted(() => {
  loadData();
});

const loadData = () => {
  specStore.fetchApiSpecs(categoryId.value);
  categoryStore.fetchCategoryById(categoryId.value);
  routeStore.fetchDynamicRouteOptions();
};

const onSubmit = async () => {
  createAPISpec.categoryId = categoryId.value;
  await createSpec();
  loadData();
};

const highlighter = (code) => {
  // eslint-disable-next-line no-undef
  return highlight(code, Prism.languages.json, 'json');
};

watch(
  () => route.params.id,
  async (newId) => {
    categoryId.value = newId;
    await loadData();
  }
);
</script>

<style scoped>
.my-editor {
  background-color: #2d2d2d;
  max-height: 400px;
  font-family:
    Fira code,
    Fira Mono,
    Consolas,
    Menlo,
    Courier,
    monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
  caret-color: aliceblue;
  color: aliceblue;
}
</style>
