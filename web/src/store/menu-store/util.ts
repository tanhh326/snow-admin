import { SystemMenu } from 'src/store/menu-store/type';

/**
 * 通过跳转路径查询当前菜单以及所有父菜单
 * @param path
 * @param menus
 * @param result
 */
export function findChildAndParents(
  path: string,
  menus: SystemMenu[],
  result: SystemMenu[] = [],
): SystemMenu[] {
  for (const item of menus) {
    if (item.path === path) {
      return [item, ...result];
    }

    if (item.children && item.children.length) {
      const childResult = findChildAndParents(path, item.children);
      if (childResult.length) {
        return [item, ...childResult];
      }
    }
  }
  return result;
}

/**
 * 通过名称模糊匹配最后一级菜单及父菜单
 * @param menus 所有菜单
 * @param name 名字
 * @param parent 递归的父节点
 * @param result 二维数组
 */
export function findMenuByName(
  menus: SystemMenu[],
  name: string,
  parent: SystemMenu[] = [],
  result: SystemMenu[][] = [],
) {
  for (const menu of menus) {
    const currentPath = [...parent, menu];
    if (menu.children && menu.children.length) {
      findMenuByName(menu.children, name, currentPath, result);
    } else if (menu.name.includes(name)) {
      result.push(currentPath);
    }
  }
  return result;
}
