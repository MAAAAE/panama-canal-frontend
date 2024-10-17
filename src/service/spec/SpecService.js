import { reactive } from 'vue';
import apiClient from '@/apiClient';
import { useSpecStore } from '@/stores/spec/userSpecStore';
import { toast } from 'vue3-toastify';

const specStore = useSpecStore();

const createAPISpec = reactive({
  name: '',
  method: 'GET',
  endpoint: '',
  customRouteId: '',
  request: '',
  response: '',
  categoryId: '',
});

const createSpec = async () => {
  await apiClient.post('/api/specs', createAPISpec);
  toast('API Spec Created!');
  resetCreateApiSpec();
};

const deleteSpec = async (id) => {
  await apiClient.delete(`/api/specs/${id}`);
  toast('API Spec Deleted!');
};

const resetCreateApiSpec = () => {
  createAPISpec.endpoint = '';
  createAPISpec.name = '';
  createAPISpec.method = 'GET';
  createAPISpec.customRouteId = '';
  createAPISpec.request = '';
  createAPISpec.response = '';
  createAPISpec.categoryId = '';
};

export { createSpec, specStore, createAPISpec, deleteSpec };
