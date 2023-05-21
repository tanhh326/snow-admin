import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export const useRouteStore = defineStore('useRouteStore', () => {
  const routes = ref<RouteRecordRaw[]>([]);
});
