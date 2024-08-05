import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {toast} from "vue3-toastify";
import apiClient from "@/apiClient";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])

    function fetchCategories() {
        apiClient
            .get(`/api/category/all`)
            .then((result) => {
                categories.value = result?.data
            })

    }

    return {
        categories,
        fetchCategories
    }
})
