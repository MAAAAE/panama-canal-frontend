<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent="onSubmit">
        <FormField label="Title">
          <FormControl v-model="createAPISpec.name" type="text" placeholder="ex. OPEN-API" :icon="mdiTag"/>
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
                v-model="createAPISpec.endpoint"
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
              class="my-editor"
              v-model="createAPISpec.request"
              :highlight="highlighter"
              line-numbers
          />
        </FormField>
        <FormField label="Response Example">
          <PrismEditor
              class="my-editor"
              v-model="createAPISpec.response"
              :highlight="highlighter"
              line-numbers
          />
        </FormField>
        <template #footer>
          <div class="flex justify-end">
            <BaseButton label="Create" type="submit" color="info"/>
          </div>
        </template>
      </CardBox>

      <SpecList></SpecList>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {mdiEarth, mdiTag} from '@mdi/js';
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import SpecList from "@/views/spec/SpecList.vue";
import {routeStore} from "@/service/route/RouteService";
import {createAPISpec, createSpec, specStore} from "@/service/spec/SpecService";
import {highlight} from 'prismjs/components/prism-core';
import {PrismEditor} from "vue-prism-editor";

import 'prismjs/components/prism-json';
import {useRoute} from "vue-router";
import {categoryStore} from "@/service/category/CategoryService";

const route = useRoute();
const categoryId = ref(route.params.id);

onMounted(() => {
  loadData();
});

const loadData = () => {
  specStore.fetchApiSpecs(categoryId.value);
  categoryStore.fetchCategoryById(categoryId.value);
  routeStore.fetchDynamicRouteOptions();
}

const onSubmit = async () => {
  createAPISpec.categoryId = categoryId.value;
  await createSpec();
  loadData();
}


const highlighter = (code) => {
  return highlight(code, Prism.languages.json, "json");
}

watch(() => route.params.id, async (newId) => {
  categoryId.value = newId;
  await loadData();
});
</script>

<style scoped>
.my-editor {
  background-color: #2d2d2d;
  max-height: 400px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
  caret-color: aliceblue;
  color: aliceblue;
}
</style>
