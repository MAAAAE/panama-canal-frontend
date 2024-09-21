import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/apiClient';

export const useSpecStore = defineStore('specs', () => {
  const specs = ref([]);

  const fetchApiSpecs = (categoryId) => {
    apiClient.get(`/api/specs/category/${categoryId}`).then((result) => {
      specs.value = result?.data;
    });
  };

  return {
    specs,
    fetchApiSpecs,
  };
});
