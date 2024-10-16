import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/apiClient';

export const useSpecStore = defineStore('specs', () => {
  const specs = ref([]);

  const fetchApiSpecs = (categoryId) => {
    apiClient.get(`/api/specs/category/${categoryId}`).then((result) => {
      specs.value = result?.data;
    });
  };

  // specs 배열의 특정 인덱스를 업데이트하는 함수
  const updateSpecByIndex = (index, updatedSpec) => {
    // 인덱스 범위를 확인하여 존재하는 경우에만 업데이트
    if (index >= 0 && index < specs.value.length) {
      specs.value[index] = updatedSpec;
    } else {
      console.error(`Index ${index} is out of bounds`);
    }
  };

  return {
    specs,
    fetchApiSpecs,
    updateSpecByIndex,
  };
});
