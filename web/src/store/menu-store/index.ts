import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RemoveMode, SystemMenu, SystemMenuTab } from './type';
import { indexRoute } from 'src/router/staticRouter';
import { findChildAndParents } from 'src/store/menu-store/util';

/**
 * 首页
 */
const { path, meta } = indexRoute;

/**
 * 菜单以及路由的存储器
 */
export const useMenuStore = defineStore('useMenuStore', () => {
  /**
   * 是否已刷新路由，这里不用{@see allMenu}等于空判断，因为可能会有用户一个动态路由都没有的情况
   */
  const refreshed = ref(false);

  /**
   * 默认有一个首页，并且不能关闭
   */
  const selectedMenu = ref<SystemMenuTab[]>([
    {
      path: path,
      name: meta?.title as string,
      closeable: false,
      activated: true,
    },
  ]);

  /**
   * 所有动态菜单
   */
  const allMenu = ref<SystemMenu[]>([]);

  /**
   * 当前选中的菜单，以及父菜单ids
   */
  const activated = ref();

  /**
   * 每次路由跳转后修改当前选中（切换{@see SystemMenuTab}选中、通过输入地址跳转、点击菜单时）
   */
  function changeActivated(path: string) {
    const fullItem = findChildAndParents(path, allMenu.value);
    const lastItem = fullItem[fullItem.length - 1];
    lastItem && addSelected(lastItem);
    const full = fullItem.map((it) => String(it.id));
    activated.value = { full, last: full[full.length - 1] };
  }

  /**
   * 关闭menuTab
   * @param index 当前执行操作的{@see SystemMenuTab}索引
   * @param removeMode 关闭方式
   */
  function removeSelected(index: number, removeMode: RemoveMode): string {
    let currentActivated: SystemMenuTab = selectedMenu.value[index];
    let deleteOption: { start: number; deleteCount?: number };
    switch (removeMode) {
      case 'current':
        const activatedIndex =
          index === selectedMenu.value.length - 1 ? index - 1 : index + 1;
        currentActivated = selectedMenu.value[activatedIndex];
        deleteOption = { start: index, deleteCount: 1 };
        break;
      case 'left':
        if (index === selectedMenu.value.length - 1) {
          currentActivated = selectedMenu.value[0];
        }
        const start = 1;
        deleteOption = { start, deleteCount: index == start ? 0 : index };
        break;
      case 'right':
        deleteOption = {
          start: index + 1,
          deleteCount: selectedMenu.value.length,
        };
        break;
      case 'all':
        currentActivated = selectedMenu.value[0];
        deleteOption = { start: 1, deleteCount: selectedMenu.value.length };
    }
    currentActivated.activated = true;
    const { start, deleteCount } = deleteOption;
    selectedMenu.value.splice(start, deleteCount);
    return currentActivated.path;
  }

  /**
   * 点击菜单，或者直接输入地址跳转
   * @param path 路径
   * @param name 菜单名字
   */
  function addSelected({ path, name }: SystemMenu) {
    let existed;
    selectedMenu.value.forEach((it) => {
      if (it.path !== path) {
        it.activated = false;
      } else {
        existed = true;
        it.activated = true;
      }
    });
    if (!existed) {
      selectedMenu.value.push({ path, name, activated: true, closeable: true });
    }
  }

  return {
    activated,
    selectedMenu,
    allMenu,
    refreshed,
    removeSelected,
    changeActivated,
  };
});
