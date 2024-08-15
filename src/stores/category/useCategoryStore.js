import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {toast} from "vue3-toastify";
import {parsePanamaErrorMessage} from "@/utils/error-utils";

export const useCategoryStore = defineStore('category' , () => {
    const categories = ref([]);
    const categoryOptions = ref([]);

    function fetchCategories() {
        axios
            .get(`/api/category/all`)
            .then((result) => {
                categories.value = result?.data
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const fetchCategoryOptions = () => {
        axios
            .get(`/api/category/options`)
            .then(result => {
                categoryOptions.value = result?.data;
            }).catch(error => toast.error(`Get Category Options Failed ${parsePanamaErrorMessage(error)}`));
    }

    return {
        categories,
        categoryOptions,
        fetchCategories,
        fetchCategoryOptions,
    }
})
