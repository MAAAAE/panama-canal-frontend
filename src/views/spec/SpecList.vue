<template>
  <!-- API 리스트 -->
  <div class="flex justify-between items-center mb-4 mt-4">
    <h2 class="text-2xl font-bold">11ST</h2>
<!--    <p class="text-gray-600">{{ description }}</p>-->
  </div>
  <hr>
  <div class="mt-8">
    <div
        v-for="api in apiList"
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
          <span class="ml-2 font-semibold">{{ api.title }}</span>
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
        <FormField label="Secret">
          <div class="flex items-center">
            <FormControl
                v-model="api.secret"
                :type="api.showSecret ? 'text' : 'password'"
                :disabled="true"
                class="flex-grow"
            />
            <BaseButton
                :label="api.showSecret ? 'Hide' : 'Visible'"
                size="small"
                @click="toggleSecret(api.id)"
                class="ml-2"
            />
          </div>
        </FormField>
        <FormField label="Headers">
          <FormControl
              v-model="api.headers"
              type="textarea"
              :disabled="true"
              class="w-full"
          />
        </FormField>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import { ref } from "vue";

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

const editAPI = (api) => {
  console.log('Edit API:', api);
};

const deleteAPI = (apiId) => {
  console.log('Delete API ID:', apiId);
  apiList.value = apiList.value.filter((api) => api.id !== apiId);
};

const toggleDetails = (apiId) => {
  const api = apiList.value.find((api) => api.id === apiId);
  if (api) {
    api.showDetails = !api.showDetails;
  }
};

const toggleSecret = (apiId) => {
  const api = apiList.value.find((api) => api.id === apiId);
  if (api) {
    api.showSecret = !api.showSecret;
    api.secret = api.showSecret ? 'your-secret-key' : '********************';
  }
};
</script>

<style scoped></style>