<template>
  <FormField label="Endpoint">
    <FormControl
      v-model="editDynamicRoute.uri"
      placeholder="ex) https://example.com"
      required
    />
  </FormField>

  <FormField label="Custom Path">
    <FormControl
      v-model="editDynamicRoute.predicate"
      placeholder="ex) /api/v1/service/**"
      required
    />
  </FormField>

  <FormField label="Route Order">
    <FormControl v-model="editDynamicRoute.routeOrder" type="number" />
  </FormField>

  <div class="flex items-center justify-between">
    <h3 class="mt-4 mb-4 text-lg font-bold">Filters</h3>
    <BaseButton color="primary" :icon="mdiPlus" small @click="addFilter"
      >Add Filter</BaseButton
    >
  </div>
  <hr />
  <div
    v-for="(filter, index) in editDynamicRoute.filters"
    :key="index"
    class="mb-2 mt-4"
  >
    <FormField label="Filter Type">
      <FormControl
        v-model="filter.filterName"
        type="select"
        :options="routeFilterOptions"
        required
      />
    </FormField>
    <FormField v-if="filter.filterName" label="Param">
      <FormControl
        v-model="filter.param"
        required
        :placeholder="
          routeFilterPlaceholders[filter.filterName]?.placeholder?.param ??
          'param'
        "
      />
      <FormControl
        v-model="filter.value"
        required
        :placeholder="
          routeFilterPlaceholders[filter.filterName]?.placeholder?.value ??
          'value'
        "
      />
    </FormField>
    <div class="mb-3 flex justify-end">
      <BaseButton
        color="danger"
        :icon="mdiDelete"
        small
        @click="removeFilter(filter, index)"
        >Remove Filter</BaseButton
      >
    </div>
    <hr />
  </div>
</template>

<script setup>
import { editDynamicRoute } from '@/service/route/RouteService';
import { mdiDelete, mdiPlus } from '@mdi/js';
import {
  routeFilterOptions,
  routeFilterPlaceholders,
} from '@/views/route/constant/route-filters';
import FormField from '@/components/FormField.vue';
import BaseButton from '@/components/BaseButton.vue';
import FormControl from '@/components/FormControl.vue';
import { toast } from 'vue3-toastify';

const addFilter = () => {
  editDynamicRoute.filters.push({
    filterName: routeFilterOptions[0].id,
    param: '',
    value: '',
  });
};

const removeFilter = (filter, index) => {
  if (editDynamicRoute.filters.length <= 1) {
    toast.error('Filter need at least one item');
    return;
  }
  editDynamicRoute.filters.splice(index, 1);
  editDynamicRoute.deletedFilters.push(filter);
};
</script>

<style scoped></style>
