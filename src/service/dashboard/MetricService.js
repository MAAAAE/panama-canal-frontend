import { reactive } from 'vue';
import gatewayClient from '@/gatewayClient';
import { toast } from 'vue3-toastify';

// Initial state for the metrics dashboard
const initialMetricsState = {
  gatewayRequestsCount: 0,
  gatewayStartedTime: 0,
};

// Reactive object for storing metric data
const metricsData = reactive({ ...initialMetricsState });

// Function to reset the metrics data
function resetMetricsData() {
  Object.assign(metricsData, initialMetricsState);
}

// Fetch gateway request count
const fetchGatewayRequestsCount = async () => {
  try {
    const response = await gatewayClient.get(
      '/actuator/metrics/spring.cloud.gateway.routes.count'
    );
    metricsData.gatewayRequestsCount = response.data.measurements[0].value;
  } catch (error) {
    toast.error('Error fetching gateway requests count');
    console.error(error);
  }
};

// Fetch gateway response time
const fetchAppStartedTime = async () => {
  try {
    const response = await gatewayClient.get(
      '/actuator/metrics/application.started.time'
    );
    metricsData.gatewayStartedTime = response.data.measurements[0].value;
  } catch (error) {
    toast.error('Error fetching gateway response time');
    console.error(error);
  }
};

// Fetch all metrics
const fetchAllMetrics = async () => {
  await fetchGatewayRequestsCount();
  await fetchAppStartedTime();
  toast.success('Metrics updated successfully');
};

// Optional: Add additional metrics (e.g., error count, active connections)
const fetchGatewayErrorCount = async () => {
  try {
    const response = await gatewayClient.get(
      '/actuator/metrics/gateway.errors.count'
    );
    metricsData.gatewayErrorCount = response.data.measurements[0].value;
  } catch (error) {
    toast.error('Error fetching gateway error count');
    console.error(error);
  }
};

export {
  metricsData,
  fetchGatewayRequestsCount,
  fetchAppStartedTime,
  fetchAllMetrics,
  fetchGatewayErrorCount,
  resetMetricsData,
};
