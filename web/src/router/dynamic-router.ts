import { menuStoreType } from 'src/store';
import { RouteRecordRaw } from 'vue-router';
import router from 'src/router/index';
import { indexRoute } from 'src/router/static-router';

const allPages = import.meta.glob('src/pages/**/Index.vue');

export function createRouterRaw(
  { path, name, component }: menuStoreType.SystemMenu
): RouteRecordRaw {
  if (!component) {
    throw new Error('创建路由必须指定组件');
  }
  return {
    path,
    meta: {
      title: name
    },
    component: allPages['/' + component]
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

export function addRoute(routes: RouteRecordRaw[]) {
  const { name } = indexRoute;
  if (!name) {
    throw new Error('首页路由必须指定名称');
  }
  for (let route of routes) {
    router.addRoute(name, route);
  }
  console.log(router.getRoutes());
}
