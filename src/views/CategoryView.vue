<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTag" title="Category" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>API 들의 카테고리를 관리하는 메뉴입니다.</b>
      </NotificationBar>


      <base-divider></base-divider>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="categories">
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableCategory checkable/>
      </CardBox>


      <base-divider></base-divider>
      <SectionTitleLineWithButton :icon="mdiChartPie" title="create">
      </SectionTitleLineWithButton>

      <CardBox form @submit.prevent="create">
        <FormField label="category name & domain">
          <FormControl v-model="createCategory.name" type="text" placeholder="ex. OPEN-API" :icon="mdiTag"/>
          <FormControl v-model="createCategory.domain" type="email" :icon="mdiMail" placeholder="ex. openapi.com"/>
        </FormField>
        <FormField label="secret" help="api secret key">
          <FormControl v-model="createCategory.secretKey" type="text" placeholder="secret key.. ex) Authorization" :icon="mdiAccountKey"/>
          <FormControl v-model="createCategory.secretValue" type="text" placeholder="secret value.. ex)ehJz..." :icon="mdiAccountKey"/>
          <FormControl v-model="createCategory.secretType" type="select" :icon="mdiMail" :options="['NONE','PARAMETER', 'HEADER']"/>
        </FormField>
        <FormField label="description">
          <FormControl v-model="createCategory.description" type="text" placeholder="description.." :icon="mdiNote"/>
        </FormField>
        <template #footer>
          <BaseButton label="Create" type="submit" color="info" @click="create"/>
        </template>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>


<script setup>
import {
  mdiMonitorCellphone,
  mdiTag,
  mdiChartPie, mdiMail, mdiNote, mdiAccountKey
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import {onMounted} from "vue";
import TableCategory from "@/components/category/TableCategory.vue";
import {useCategoryStore} from "@/stores/useCategoryStore";
import {create, createCategory} from "@/service/CategoryService"

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.fetchCategories()
})

</script>
