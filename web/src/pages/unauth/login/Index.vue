<script lang="ts" setup>
import { reactive } from 'vue';
import { jumpToIndex } from 'src/router/support';
import { usePermissionsStore } from 'src/store/permissions-store';
import usePromise from 'src/hooks/usePromise';
import { ElMessage } from 'element-plus';

const form = reactive({
  username: 'admin',
  password: '123456',
  code: '',
});

const permissionsStore = usePermissionsStore();
const login = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (form.username === 'admin' && form.password === '123456') {
        permissionsStore.token = new Date().getTime().toString();
        resolve();
      }
    }, 1000);
  });
};

const { loading, execute: handlerLogin } = usePromise(login, () => {
  jumpToIndex();
  ElMessage.success('登录成功');
});
</script>

<template>
  <div>
    <h3>Sign In</h3>
    <div class="t-login">
      <el-form>
        <el-form-item>
          <el-input v-model="form.username" placeholder="账号" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-row :gutter="12">
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="验证码" />
            </el-col>
            <el-col :span="8">
              <img alt="error" class="t-img" src="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="handlerLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.t-login {
  padding: 40px 20px 10px;
  background-color: #ffffff;
  width: 20%;
  margin: auto;
  border-radius: 5px;

  .t-img {
    object-fit: contain;
    max-height: 32px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
