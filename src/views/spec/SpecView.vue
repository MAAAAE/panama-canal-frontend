<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent="createSpec">
        <FormField label="Title">
          <FormControl v-model="createAPISpec.title" type="text" placeholder="ex. OPEN-API" :icon="mdiTag"/>
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
          <FormControl
              v-model="createAPISpec.customRoute"
              type="select"
              :options="routeStore.existRoutesOptions"
              :icon="mdiTag"
          />
        </FormField>
        <FormField label="Category">
          <FormControl
            v-model="createAPISpec.category"
            type="select"
            :options="categoryStore.categoryOptions"
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
import {onMounted, ref} from "vue";
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
import {categoryStore} from "@/service/category/CategoryService";

const props = defineProps({
  categoryId: {
    type: Number,
    default: 1,
  }
});

onMounted(async () => {
  await specStore.fetchApiSpecs(props.categoryId);
  await categoryStore.fetchCategoryOptions();
  await routeStore.fetchDynamicRouteOptions();
});

const highlighter = (code) => {
  return highlight(code, Prism.languages.json, "json");
}
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
