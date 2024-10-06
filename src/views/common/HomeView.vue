<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import {
  mdiApplicationOutline,
  mdiChartTimelineVariant,
  mdiCounter,
  mdiGithub,
  mdiHeartBox,
} from '@mdi/js';
import * as chartConfig from '@/components/Charts/chart.config.js';
import SectionMain from '@/components/SectionMain.vue';
import CardBoxWidget from '@/components/CardBoxWidget.vue';
import BaseButton from '@/components/BaseButton.vue';
import CardBoxTransaction from '@/components/CardBoxTransaction.vue';
import CardBoxClient from '@/components/CardBoxClient.vue';
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

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
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
          label="gateway started time"
        />
        <CardBoxWidget
          color="text-red-500"
          :icon="mdiHeartBox"
          :number="metricsData.health === 'UP' ? 1 : 0"
          label="게이트웨이 상태 (1: UP)"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
