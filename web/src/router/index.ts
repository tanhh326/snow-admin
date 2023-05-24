import { createRouter, createWebHashHistory } from 'vue-router';
import { jumpToLogin } from 'src/router/support';
import { indexRoute, loginRoute, notfoundRoute } from 'src/router/static-router';
import { useMenuStore } from 'src/store';
import { dynamicRouteParentName, fetchDynamicRouter } from 'src/router/dynamic-router';
import { usePermissionsStore } from 'src/store/permissions-store';

// 这里第一个route全部要改成动态的
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: dynamicRouteParentName,
      redirect: '/index',
      component: () => import('src/layout/main-layout/Index.vue'),
      children: []
    },
    loginRoute,
    notfoundRoute
  ]
});

router.beforeEach((to, from, next) => {
  const token = usePermissionsStore().token;
  if (to.path === loginRoute.path) {
    // 必须通过退出登录回到登录页
    token ? next({ path: indexRoute.path }) : next();
  } else {
    if (!token) {
      jumpToLogin();
      return;
    }
    const menuStore = useMenuStore();
    // 如果是刷新或者从登录页跳转过来，并且还没刷新过，则加载动态路由
    // menuStore.refreshed: 刷新标志位，防止死循环
    if (['/', loginRoute.path].includes(from.path) && !menuStore.refreshed) {
      fetchDynamicRouter().then(() => {
        next({ path: to.path, replace: true });
        menuStore.refreshed = true;
      });
      return;
    }
    next();
    menuStore.changeActivated(to.path);
  }
});

router.afterEach((to) => {
  const { title } = to.meta;
  document.title = (title as string) || 'Admin';
});

export default router;
