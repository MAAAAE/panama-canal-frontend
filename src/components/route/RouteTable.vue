<template>
  <table class="min-w-full bg-white dark:bg-slate-800">
    <thead class="bg-gray-100 dark:bg-slate-900">
      <tr>
        <th>ID</th>
        <th>Endpoint</th>
        <th>Custom Route</th>
        <th>Filters</th>
        <th>Order</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="route in itemsPaginated" :key="route.id">
        <td>{{ route.id }}</td>
        <td>{{ route.uri }}</td>
        <td>{{ route.predicate }}</td>
        <td class="whitespace-break-spaces">
          {{ formattedFilters(route.filters) }}
        </td>
        <td>{{ route.routeOrder }}</td>
        <td>
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="openEditRouteModal(route)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="confirmDelete(route.id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>

  <CardBoxModal
    v-model="isDeleteModalActive"
    title="Delete Route"
    has-cancel
    button="danger"
    button-label="Delete"
    @confirm="deleteRoute"
  >
    <h3 class="mt-4 text-lg font-semibold">Are you sure you want to delete?</h3>
  </CardBoxModal>

  <CardBoxModal
    v-model="isEditModalActive"
    title="Edit Route"
    has-cancel
    @confirm="editRoute"
    @cancel="editCancel"
  >
    <RouteEditForm></RouteEditForm>
  </CardBoxModal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { mdiEye, mdiTrashCan } from '@mdi/js';
import BaseLevel from '@/components/BaseLevel.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';
import {
  deleteDynamicRoute,
  editDynamicRoute,
  editRouteAndFilters,
  resetEditDynamicRoute,
  routeStore,
} from '@/service/route/RouteService';
import CardBoxModal from '@/components/CardBoxModal.vue';
import RouteEditForm from '@/views/route/RouteEditForm.vue';
import { toast } from 'vue3-toastify';
import _ from 'lodash';

const items = computed(() => routeStore.routes);

const isEditModalActive = ref(false);
const isDeleteModalActive = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
const selectedRouteId = ref(null);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const openEditRouteModal = (route) => {
  Object.assign(editDynamicRoute, _.cloneDeep(route));
  isEditModalActive.value = true;
};

const editRoute = async () => {
  if (!editDynamicRoute.id || editDynamicRoute.id < 0) {
    toast.error('Edit Route ID has been reset. Please try again');
    return;
  }
  await editRouteAndFilters(editDynamicRoute.id);
};

const editCancel = () => {
  resetEditDynamicRoute();
  isEditModalActive.value = false;
};

const confirmDelete = (routeId) => {
  isDeleteModalActive.value = true;
  selectedRouteId.value = routeId;
};

const deleteRoute = async () => {
  await deleteDynamicRoute(selectedRouteId.value);
};

const formattedFilters = (filters) => {
  return filters
    .map((f) => `${f.filterName}: ${f.param}, ${f.value}`)
    .join('\n');
};
</script>
