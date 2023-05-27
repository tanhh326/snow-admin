<script lang="tsx" setup>
import { Delete, Edit } from '@element-plus/icons-vue';
import DynamicTable from 'src/components/dynamic-table';
import { Action, DynamicTableColumn } from 'src/components/dynamic-table/type';
import { ref } from 'vue';

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
        <ElTag type="info" plain>
          禁用
        </ElTag>
      ) : (
        <ElTag type="success" plain>
          正常
        </ElTag>
      ),
  },
  {
    title: '操作',
    show: true,
    render: (scope) => [
      <ElButton type="primary" icon={Edit}>
        编辑
      </ElButton>,
      <ElButton type="danger" icon={Delete}>
        删除
      </ElButton>,
    ],
  },
]);

const tableData = ref([
  {
    name: 'tom',
    age: 18,
    addr: '浙江杭州',
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

function visbleChange() {
  console.log(columns.value);
}

const currentPage4 = ref(4);
const pageSize4 = ref(100);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const handlerAction = (action: Action) => {
  console.log('action', action);
};
</script>

<template>
  <DynamicTable
    :columns="columns"
    :data="tableData"
    @on-action="handlerAction"
  />
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :disabled="disabled"
    :page-sizes="[10, 20, 50, 100]"
    :total="400"
    background
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style lang="less" scoped>
.el-pagination {
  background-color: #fff;
  padding: 1rem 0;
  justify-content: center;
}
</style>
