import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import apiClient from "@/apiClient";
import {toast} from "vue3-toastify";
import {parsePanamaErrorMessage} from "@/utils/error-utils";

export const useRouteStore = defineStore('route', () => {
   const routes = ref([]);
   const existRoutesOptions = ref([]);

   const fetchDynamicRoutes = () => {
       apiClient.get(`/api/dynamic-route/all`)
           .then((result) => {
               routes.value = result?.data;
           })
           .catch((error) => {
               toast.error(`Get Dynamic Route Failed: ${parsePanamaErrorMessage(error)}`);
           })
   };

   const fetchDynamicRouteOptions = () => {
       apiClient.get(`/api/dynamic-route/options`)
           .then(result => {
               existRoutesOptions.value = result?.data;
           })
           .catch(error => toast.error(`Get Dynamic Route Options Failed: ${parsePanamaErrorMessage(error)}`));
   }

   return {
       routes,
       existRoutesOptions,
       fetchDynamicRoutes,
       fetchDynamicRouteOptions,
   }
});