import { menuStoreType, useMenuStore } from 'src/store';
import { RouteRecordRaw } from 'vue-router';
import router from 'src/router/index';
import { indexRoute } from 'src/router/staticRouter';
import { ElLoading } from 'element-plus';
import { SystemMenu } from 'src/store/menu-store/type';

// 获取所有路由页面组件
const allPages = import.meta.glob('src/pages/**/Index.vue');

const mockMenu: SystemMenu[] = [
  {
    id: 1,
    name: '驾驶舱',
    icon: 'dashboard',
    show: true,
    path: '/index',
    menuType: 'menu',
    component: 'src/pages/dashboard/Index.vue',
  },
  {
    id: 2,
    name: '用户管理',
    icon: 'users',
    show: true,
    menuType: 'directory',
    path: '/users',
    children: [
      {
        id: 21,
        name: '用户类别',
        icon: 'list',
        parentId: 2,
        show: true,
        path: '/admin',
        menuType: 'directory',
        component: 'src/pages/system/menu/Index.vue',
        children: [
          {
            id: 211,
            name: '内部用户',
            icon: 'list',
            parentId: 2,
            show: true,
            path: '/admin/inner',
            menuType: 'menu',
            component: 'src/pages/system/menu/Index.vue',
            children: [],
          },
          {
            id: 212,
            name: '外部用户',
            icon: 'list',
            parentId: 2,
            show: true,
            path: '/admin/out',
            menuType: 'menu',
            component: 'src/pages/system/menu/Index.vue',
            children: [],
          },
        ],
      },
      {
        id: 22,
        name: '部门管理',
        icon: 'plus',
        parentId: 2,
        show: true,
        menuType: 'menu',
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
    menuType: 'directory',
    children: [
      {
        id: 31,
        name: '系统设置',
        icon: 'list',
        parentId: 3,
        show: true,
        menuType: 'menu',
        path: '/system-set',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
      {
        id: 32,
        name: '日志管理',
        icon: 'list',
        parentId: 3,
        show: true,
        menuType: 'menu',
        path: '/system-log',
        component: 'src/pages/system/menu/Index.vue',
        children: [],
      },
    ],
  },
];

export const dynamicRouteParentName = 'DynamicRouter';

function createRouterRaw({
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

function collectLastLevelNodes(allMenuTree: menuStoreType.SystemMenu[]) {
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
 * 获取动态路由(只解析最后一级菜单)
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
