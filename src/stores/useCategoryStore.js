import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";

export const useCategoryStore = defineStore('category' , () => {
    const categories = ref([])

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

    return {
        categories,
        fetchCategories
    }
})
