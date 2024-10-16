import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/apiClient';

export const useMenuStore = defineStore('menu', () => {
  const menus = ref([]);

  const fetchMenus = async () => {
    const result = await apiClient.get(`/api/menu`);
    menus.value = result?.data?.map((menuItem) => {
      return { ...menuItem, to: '/spec' };
    });
  };

  return {
    menus,
    fetchMenus,
  };
});
