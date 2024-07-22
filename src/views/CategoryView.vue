<script setup>
import {mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub, mdiTag, mdiAccount, mdiMail} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import {reactive} from "vue";
import TableCategory from "@/components/category/TableCategory.vue";

const submit = () => {
  //
}
const form = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '',
  department: '',
  subject: '',
  question: ''
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTag" title="Category 관리" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>API 들의 카테고리를 관리하는 메뉴입니다.</b>
      </NotificationBar>

      <CardBox form @submit.prevent="submit">
        <FormField label="카테고리 추가" help="특수문자는 입력할 수 없습니다.">
          <FormControl v-model="form.phone" type="tel" placeholder="카테고리 명을 입력하고 엔터를 해주세요. ex. OPEN-API" />
        </FormField>
      </CardBox>

      <base-divider></base-divider>
      <CardBox class="mb-6" has-table>
        <TableCategory checkable />
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

      <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar>

    </SectionMain>
  </LayoutAuthenticated>
</template>
