import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import {toast} from "vue3-toastify";
import {parsePanamaErrorMessage} from "@/utils/error-utils";
import apiClient from "@/apiClient";

export const useSpecStore = defineStore('specs', () => {
    const specs = ref([]);

    const fetchApiSpecs = (categoryId) => {
        apiClient.get(`/api/specs/category/${categoryId}`)
            .then(result => {
                specs.value = result?.data;
            });
    }

    return {
        specs,
        fetchApiSpecs,
    };
})