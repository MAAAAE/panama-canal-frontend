<template>
  <FormField label="Endpoint">
    <FormControl v-model="dynamicRoute.uri"
                 placeholder="ex) https://example.com"
                 required
    />
  </FormField>

  <FormField label="Custom Path">
    <FormControl
        v-model="dynamicRoute.predicate"
        placeholder="ex) /api/v1/service/**"
        required/>
  </FormField>

  <FormField label="Route Order">
    <FormControl v-model="dynamicRoute.routeOrder" type="number"/>
  </FormField>

  <div class="flex items-center justify-between">
    <h3 class="mt-4 mb-4 text-lg font-bold">Filters</h3>
    <BaseButton color="primary" :icon="mdiPlus" small @click="addFilter">Add Filter</BaseButton>
  </div>
  <hr>
  <div v-for="(filter, index) in dynamicRoute.filters" :key="index" class="mb-2 mt-4">
    <FormField label="Filter Type">
      <FormControl
          v-model="filter.filterName"
          type="select"
          :options="routeFilterOptions"
          required
      />
    </FormField>
    <FormField v-if="filter.filterName" label="Param">
      <FormControl v-model="filter.param"
                   required
                   :placeholder="routeFilterPlaceholders[filter.filterName]?.placeholder?.param ?? 'param'"/>
      <FormControl v-model="filter.value"
                   required
                   :placeholder="routeFilterPlaceholders[filter.filterName]?.placeholder?.value ?? 'value'"/>
    </FormField>
    <div class="mb-3 flex justify-end">
      <BaseButton color="danger" :icon="mdiDelete" small @click="removeFilter(index)">Remove Filter</BaseButton>
    </div>
    <hr>
  </div>

</template>

<script setup>

import {dynamicRoute} from "@/service/route/RouteService";
import {mdiDelete, mdiPlus} from "@mdi/js";
import {routeFilterOptions, routeFilterPlaceholders} from "@/views/route/constant/route-filters";
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import {toast} from "vue3-toastify";

const addFilter = () => {
  dynamicRoute.filters.push({filterName: routeFilterOptions[0].id, param: '', value: ''})
}

const removeFilter = (index) => {
  if (dynamicRoute.filters.length <= 1) {
    toast.error("Filter need at least one item");
    return;
  }
  dynamicRoute.filters.splice(index, 1)
}
</script>

<style scoped>

</style>