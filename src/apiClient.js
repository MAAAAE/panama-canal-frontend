import axios from 'axios'
import keycloak from "@/keycloak";

const apiClient = axios.create({
    baseURL: 'http://localhost:5173', // API의 기본 URL을 설정합니다.
    timeout: 10000, // 요청 타임아웃을 설정합니다.
})

// 요청 인터셉터를 추가하여 Authorization 헤더를 설정합니다.
apiClient.interceptors.request.use(
    config => {
        // 로컬 스토리지 또는 다른 저장소에서 토큰을 가져옵니다.
        const token = keycloak.token
        if (token) {
            // Authorization 헤더에 토큰을 추가합니다.
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        // 요청 오류가 발생하면 이를 처리합니다.
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // 응답 오류가 발생하면 이를 처리합니다.
        return Promise.reject(error)
    }
)

export default apiClient
