import { createRouter, createWebHashHistory } from 'vue-router';
import { getToken, jumpToLogin } from 'src/router/support';
import { indexRoute, loginRoute, notfoundRoute } from 'src/router/static-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/index',
      component: () => import('src/layout/main-layout/Index.vue'),
      children: [
        indexRoute
      ]
    },
    loginRoute,
    notfoundRoute
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
    return;
  }

  if (!getToken()) {
    jumpToLogin();
    return;
  }
  const { title } = to.meta;
  document.title = (title as string) || 'Admin';
  next();
});

router.afterEach(() => {
});

export default router;
