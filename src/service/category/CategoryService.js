import {useCategoryStore} from "@/stores/category/useCategoryStore";
import {reactive, ref} from "vue";
import apiClient from "@/apiClient";
import {toast} from "vue3-toastify";

const categoryStore = useCategoryStore()
// 초기 상태를 저장
const initialCategoryState = {
    name: '',
    domain: '',
    secretKey: '',
    secretValue: '',
    secretType: 'NONE',
    description: ''
};

// reactive 객체 생성
const createCategory = reactive({ ...initialCategoryState });

function resetCreateCategory() {
    // 초기 상태를 복사하여 reactive 객체를 다시 설정
    Object.assign(createCategory, initialCategoryState);
}

const create = () => {
    apiClient.post('/api/category', createCategory)
        .then(() => {
            toast('creating category completed!')
            categoryStore.fetchCategories()
            resetCreateCategory()
        })
};

const deleteCategory = ref({})

const deleteItem = () => {
    apiClient.delete(`/api/category/${deleteCategory.value.id}`)
        .then(res => {
            toast(`${deleteCategory?.value.name} is deleted.`)
            categoryStore.fetchCategories()
        })
}

const updateCategory = ref({})

const update = () => {
    apiClient.put(`/api/category/${updateCategory.value.id}`, updateCategory.value)
        .then(res => {
            toast(`${updateCategory?.value.name} is updated.`)
            categoryStore.fetchCategories()
        })
}


export {
    categoryStore,
    createCategory,
    create,
    deleteCategory,
    deleteItem,
    updateCategory,
    update
}
