import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "@/apiClient";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);
    const categoryOptions = ref([]);
    const category = ref({});

    const fetchCategories = () => {
        apiClient
            .get(`/api/category/all`)
            .then((result) => {
                categories.value = result?.data;
            });

    };

    const fetchCategoryById = (id) => {
        apiClient
            .get(`/api/category/${id}`)
            .then(result => {
                category.value = result?.data;
            });
    }

    const fetchCategoryOptions = () => {
        apiClient
            .get(`/api/category/options`)
            .then(result => {
                categoryOptions.value = result?.data;
            });
    };

    return {
        categories,
        category,
        categoryOptions,
        fetchCategories,
        fetchCategoryOptions,
        fetchCategoryById,
    }
})
