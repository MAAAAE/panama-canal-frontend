<template>
  <div class="flex justify-between items-center mb-4 mt-4">
    <h2 class="text-2xl font-bold">{{ categoryStore.category.name }}</h2>
    <BaseButton :icon="mdiKey" @click="isSecretModalActive = true" />
  </div>
  <hr />
  <div class="mt-8">
    <div
      v-for="(api, index) in specStore.specs"
      :key="api.id"
      :class="['border border-gray-300 rounded-lg mb-4']"
    >
      <div
        class="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg"
        @click="toggleDetails(api.id)"
      >
        <div class="flex items-center">
          <span
            :class="[
              'text-white text-xs font-bold mr-2 px-2.5 py-1 rounded',
              getMethodColor(api.method),
            ]"
          >
            {{ api.method }}
          </span>
          <span class="ml-2 font-semibold">{{ api.name }}</span>
          <span class="ml-4 font-light">{{ api.endpoint }}</span>
        </div>
        <div class="flex space-x-3">
          <BaseButton
            label="call"
            color="warning"
            size="small"
            @click.stop="fetchAPI(api, index)"
          />
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
          <FormControl v-model="api.endpoint" :disabled="true" />
        </FormField>
        <FormField label="Custom Route">
          <FormControl
            v-model="api.dynamicRouteConfig.predicate"
            :disabled="true"
          />
        </FormField>
        <FormField label="Request Example">
          <PrismEditor
            v-model="api.request"
            class="my-editor"
            :readonly="true"
            :highlight="highlighter"
            line-numbers
          />
        </FormField>
        <FormField label="Response Example">
          <PrismEditor
            v-model="api.response"
            class="my-editor"
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
        class="ml-2"
        @click="toggleSecret"
      />
    </div>
  </CardBoxModal>
</template>

<script setup>
import FormField from '@/components/FormField.vue';
import BaseButton from '@/components/BaseButton.vue';
import FormControl from '@/components/FormControl.vue';
import { specStore } from '@/service/spec/SpecService';
import { categoryStore } from '@/service/category/CategoryService';
import { PrismEditor } from 'vue-prism-editor';
import { ref } from 'vue';
import { highlight } from 'prismjs/components/prism-core';
import CardBoxModal from '@/components/CardBoxModal.vue';
import { mdiKey } from '@mdi/js';
import axios from 'axios';
import { toast } from 'vue3-toastify';

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
  console.log(api);
  // TODO: editAPI
};

const deleteAPI = (apiId) => {
  // TODO: delete API
  console.log(apiId);
};
const fetchAPI = async (api, index) => {
  try {
    let res = await axios({
      method: api.method, // 기본 값
      baseURL: '/routes',
      url: api.dynamicRouteConfig.predicate,
    });
    toast('호출 성공. 결과를 확인해보세요.', { autoClose: 1000 });

    const request = requestInfo(res.config);
    updateSpecWithResponse({
      api,
      index,
      request,
      responseData: res.data,
    });
  } catch (error) {
    if (error.response) {
      toast.error('목적지가 에러를 응답했습니다. 응답값을 확인해보세요.', {
        autoClose: 1000,
      });

      // 서버가 상태 코드를 반환한 경우
      console.error('Error Response Data:', error.response.data);
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);

      const request = requestInfo(error.response.config);
      updateSpecWithResponse({
        api,
        index,
        request,
        responseData: error.response.data,
      });
    }
  }
};

const toggleDetails = (apiId) => {
  const api = specStore.specs.find((api) => api.id === apiId);
  if (api) {
    api.showDetails = !api.showDetails;
    if (api.showDetails) {
      api.filtersJson = formattedFilters(
        // eslint-disable-next-line no-unused-vars
        api.dynamicRouteConfig.filters.map(({ id, ...rest }) => rest)
      );
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
  // eslint-disable-next-line no-undef
  return highlight(code, Prism.languages.json, 'json');
};

const requestInfo = (config) => ({
  url: config.url,
  method: config.method.toUpperCase(), // 대문자로 표기
  headers: config.headers,
  data: config.data,
  timeout: config.timeout,
  baseURL: config.baseURL || 'None', // baseURL이 설정되지 않았을 경우 'None'으로 표시
});

const updateSpecWithResponse = ({ api, index, request, responseData }) => {
  const copiedSpec = { ...api };
  copiedSpec.request = formattedFilters(request);
  copiedSpec.response = formattedFilters(responseData);
  specStore.updateSpecByIndex(index, copiedSpec);
};
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
