<template>
  <div>
    <h1>Metrics Dashboard</h1>
    <p>Gateway Route Count: {{ metricsData.gatewayRequestsCount }}</p>
    <p>Gateway Started Time: {{ metricsData.gatewayStartedTime }} s</p>
    <button @click="fetchAllMetrics">Refresh Metrics</button>
  </div>
</template>

<script>
import {
  metricsData,
  fetchAllMetrics,
} from '@/service/dashboard/MetricService';

export default {
  setup() {
    // Fetch metrics when the component is mounted
    fetchAllMetrics();
    return {
      metricsData,
      fetchAllMetrics,
    };
  },
};
</script>
