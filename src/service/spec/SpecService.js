import { reactive } from "vue";
import apiClient from "@/apiClient";
import {useSpecStore} from "@/stores/spec/userSpecStore";
import {toast} from "vue3-toastify";

const specStore = useSpecStore();

const createAPISpec = reactive({
    title: '',
    method: 'GET',
    uri: '',
    customRoute: '',
    request: '',
    response: '',
    category: 0,
});

const createSpec = () => {
    apiClient.post('/api/specs', createAPISpec)
        .then(() => {
            toast('API Spec Created!');
            resetCreateApiSpec();

        })
}

const resetCreateApiSpec = () => {
    createAPISpec.uri = '';
    createAPISpec.title = '';
    createAPISpec.method = 'GET';
    createAPISpec.customRoute = '';
    createAPISpec.request = '';
    createAPISpec.response = '';
}

export {
    createSpec,
    specStore,
    createAPISpec
}