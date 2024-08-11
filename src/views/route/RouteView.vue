<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiMonitorCellphone" title="Route" main></SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Custom Route를 관리하는 메뉴입니다.</b>
      </NotificationBar>

      <SectionTitleLineWithButton title="Create"></SectionTitleLineWithButton>
      <CardBox is-form @submit.prevent="createDynamicRoute">
        <RouteForm></RouteForm>
        <template #footer>
          <BaseButton label="Create" type="submit" color="info" />
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
import {mdiMonitorCellphone} from "@mdi/js";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import CardBox from "@/components/CardBox.vue";
import RouteTable from "@/components/route/RouteTable.vue";
import {onMounted} from "vue";
import {createDynamicRoute, routeStore} from "@/service/route/RouteService";
import RouteForm from "@/views/route/RouteForm.vue";
import BaseButton from "@/components/BaseButton.vue";

onMounted(() => {
  routeStore.fetchDynamicRoutes();
});
</script>

<style scoped>

</style>