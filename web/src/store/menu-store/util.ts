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
  result: SystemMenu[] = []
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
