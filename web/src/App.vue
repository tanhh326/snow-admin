<script lang="ts" setup>
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// @ts-ignore
import en from 'element-plus/dist/locale/en.mjs';

const elementPlusLanguage: { [key: string]: any } = {
  zhCn,
  en,
};
</script>

<template>
  <el-config-provider :locale="elementPlusLanguage[navigator.language]">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
