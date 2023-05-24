<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { menuStoreType, useMenuStore } from 'src/store';
import { Close } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const currentRightClickIndex = ref<number>(0);

const menuStore = useMenuStore();

const router = useRouter();

const contextmenuConfig = reactive({
  visible: false,
  x: 0,
  y: 0,
});

function handleCurrentClose(index: number) {
  const path = menuStore.removeSelected(index, 'current');
  router.push(path);
}

function contextmenuClick(closeMode: menuStoreType.RemoveMode) {
  const path = menuStore.removeSelected(
    currentRightClickIndex.value,
    closeMode,
  );
  router.push(path);
  contextmenuConfig.visible = false;
}

function tabItemClick(tab: menuStoreType.SystemMenuTab) {
  router.push(tab.path);
}

function showContextmenu(e: MouseEvent, index: number) {
  currentRightClickIndex.value = index;
  contextmenuConfig.x = e.clientX;
  contextmenuConfig.y = e.clientY;
  contextmenuConfig.visible = true;
}

onMounted(() => {
  document.addEventListener('click', () => {
    contextmenuConfig.visible = false;
  });
});
</script>

<template>
  <div class="t-nav-tab">
    <template v-for="(tab, index) in menuStore.selectedMenu">
      <div
        :class="['t-tab-item', tab.activated && 't-tab-item_activated']"
        @click="tabItemClick(tab)"
        @contextmenu.prevent="tab.closeable && showContextmenu($event, index)"
      >
        {{ tab.name }}
        <div
          v-show="tab.closeable"
          class="close"
          @click.stop="handleCurrentClose(index)"
        >
          <el-icon :size="12">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
  </div>

  <div
    v-show="contextmenuConfig.visible"
    :style="{
      top: contextmenuConfig.y + 'px',
      left: contextmenuConfig.x + 'px',
    }"
    class="t-contextmenu"
    @click.stop=""
  >
    <div class="triangle" />
    <div class="option" @click="contextmenuClick('current')">关闭当前标签</div>
    <div class="option" @click="contextmenuClick('left')">关闭左侧标签</div>
    <div class="option" @click="contextmenuClick('right')">关闭右侧标签</div>
    <div class="option" @click="contextmenuClick('all')">关闭全部标签</div>
  </div>
</template>

<style lang="less" scoped>
.t-nav-tab {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 5px;
  line-height: 41px;

  .t-tab-item {
    &_activated {
      background-color: #fff;
    }

    white-space: nowrap;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    padding: 0 20px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    align-items: center;

    &:hover {
      background-color: #fff;
    }

    .close {
      margin-left: 12px;

      :hover {
        background-color: #d9d9d9;
        border-radius: 50%;
      }
    }

    &:not(:first-of-type) {
      margin-left: 8px;
    }
  }

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.t-contextmenu {
  z-index: 999;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -3px 6px -4px;
  position: fixed;
  font-size: 12px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);

  .triangle {
    position: absolute;
    top: -10px;
    left: 10%;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }

  .option {
    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary-light-3);
    }

    padding: 10px 20px;
  }
}
</style>
