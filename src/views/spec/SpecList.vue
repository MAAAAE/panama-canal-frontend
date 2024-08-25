<template>
  <div class="flex justify-between items-center mb-4 mt-4">
    <h2 class="text-2xl font-bold">{{ categoryStore.category.name }}</h2>
    <BaseButton :icon="mdiKey" @click="isSecretModalActive = true"/>
  </div>
  <hr>
  <div class="mt-8">
    <div
        v-for="api in specStore.specs"
        :key="api.id"
        :class="['border border-gray-300 rounded-lg mb-4']"
    >
      <div
          class="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg"
          @click="toggleDetails(api.id)"
      >
        <div class="flex items-center">
              <span
                  :class="['text-white text-xs font-bold mr-2 px-2.5 py-1 rounded', getMethodColor(api.method)]"
              >
                {{ api.method }}
              </span>
          <span class="ml-2 font-semibold">{{ api.name }}</span>
          <span class="ml-4 font-light">{{ api.endpoint }}</span>
        </div>
        <div class="flex space-x-3">
          <BaseButton
              label="edit"
              color="primary"
              size="small"
              @click="editAPI(api)"
          />
          <BaseButton
              label="remove"
              color="danger"
              size="small"
              @click="deleteAPI(api.id)"
          />
        </div>
      </div>
      <div v-if="api.showDetails" class="p-4">
        <FormField label="Endpoint">
          <FormControl
              v-model="api.endpoint"
              :disabled="true"
          />
        </FormField>
        <FormField label="Custom Route">
          <FormControl
              v-model="api.dynamicRouteConfig.predicate"
              :disabled="true"
          />
        </FormField>
        <FormField label="Request Example">
          <PrismEditor
              class="my-editor"
              v-model="api.request"
              :readonly="true"
              :highlight="highlighter"
              line-numbers
          />
        </FormField>
        <FormField label="Response Example">
          <PrismEditor
              class="my-editor"
              v-model="api.response"
              :readonly="true"
              :highlight="highlighter"
              line-numbers
          />
        </FormField>
        <FormField label="Custom Filters">
          <PrismEditor
              class="my-editor"
              :model-value="api.filtersJson"
              readonly
              :highlight="highlighter"
              line-numbers
          />
        </FormField>
      </div>
    </div>
  </div>

  <CardBoxModal
      v-model="isSecretModalActive"
      title="Secret"
      has-cancel
      :base-button="false"
  >
    <div class="flex items-center">
      <FormControl
          v-model="categoryStore.category.secretKey"
          :type="showSecret ? 'text' : 'password'"
          :disabled="true"
          class="flex-grow"
      />
      <BaseButton
          :label="showSecret ? 'Hide' : 'Visible'"
          size="small"
          @click="toggleSecret"
          class="ml-2"
      />
    </div>
  </CardBoxModal>
</template>

<script setup>
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import {specStore} from "@/service/spec/SpecService";
import {categoryStore} from "@/service/category/CategoryService";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";
import {highlight} from "prismjs/components/prism-core";
import CardBoxModal from "@/components/CardBoxModal.vue";
import {mdiKey} from "@mdi/js";

const getMethodColor = (method) => {
  switch (method) {
    case 'GET':
      return 'bg-green-500';
    case 'POST':
      return 'bg-blue-500';
    case 'PUT':
      return 'bg-yellow-500';
    case 'DELETE':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const isSecretModalActive = ref(false);
const showSecret = ref(false);

const editAPI = (api) => {
  // TODO: editAPI
};

const deleteAPI = (apiId) => {
  // TODO: delete API
};

const toggleDetails = (apiId) => {
  const api = specStore.specs.find((api) => api.id === apiId);
  if (api) {
    api.showDetails = !api.showDetails;
    if (api.showDetails) {
      api.filtersJson = formattedFilters(api.dynamicRouteConfig.filters.map(({id, ...rest}) => rest));
    }
  }
};

const toggleSecret = () => {
  showSecret.value = !showSecret.value;
};

const formattedFilters = (filters) => {
  return JSON.stringify(filters, null, 2);
};

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