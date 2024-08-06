import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpecStore = defineStore('specs', () => {
    const specs = ref([]);


    // TODO: API 연동
    // const fetchApiSpecs = (categoryId) => {
    //     axi
    // }
})