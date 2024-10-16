import axios from 'axios';
import keycloak from '@/keycloak';
import { toast } from 'vue3-toastify';
import { parsePanamaErrorMessage } from '@/utils/error-utils';

const gatewayClient = axios.create({
  baseURL: import.meta.env.GATEWAY_BASE_URL, // API의 기본 URL을 설정합니다.
  timeout: 10000, // 요청 타임아웃을 설정합니다.
});

// 요청 인터셉터를 추가하여 Authorization 헤더를 설정합니다.
gatewayClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 요청 오류가 발생하면 이를 처리합니다.
    handleError(error);
    return Promise.reject(error);
  }
);

gatewayClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 오류가 발생하면 이를 처리합니다.

    handleError(error);
    return Promise.reject(error);
  }
);

const handleError = (error) =>
  toast(parsePanamaErrorMessage(error), {
    theme: 'auto',
    type: 'error',
    transition: 'flip',
    dangerouslyHTMLString: true,
  });

export default gatewayClient;
