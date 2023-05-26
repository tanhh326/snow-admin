import { RouteRecordRaw } from 'vue-router';

export const indexRoute: RouteRecordRaw = {
  path: '/index',
  name: 'Index',
  meta: {
    title: '驾驶舱',
  },
  component: () => import('src/pages/dashboard/Index.vue'),
};

export const loginRoute: RouteRecordRaw = {
  path: '/login',
  meta: {
    title: '登录',
  },
  component: () => import('src/pages/unauth/login/Index.vue'),
};

export const notfoundRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  meta: {
    title: '页面未找到',
  },
  component: () => import('src/pages/unauth/404/Index.vue'),
};