import {useCategoryStore} from "@/stores/category/useCategoryStore";
import {reactive, ref} from "vue";
import apiClient from "@/apiClient";
import {toast} from "vue3-toastify";

const categoryStore = useCategoryStore()
const createCategory = reactive({
    name: '',
    domain: '',
    secret: '',
    description: ''
})

const create = () => {
    apiClient.post('/api/category', createCategory)
        .then(() => {
            toast('creating category completed!')
            categoryStore.fetchCategories()
        })
}

const deleteCategory = ref({})

const deleteItem = () => {
    apiClient.delete(`/api/category/${deleteCategory.value.id}`)
        .then(res => {
            toast(`${deleteCategory?.value.name} is deleted.`)
            categoryStore.fetchCategories()
        }).catch(err => {
        toast(err.message)
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
