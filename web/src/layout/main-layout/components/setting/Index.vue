<script lang="ts" setup>
import { FullScreen, Search } from '@element-plus/icons-vue';

function handleFullScreen() {
  const doc = document.documentElement; // 您可以将要全屏的元素替换为实际需要全屏的元素
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  }
}
</script>

<template>
  <div class="t-console">
    <el-icon :size="24">
      <Search />
    </el-icon>
    <el-icon :size="24" @click="handleFullScreen">
      <FullScreen />
    </el-icon>
    <el-avatar :size="32">盖伦</el-avatar>
  </div>
</template>

<style lang="less" scoped>
.t-console {
  background-color: #fff;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0 10px;
  align-items: center;
}

.el-icon {
  cursor: pointer;
  padding: 0 10px;
}

.el-avatar {
  cursor: pointer;
  font-size: 12px;
  background-color: var(--el-color-primary);
}
</style>
