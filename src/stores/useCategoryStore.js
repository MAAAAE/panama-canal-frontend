import {defineStore} from "pinia";
import {ref} from "vue";
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
