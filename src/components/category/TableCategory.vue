<script setup>
import {computed, ref} from 'vue'
import {mdiHead, mdiKey, mdiMail, mdiPencil, mdiTag, mdiTrashCan} from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import CardBox from "@/components/CardBox.vue";
import {
  categoryStore,
  deleteCategory,
  deleteItem,
  updateCategory,
  update, create
} from "@/service/CategoryService"
import PillTag from "@/components/PillTag.vue";

defineProps({
  checkable: Boolean
})

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

const viewDetail = (form) => {
  isModalActive.value = true;
  updateCategory.value = form
}


</script>

<template>
  <CardBoxModal v-model="isModalActive" title="update" has-cancel @confirm="() => {update()}"
                button-label="update">
    <CardBox form @submit.prevent="update">
      <FormField label="category name & domain">
        <FormControl v-model="updateCategory.name" type="text" placeholder="ex. OPEN-API" :icon="mdiTag"/>
        <FormControl v-model="updateCategory.domain" type="email" :icon="mdiMail" placeholder="ex. openapi.com"/>
      </FormField>
      <FormField label="secret Key & Value">
        <FormControl v-model="updateCategory.secretKey" type="text" placeholder="ex. Authorization" :icon="mdiHead"/>
        <FormControl v-model="updateCategory.secretValue" type="text" :icon="mdiKey" placeholder="<key value>"/>
      </FormField>
      <FormField label="secret Type & desc">
        <FormControl v-model="updateCategory.secretType" type="select" :icon="mdiMail" placeholder="type"/>
        <FormControl v-model="updateCategory.description" type="text" :icon="mdiMail" placeholder="desc"/>
      </FormField>
    </CardBox>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Warning" button="danger" has-cancel @confirm="() => { deleteItem() }">
    <p>Do you really want to <b>delete this?</b></p>
  </CardBoxModal>

  <table>
    <thead>
    <tr>
      <th v-if="checkable" />
      <th>Name</th>
      <th>Domain</th>
      <th>SecretKey</th>
      <th>SecretValue</th>
      <th>Desc</th>
      <th />
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
      <td data-label="Name">
        {{ client.name }}
      </td>
      <td data-label="Domain">
        {{ client.domain }}
      </td>
      <td data-label="secretKey">
        <PillTag :color="'success'" :label="client.secretType" small/>
        {{ client.secretKey }}
      </td>
      <td data-label="secretValue">
        {{ client.secretValue }}
      </td>
      <td data-label="desc">
        {{ client.description }}
      </td>
      <td class="before:hidden lg:w-1 whitespace-nowrap">
        <BaseButtons type="justify-start lg:justify-end" no-wrap>
          <BaseButton color="info" :icon="mdiPencil" small @click="() => {viewDetail({ ...client }) }"/>
          <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="() => {isModalDangerActive = true; deleteCategory = client}"
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
