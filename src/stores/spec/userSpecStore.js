import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import {toast} from "vue3-toastify";
import {parsePanamaErrorMessage} from "@/utils/error-utils";

export const useSpecStore = defineStore('specs', () => {
    const specs = ref([]);

    const fetchApiSpecs = (categoryId) => {
        axios.get(`/api/specs/category/${categoryId}`)
            .then(result => {
                specs.value = result?.data;
            })
            .catch(error => {
                toast.error(`Get Specs Failed: ${parsePanamaErrorMessage(error)}`);
            })
    }

    return {
        specs,
        fetchApiSpecs,
    };
})