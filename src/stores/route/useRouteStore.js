import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/apiClient';

export const useRouteStore = defineStore('route', () => {
  const routes = ref([]);
  const existRoutesOptions = ref([]);

  const fetchDynamicRoutes = () => {
    apiClient.get(`/api/dynamic-route/all`).then((result) => {
      routes.value = result?.data;
    });
  };

  const fetchDynamicRouteOptions = () => {
    apiClient.get(`/api/dynamic-route/options`).then((result) => {
      existRoutesOptions.value = result?.data;
    });
  };

  return {
    routes,
    existRoutesOptions,
    fetchDynamicRoutes,
    fetchDynamicRouteOptions,
  };
});
