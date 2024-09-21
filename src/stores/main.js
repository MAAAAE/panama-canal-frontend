import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useMainStore = defineStore('main', () => {
  const userName = ref('John Doe');
  const userEmail = ref('doe.doe.doe@example.com');
  const loginTime = ref(new Date().toISOString());

  const userAvatar = computed(
    () =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
        /[^a-z0-9]+/gi,
        '-'
      )}`
  );

  const isFieldFocusRegistered = ref(false);

  const clients = ref([]);
  const history = ref([]);

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name;
    }
    if (payload.email) {
      userEmail.value = payload.email;
    }
    if (payload.loginTime) {
      loginTime.value = payload.loginTime;
    }
  }

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return {
    userName,
    userEmail,
    loginTime,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser,
    fetchSampleClients,
    fetchSampleHistory,
  };
});
