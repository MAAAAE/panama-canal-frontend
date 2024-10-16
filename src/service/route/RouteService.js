import apiClient from '@/apiClient';
import { toast } from 'vue3-toastify';
import { reactive } from 'vue';
import { useRouteStore } from '@/stores/route/useRouteStore';
import { routeFilterOptions } from '@/views/route/constant/route-filters';

const routeStore = useRouteStore();

const dynamicRoute = reactive({
  uri: '',
  predicate: '',
  filters: [{ filterName: routeFilterOptions[0].id, param: '', value: '' }],
  routeOrder: 1,
});

const createDynamicRoute = () => {
  apiClient.post('/api/dynamic-route', dynamicRoute).then(() => {
    toast('dynamic route created!');
    routeStore.fetchDynamicRoutes();
    resetDynamicRoute();
  });
};

const deleteDynamicRoute = (id) => {
  apiClient.delete(`/api/dynamic-route/${id}`).then(() => {
    toast('dynamic route deleted!');
    routeStore.fetchDynamicRoutes();
  });
};

const resetDynamicRoute = () => {
  dynamicRoute.uri = '';
  dynamicRoute.predicate = '';
  dynamicRoute.filters = [
    { filterName: routeFilterOptions[0].id, param: '', value: '' },
  ];
  dynamicRoute.routeOrder = 1;
};

export { routeStore, dynamicRoute, createDynamicRoute, deleteDynamicRoute };
