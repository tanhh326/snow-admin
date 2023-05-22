import { defineStore } from 'pinia';
import { ref } from 'vue';

const persistKey = 'user-info';

export const usePermissionsStore = defineStore('usePermissionsStore', () => {
    const token = ref<String>('');

    function reset() {
      token.value = '';
      localStorage.removeItem(persistKey);
    }

    return {
      token,
      reset
    };
  },
  {
    persist: {
      key: persistKey
    }
  }
);
