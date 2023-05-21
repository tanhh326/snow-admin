<script lang="tsx" setup>
import {
  ArrowLeftBold,
  ArrowRightBold,
  HomeFilled,
  Location,
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useMenuStore } from 'src/store';
import { storeToRefs } from 'pinia';

const isCollapse = ref(false);

function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}

const { activated, allMenu } = storeToRefs(useMenuStore());
</script>

<template>
  <div class="t-aside-top">
    <h3 v-if="!isCollapse">Admin</h3>
    <h3 v-else>@</h3>
  </div>
  <el-menu
    :collapse="isCollapse"
    :default-active="activated.last"
    :default-openeds="activated.full"
    class="t-aside-middle"
    router
    unique-opened
  >
    <template v-for="menu of allMenu">
      <el-sub-menu
        v-if="menu.children && menu.children.length"
        :index="String(menu.id)"
      >
        <template #title>
          <el-icon>
            <Location />
          </el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="item of menu.children"
          :index="String(item.id)"
          :route="item.path"
        >
          {{ item.name }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="String(menu.id)" :route="menu.path">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
  <div class="t-aside-bottom" @click="toggleCollapse">
    <el-icon>
      <ArrowRightBold v-if="isCollapse" />
      <ArrowLeftBold v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.el-menu {
  border: 0;
}

.t-aside-top {
}

.t-aside-bottom {
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
