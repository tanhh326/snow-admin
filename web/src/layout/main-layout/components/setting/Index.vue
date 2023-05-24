<script lang="ts" setup>
import { FullScreen, Search } from '@element-plus/icons-vue';
import { usePermissionsStore } from 'src/store/permissions-store';
import { jumpToLogin } from 'src/router/support';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { debounce } from 'src/util';
import { useMenuStore } from 'src/store';
import { findMenuByName } from 'src/store/menu-store/util';
import { SystemMenu } from 'src/store/menu-store/type';
import SearchDialog from 'src/layout/main-layout/components/search-dialog/Index.vue';

const permissionsStore = usePermissionsStore();

const menuStore = useMenuStore();

const userinfoDialogVisible = ref(false);

const searchResult = ref<SystemMenu[][]>([]);

// TODO
const searchOption = reactive({
  visible: false,
  onInput: debounce(({ target }: InputEvent & { target: HTMLInputElement }) => {
    console.log(target.value);
    findMenuByName(menuStore.allMenu, '管理');
  }, 1000),
});

function handleFullScreen() {
  const doc = document.documentElement;
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  }
}

function handleUserInfo() {
  userinfoDialogVisible.value = true;
}

function handleLogout() {
  permissionsStore.reset();
  jumpToLogin(() => {
    ElMessage.info({
      message: '已退出',
      duration: 1500,
      showClose: true,
      center: true,
    });
  });
}
</script>

<template>
  <div class="t-console">
    <div class="t-item search">
      <el-icon :size="24" @click="searchOption.visible = !searchOption.visible">
        <search />
      </el-icon>
      <!--      <input v-if='searchOption.visible' class='t-search-input' placeholder='搜索菜单'-->
      <!--             @input='searchOption.onInput' />-->
    </div>
    <div class="t-item">i18n</div>
    <div class="t-item">
      <el-icon :size="24" @click="handleFullScreen">
        <FullScreen />
      </el-icon>
    </div>
    <div class="t-item">
      <el-dropdown trigger="click">
        <el-avatar :size="32">盖伦</el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleUserInfo"
              >个人资料</el-dropdown-item
            >
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <SearchDialog v-model:visible="searchOption.visible" />
  <el-dialog v-model="userinfoDialogVisible" title="个人资料" width="50%">
    <div>我</div>
  </el-dialog>
</template>

<style lang="less" scoped>
.t-console {
  background-color: #fff;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0 10px;
  align-items: center;

  .t-item {
    &.search {
      display: flex;

      .t-search-input {
        border: 0;
        border-bottom: 1px solid #ccc;
        outline: none;
        margin-left: 8px;
      }
    }

    margin: 0 10px;
    cursor: pointer;
  }
}

.el-icon {
  display: flex;
}

.el-avatar {
  cursor: pointer;
  font-size: 12px;
  background-color: var(--el-color-primary);
}
</style>
