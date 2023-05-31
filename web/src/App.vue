<script lang="ts" setup>
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// @ts-ignore
import en from 'element-plus/dist/locale/en.mjs';
import { computed } from 'vue';

const elementPlusLanguage: { [key: string]: any } = {
  zhCn,
  en,
};

const language = computed(() => navigator.language);
</script>

<template>
  <el-config-provider :locale="elementPlusLanguage[language]">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
