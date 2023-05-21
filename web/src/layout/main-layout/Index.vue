<script lang="ts" setup>
import MenuTab from './components/menu-tab/Index.vue';
import SettingConsole from './components/setting/Index.vue';
import Menu from './components/menu/Index.vue';
</script>

<template>
  <el-container>
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="t-header">
        <MenuTab />
        <div class="t-space"></div>
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
