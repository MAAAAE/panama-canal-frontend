import {defineStore} from "pinia";
import {ref} from "vue";
import apiClient from "@/apiClient";

export const useMenuStore = defineStore('menu', () => {
    const menus = ref([]);

    const fetchMenus = () => {
        apiClient.get(`/api/menu`)
            .then(result => {
                console.log("FETCH");
                menus.value = result?.data?.map(menuItem => {
                    return {...menuItem, to: '/spec'};
                })
            });
    };

    return {
        menus,
        fetchMenus,
    }
});