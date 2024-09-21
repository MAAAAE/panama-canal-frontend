import {useCategoryStore} from "@/stores/category/useCategoryStore";
import {reactive, ref} from "vue";
import apiClient from "@/apiClient";
import {toast} from "vue3-toastify";
import {useMenuStore} from "@/stores/common/useMenuStore";

const categoryStore = useCategoryStore()
const menuStore = useMenuStore();
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

const create = async () => {
    apiClient.post('/api/category', createCategory)
        .then(async () => {
            toast('creating category completed!')
            await categoryStore.fetchCategories();
            await menuStore.fetchMenus();
            resetCreateCategory()
        })
};

const deleteCategory = ref({})

const deleteItem = () => {
    apiClient.delete(`/api/category/${deleteCategory.value.id}`)
        .then(async () => {
            toast(`${deleteCategory?.value.name} is deleted.`)
            await categoryStore.fetchCategories()
        })
}

const updateCategory = ref({})

const update = () => {
    apiClient.put(`/api/category/${updateCategory.value.id}`, updateCategory.value)
        .then(async () => {
            toast(`${updateCategory?.value.name} is updated.`)
            await categoryStore.fetchCategories()
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
