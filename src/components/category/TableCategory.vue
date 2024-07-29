<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import {useCategoryStore} from "@/stores/useCategoryStore";
import apiClient from "@/apiClient";
import {toast} from "vue3-toastify";

defineProps({
  checkable: Boolean
})

const categoryStore = useCategoryStore()

const items = computed(() => categoryStore.categories)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
    items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}

const deleteClient = ref({})
const selectedDescription = ref('')
const deleteItem = () => {
  apiClient.delete(`/api/category/${deleteClient.value.id}`)
      .then(res => {
        toast(`${deleteClient?.value.name} is deleted.`)
        categoryStore.fetchCategories()
      }).catch(err => {
        toast(err.message)
  })
}


</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>{{ selectedDescription.value }}</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Warning" button="danger" has-cancel @confirm="() => { deleteItem() }">
    <p>Do you really want to <b>delete this?</b></p>
  </CardBoxModal>

  <table>
    <thead>
    <tr>
      <th v-if="checkable" />
      <th />
      <th>Name</th>
      <th>Domain</th>
      <th>Desc</th>
      <th />
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
      <td class="border-b-0 lg:w-6 before:hidden">
        <UserAvatar :username="client.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
      </td>
      <td data-label="Name">
        {{ client.name }}
      </td>
      <td data-label="Domain">
        {{ client.domain }}
      </td>
      <td data-label="desc">
        {{ client.description }}
      </td>
      <td class="before:hidden lg:w-1 whitespace-nowrap">
        <BaseButtons type="justify-start lg:justify-end" no-wrap>
          <BaseButton color="info" :icon="mdiEye" small @click="() => {isModalActive = true; selectedDescription = client.description}"/>
          <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="() => {isModalDangerActive = true; deleteClient = client}"
          />
        </BaseButtons>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
