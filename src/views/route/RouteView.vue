<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiMonitorCellphone" title="Route" main></SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Custom Route를 관리하는 메뉴입니다.</b>
      </NotificationBar>

      <SectionTitleLineWithButton title="Create"></SectionTitleLineWithButton>
      <CardBox form @submit.prevent="createDynamicRoute">
        <FormField label="Endpoint">
          <FormControl v-model="dynamicRoute.uri" placeholder="ex) https://example.com" :required="true"/>
        </FormField>

        <FormField label="Custom Path">
          <FormControl v-model="dynamicRoute.predicate" placeholder='ex) /api/v1/service/**' :required="true"/>
        </FormField>

        <FormField label="Route Order">
          <FormControl v-model="dynamicRoute.routeOrder" type="number" />
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
            />
          </FormField>
          <FormField v-if="filter.filterName" label="Param">
            <FormControl v-model="filter.param"
                         :placeholder="routeFilterPlaceholders[filter.filterName]?.placeholder?.param ?? 'param'"/>
            <FormControl v-model="filter.value"
                         :placeholder="routeFilterPlaceholders[filter.filterName]?.placeholder?.value ?? 'value'"/>
          </FormField>
          <div class="mb-3 flex justify-end">
            <BaseButton color="danger" :icon="mdiDelete" small @click="removeFilter">Remove Filter</BaseButton>
          </div>
          <hr>
        </div>

        <template #footer>
          <BaseButton label="Create" type="submit" color="info" @click="createDynamicRoute"/>
        </template>
      </CardBox>

      <base-divider></base-divider>

      <SectionTitleLineWithButton title="Route List"></SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <RouteTable></RouteTable>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import {mdiDelete, mdiMonitorCellphone, mdiPlus} from "@mdi/js";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import CardBox from "@/components/CardBox.vue";
import RouteTable from "@/components/route/RouteTable.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import {onMounted, ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {routeFilterOptions, routeFilterPlaceholders} from "@/views/route/constant/route-filters";
import {toast} from "vue3-toastify";
import {createDynamicRoute, dynamicRoute, routeStore} from "@/service/route/RouteService";

const addFilter = () => {
  dynamicRoute.filters.push({filterName: '', param: '', value: ''})
}

const removeFilter = (index) => {
  if (dynamicRoute.filters.length <= 1) {
    toast.error("Filter need at least one item");
    return;
  }
  dynamicRoute.filters.splice(index, 1)
}
onMounted(() => {
  routeStore.fetchDynamicRoutes();
})


</script>

<style scoped>

</style>