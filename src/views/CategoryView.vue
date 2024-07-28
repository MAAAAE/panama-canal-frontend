<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTag" title="Category" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>API 들의 카테고리를 관리하는 메뉴입니다.</b>
      </NotificationBar>


      <base-divider></base-divider>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="tables">
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableCategory checkable/>
      </CardBox>


      <base-divider></base-divider>
      <SectionTitleLineWithButton :icon="mdiChartPie" title="create">
      </SectionTitleLineWithButton>

      <CardBox form @submit.prevent="submit">
        <FormField label="카테고리 추가" help="특수문자는 입력할 수 없습니다.">
          <FormControl v-model="form.name" type="text" placeholder="ex. OPEN-API"/>
        </FormField>
        <FormField label="domain" help="특수문자는 입력할 수 없습니다.">
          <FormControl v-model="form.domain" type="text" placeholder="domain.com"/>
        </FormField>
        <template #footer>
          <BaseButton label="Create" type="submit" color="info" @click="submit"/>
        </template>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>


<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiTag,
  mdiAccount,
  mdiMail,
  mdiChartPie, mdiReload
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
import {onMounted, reactive} from "vue";
import TableCategory from "@/components/category/TableCategory.vue";
import apiClient from "@/apiClient";
import {useCategoryStore} from "@/stores/useCategoryStore";

const submit = () => {
  console.log('submitted')
  apiClient.post('/api/category', form)
      .then(() => {
        categoryStore.fetchCategories()
      })
}
const form = reactive({
  name: 'John Doe',
  domain: '',
  secret: '',
  description: ''
})

 const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.fetchCategories()
})

</script>
