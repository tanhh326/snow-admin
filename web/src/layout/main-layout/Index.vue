<script lang='ts' setup>
import MenuTab from './components/menu-tab/Index.vue';
import SettingConsole from './components/setting/Index.vue';
import Menu from './components/menu/Index.vue';
import { onBeforeMount, ref } from 'vue';
import { useMenuStore } from 'src/store';
import { ElLoading } from 'element-plus';
import { addRoute, collectLastLevelNodes } from 'src/router/dynamic-router';

const mockMenu = [
  {
    id: 1,
    name: '驾驶舱',
    icon: 'dashboard',
    show: true,
    path: '/index',
    component: 'src/pages/dashboard/Index.vue'
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
        children: []
      },
      {
        id: 22,
        name: '部门管理',
        icon: 'plus',
        show: true,
        path: '/user',
        component: 'src/pages/system/menu/Index.vue',
        children: []
      }
    ]
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
        children: []
      },
      {
        id: 32,
        name: '日志管理',
        icon: 'list',
        show: true,
        path: '/system-log',
        component: 'src/pages/system/menu/Index.vue',
        children: []
      }
    ]
  }
];
const fullScreenLoading = ref();

onBeforeMount(() => {
  fullScreenLoading.value = ElLoading.service({
    lock: true,
    text: '加载中...'
  });
  useMenuStore().allMenu = mockMenu;
  const routes = collectLastLevelNodes(mockMenu);
  addRoute(routes);
  setTimeout(() => {
    fullScreenLoading.value.close();
    fullScreenLoading.value = null;
  }, 1500);
});
</script>

<template>
  <el-container v-show='!fullScreenLoading'>
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header class='t-header'>
        <MenuTab />
        <div class='t-space'></div>
        <SettingConsole />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer> @copyright</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.t-header {
    max-height: 45px;
    display: flex;
    justify-content: space-between;

    .t-space {
        margin-left: 32px;
    }
}

.el-aside {
    width: auto;
    height: calc(100vh - 2rem);
    background-color: #fff;
    position: relative;
}
</style>
