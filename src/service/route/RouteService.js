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

const editDynamicRoute = reactive({
  uri: '',
  predicate: '',
  filters: [],
  routeOrder: 1,
  deletedFilters: [],
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

const editRouteAndFilters = (id) => {
  apiClient.put(`/api/dynamic-route/${id}`, editDynamicRoute).then(() => {
    toast('dynamic route edited!');
    routeStore.fetchDynamicRoutes();
    resetEditDynamicRoute();
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

const resetEditDynamicRoute = () => {
  editDynamicRoute.routeOrder = 1;
  editDynamicRoute.uri = '';
  editDynamicRoute.predicate = '';
  editDynamicRoute.filters = [];
  editDynamicRoute.deletedFilters = [];
  editDynamicRoute.insertedFilters = [];
};

export {
  routeStore,
  dynamicRoute,
  createDynamicRoute,
  deleteDynamicRoute,
  editDynamicRoute,
  resetEditDynamicRoute,
  editRouteAndFilters,
};
