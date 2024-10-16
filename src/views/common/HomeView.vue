<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import {
  mdiApplicationOutline,
  mdiChartTimelineVariant,
  mdiCounter,
  mdiHeartBox,
} from '@mdi/js';
import * as chartConfig from '@/components/Charts/chart.config.js';
import SectionMain from '@/components/SectionMain.vue';
import CardBoxWidget from '@/components/CardBoxWidget.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import {
  fetchAllMetrics,
  metricsData,
} from '@/service/dashboard/MetricService';

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fetchAllMetrics();
  fillChartData();
});

const mainStore = useMainStore();
computed(() => mainStore.clients.slice(0, 4));
computed(() => mainStore.history);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Dashboard"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          color="text-emerald-500"
          suffix="개"
          :icon="mdiCounter"
          :number="metricsData.gatewayRoutesCount"
          label="Route Config Count"
        />
        <CardBoxWidget
          color="text-blue-500"
          :icon="mdiApplicationOutline"
          :number="metricsData.gatewayStartedTime"
          suffix="s "
          label="Gateway Started Time"
        />
        <CardBoxWidget
          color="text-red-500"
          :icon="mdiHeartBox"
          :number="metricsData.health === 'UP' ? 1 : 0"
          label="Health (1: UP)"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
