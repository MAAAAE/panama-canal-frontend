import { reactive } from "vue";
import apiClient from "@/apiClient";

const createAPISpec = reactive({
    title: '',
    method: 'GET',
    uri: '',
    customRoute: '',
    headers: '',
});

const getApiSpec = (categoryId) => {
    return apiClient.get(`/api/specs/category/${categoryId}`)
        .then()
}

export {
    createAPISpec
}