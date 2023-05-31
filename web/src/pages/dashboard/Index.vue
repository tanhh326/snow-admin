<script lang="tsx" setup>
import { Delete, Edit } from '@element-plus/icons-vue';
import DynamicTable from 'src/components/dynamic-table';
import {
  Action,
  DynamicTableColumn,
  PageImpl,
} from 'src/components/dynamic-table/type';
import { ref } from 'vue';
import usePage from 'src/hooks/usePage';
import { useI18n } from 'vue-i18n';
import { baseAxios } from 'src/request';

const { t } = useI18n();
baseAxios.get('/ccc');
const columns = ref<DynamicTableColumn[]>([
  {
    title: '姓名',
    prop: 'name',
    show: true,
    render: (scope) => <div style={{ color: 'pink' }}>{scope.row.name}</div>,
  },
  {
    title: '年龄',
    prop: 'age',
    show: true,
  },
  {
    title: '地址',
    prop: 'addr',
    show: true,
  },
  {
    title: '个人信息',
    prop: 'info',
    show: false,
  },
  {
    title: '手机号',
    prop: 'phone',
    show: true,
  },
  {
    title: '禁用',
    prop: 'disable',
    show: true,
    render: (scope) =>
      scope.row.disable ? (
        <el-tag type="info" plain>
          禁用
        </el-tag>
      ) : (
        <el-tag type="success" plain>
          正常
        </el-tag>
      ),
  },
  {
    title: '操作',
    show: true,
    render: (scope) => [
      <el-button type="primary" icon={Edit}>
        编辑
      </el-button>,
      <el-popconfirm title="确定删除?" onConfirm={() => handlerDelete()}>
        {{
          reference: () => (
            <el-button type="danger" icon={Delete}>
              删除
            </el-button>
          ),
        }}
      </el-popconfirm>,
    ],
  },
]);

const handlerDelete = (selected?: []) => {
  loadData();
};

const tableData = ref([
  {
    name: 'tom',
    age: 18,
    addr: t('test'),
    info: 'info',
    phone: '1310001111',
    disable: true,
  },
  {
    name: 'lucy',
    age: 18,
    addr: '浙江杭州',
  },
  {
    name: 'tom-2',
    age: 28,
    addr: '浙江杭州',
    info: 'info',
    phone: '1310001111',
    disable: true,
  },
  {
    name: 'lucy-2',
    age: 12,
    addr: '浙江杭州',
  },
]);

const handlerAction = (action: Action) => {
  console.log('action', action);
};

const queryFormStyle = {
  backgroundColor: '#ffffff',
  padding: '20px 20px 0',
};

const queryForm = ref({
  name: '',
  phone: '',
});
const fetchData = (page: PageImpl) => {
  return new Promise<PageImpl>((resolve) => {
    console.log('此处自己转成想要的query参数', page, queryForm.value);
    setTimeout(() => {
      resolve({ size: 10, total: 100, current: 1, data: tableData.value });
    }, 1500);
  });
};

const { pageImpl, loading, loadData } = usePage(fetchData);
</script>

<template>
  <el-date-picker />
  <el-form :inline="true" :style="queryFormStyle">
    <el-row>
      <el-form-item label="姓名">
        <el-input v-model="queryForm.name" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.phone" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button @click="">重置</el-button>
      </el-form-item>
    </el-row>
  </el-form>
  <DynamicTable
    :columns="columns"
    :load-data="loadData"
    :loading="loading"
    :page-impl="pageImpl"
    @on-action="handlerAction"
  />
</template>

<style lang="less" scoped></style>
