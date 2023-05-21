/**
 * 路由选项卡
 */
export interface SystemMenuTab {
  /**
   * 跳转路径
   */
  path: string;
  /**
   * 显示的名字
   */
  name: string;
  /**
   * 能关闭的
   */
  closeable: boolean;
  /**
   * 当前选中的
   */
  activated: boolean;
}

/**
 * 系统菜单
 */
export interface SystemMenu {
  /**
   * 唯一id
   */
  id: number | string;
  /**
   * 图表
   */
  icon: string;
  /**
   * 路由跳转路径，全局唯一
   */
  path: string;
  /**
   * 菜单名
   */
  name: string;
  /**
   * 是否显示
   */
  show: boolean;
  /**
   * 组件
   */
  component?: string;
  /**
   * 子菜单
   */
  children?: SystemMenu[];
}

/**
 * 当前选中菜单
 */
export interface Activated {
  /**
   * 最后一个路径
   * /setting
   */
  last: string;
  /**
   * 全路径
   * /system/setting
   */
  full: string[];
}

/**
 * {@see SystemMenuTab}移除方式
 */
export type RemoveMode = 'left' | 'right' | 'current' | 'all';
