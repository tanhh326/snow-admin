<script lang='ts' setup>
import { reactive } from 'vue';
import { jumpToIndex } from 'src/router/support';
import { usePermissionsStore } from 'src/store/permissions-store';

const form = reactive({
  username: 'admin',
  password: '123456'
});

const permissionsStore = usePermissionsStore();

function login() {
  if (form.username === 'admin' && form.password === '123456') {
    permissionsStore.token = new Date().getTime().toString();
    jumpToIndex();
  }
}
</script>

<template>
  <div>
    <h3>Sign In</h3>
    <el-form>
      <el-form-item label='用户名/手机号'>
        <el-input v-model='form.username' />
      </el-form-item>
      <el-form-item label='密码'>
        <el-input v-model='form.password' />
      </el-form-item>
      <el-form-item>
        <el-button @click='login'>登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
