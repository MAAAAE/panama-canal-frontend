<template>
  <div>
    <h1>Filter Config</h1>
    <div v-for="(filter, index) in filters" :key="index" class="filter-form">
      <select v-model="filter.filterName">
        <option value="AddRequestParam">parameter</option>
        <option value="AddRequestHeader">header</option>
      </select>
      <input v-model="filter.param" placeholder="Param" />
      <input v-model="filter.value" placeholder="Value" />
      <BaseButton label="-" color="danger" @click="removeFilter(index)">-</BaseButton>
    </div>
    <BaseButton label="+" type="submit" color="info" @click="addFilter"/>
    <BaseButton label="등록" type="submit" color="warning" @click="submitFilters"/>

  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import {create} from "@/service/category/CategoryService";

export default {
  components: {BaseButton},
  data() {
    return {
      filters: [
        { filterName: 'AddRequestParam', param: '', value: '' }
      ]
    };
  },
  methods: {
    create,
    addFilter() {
      this.filters.push({ filterName: 'AddRequestParam', param: '', value: '' });
    },
    removeFilter(index) {
      this.filters.splice(index, 1);
    },
    submitFilters() {
      // 이 부분에서 filters 배열을 서버로 전송하는 로직을 추가하세요.
      console.log(this.filters);
    }
  }
};
</script>

<style>
.filter-form {
  margin-bottom: 10px;
}

input {
  margin-right: 10px;
}
</style>
