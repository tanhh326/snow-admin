<script lang='ts' setup>

import { debounce } from 'src/util';
import { findMenuByName } from 'src/store/menu-store/util';
import { useMenuStore } from 'src/store';
import { ref } from 'vue';
import { SystemMenu } from 'src/store/menu-store/type';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();

const router = useRouter();

defineProps({
    visible: {
      type: Boolean
    }
  }
);

const emits = defineEmits(['update:visible']);

function handleClose() {
  searchText.value = '';
  searchResult.value = [];
  emits('update:visible', false);
}

function resultClick(result: SystemMenu[]) {
  router.push(result[result.length - 1].path);
  handleClose();
}

const searchText = ref();

const searchResult = ref<SystemMenu[][]>([]);

const handleInput = debounce((value: string) => {
  if (value) {
    searchResult.value = findMenuByName(menuStore.allMenu, value);
  }
}, 1000);

</script>

<template>
  <div v-if='visible' class='t-container' @click.stop='handleClose'>
    <div class='t-dialog' @click.stop>
      <div class='t-top'>
        <el-input v-model='searchText' clearable placeholder='搜索菜单' prefix-icon='search' size='large'
                  @input='handleInput' />
      </div>
      <div v-if='searchResult && searchResult.length' class='t-result'>
        <div v-for='sr in searchResult' class='t-path' @click='resultClick(sr)'>
          {{ sr.map(it => it.name).join(' &gt; ') }}
        </div>
      </div>
      <div v-else class='t-result'>暂无搜索结果</div>
      <div class='t-tooltip'>
        工具栏
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.t-container {
  position: fixed;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .t-dialog {
    display: flex;
    min-height: 20%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    background-color: white;
    position: fixed;
    z-index: 100;
    width: 600px;

    .t-top {
      padding: 10px 0;
      width: 90%;
    }

    .t-result {
      padding: 10px 0;
      align-items: center;
      color: rgba(150, 159, 175, 0.98);
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 90%;
      min-height: 100px;

      .t-path {
        cursor: pointer;
        margin-bottom: 8px;
        padding: 15px 0;
        text-align: left;
        font-size: 14px;
        color: #000;
        text-indent: 20px;
        width: 100%;
        border-radius: 5px;
        box-shadow: 0 1px 3px #d4d9e1;

        &:hover {
          background-color: var(--el-color-primary);
          color: #fff;
        }
      }
    }

    .t-tooltip {
      border-top: 1px solid #ccc;
      padding: 8px 0;
      bottom: 0;
      width: 100%;
      height: 30px;
    }
  }
}
</style>
