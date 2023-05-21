import { menuStoreType, useMenuStore } from 'src/store';
import { RouteRecordRaw } from 'vue-router';
import router from 'src/router/index';
import { indexRoute } from 'src/router/static-router';
import { ElLoading } from 'element-plus';

const allPages = import.meta.glob('src/pages/**/Index.vue');

const mockMenu = [
  {
    id: 1,
    name: '驾驶舱',
    icon: 'dashboard',
    show: true,
    path: '/index',
    component: 'src/pages/dashboard/Index.vue',
  },
  {
    id: 2,
    name: '用户管理',
    icon: 'users',
    show: true,
    path: '/users',
    children: [
      {
        id: 21,
        name: '用户列表',
        icon: 'list',
        show: true,
        path: '/admin',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
      {
        id: 22,
        name: '部门管理',
        icon: 'plus',
        show: true,
        path: '/user',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: '设置',
    icon: 'settings',
    show: true,
    path: '/settings',
    children: [
      {
        id: 31,
        name: '系统设置',
        icon: 'list',
        show: true,
        path: '/system-set',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
      {
        id: 32,
        name: '日志管理',
        icon: 'list',
        show: true,
        path: '/system-log',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
    ],
  },
];

export const dynamicRouteParentName = 'DynamicRouter';

export function createRouterRaw({
  path,
  name,
  component,
}: menuStoreType.SystemMenu): RouteRecordRaw {
  if (!component) {
    throw new Error('创建路由必须指定组件');
  }
  return {
    path,
    meta: {
      title: name,
    },
    component: allPages['/' + component],
  };
}

export function collectLastLevelNodes(allMenuTree: menuStoreType.SystemMenu[]) {
  const result: RouteRecordRaw[] = [];

  function traverse(menuTree: menuStoreType.SystemMenu[]) {
    for (const menu of menuTree) {
      if (!menu.children || menu.children.length === 0) {
        result.push(createRouterRaw(menu));
      } else {
        traverse(menu.children);
      }
    }
  }

  traverse(allMenuTree);
  return result;
}

/**
 * 获取动态路由
 */
export function fetchDynamicRouter(): Promise<void> {
  if (!indexRoute.name) {
    throw new Error('首页路由必须指定名称');
  }

  const fullScreenLoading = ElLoading.service({
    lock: true,
    text: '加载中...',
  });
  useMenuStore().allMenu = mockMenu;
  const routes = collectLastLevelNodes(mockMenu);

  for (let route of routes) {
    router.addRoute(dynamicRouteParentName, route);
  }
  document.title = '加载中...';
  return new Promise((resolve) => {
    setTimeout(() => {
      fullScreenLoading.close();
      resolve();
    }, 1500);
  });
}
