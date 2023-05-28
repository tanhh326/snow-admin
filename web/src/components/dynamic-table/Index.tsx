import { computed, defineComponent, PropType, ref } from 'vue';
import { Action, DynamicTableColumn, PageImpl, Scope } from './type';
import {
  Bottom,
  Delete,
  Grid,
  Plus,
  Refresh,
  Top,
} from '@element-plus/icons-vue';
import './style.less';
import {
  ElButton,
  ElCheckbox,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from 'element-plus';

export default defineComponent({
  name: 'DynamicTable',
  emits: {
    onAction: (action: Action) => {
      if (['add', 'delete', 'import', 'export'].includes(action)) {
        return true;
      }
      console.error('抛出的事件标识不正确');
    },
  },
  props: {
    columns: {
      type: Array as PropType<DynamicTableColumn[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    pageImpl: {
      type: Object as PropType<PageImpl>,
      required: true,
    },
    loadData: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const computedColumns = computed(() =>
      props.columns.filter((it) => it.show),
    );

    const selected = ref<any[]>([]);

    const actionVNode = () => (
      <div class="t-action">
        <div class="t-left">
          <ElButton icon={Refresh} onClick={props.loadData} />
          <ElButton
            type="primary"
            icon={Plus}
            onClick={() => emit('onAction', 'add')}>
            新增
          </ElButton>
          <ElButton
            type="danger"
            icon={Delete}
            disabled={!selected.value.length}
            onClick={() => emit('onAction', 'delete')}>
            删除
          </ElButton>
          <ElButton icon={Top} onClick={() => emit('onAction', 'import')}>
            导入
          </ElButton>
          <ElButton icon={Bottom} onClick={() => emit('onAction', 'export')}>
            导出
          </ElButton>
        </div>
        <div class="t-right">
          <ElDropdown type="primary" hide-on-click={false}>
            {{
              default: () => <ElButton type="info" icon={Grid} />,
              dropdown: () => (
                <ElDropdownMenu>
                  {() =>
                    props.columns.map((column) => (
                      <ElDropdownItem>
                        <ElCheckbox v-model={column.show}>
                          {column.title}
                        </ElCheckbox>
                      </ElDropdownItem>
                    ))
                  }
                </ElDropdownMenu>
              ),
            }}
          </ElDropdown>
        </div>
      </div>
    );

    const paginationVNode = () => {
      return (
        <el-pagination
          current-page={props.pageImpl.current}
          page-size={props.pageImpl.size}
          page-sizes={[10, 20, 50, 100]}
          total={props.pageImpl.total}
          background
          layout="total, sizes, prev, pager, next, jumper"
          onSizeChange={(size: number) => {
            props.pageImpl.size = size;
            props.loadData();
          }}
          onCurrentChange={(current: number) => {
            props.pageImpl.current = current;
            props.loadData();
          }}
        />
      );
    };
    return () => (
      <>
        {actionVNode()}
        <el-table
          border
          stripe
          highlight-current-row
          data={props.pageImpl.data}
          v-loading={props.loading}
          cell-style={{ textAlign: 'center' }}
          header-cell-style={{ textAlign: 'center' }}
          onSelectionChange={(val: []) => (selected.value = val)}>
          {{
            default: () =>
              [
                <el-table-column type="selection" />,
                <el-table-column type="index" />,
              ].concat(
                computedColumns.value.map((column) => {
                  return (
                    <el-table-column
                      prop={column.prop}
                      label={column.title}
                      width={column.width}>
                      {{
                        default: (scope: Scope) =>
                          column.render && column.render(scope),
                      }}
                    </el-table-column>
                  );
                }),
              ),
            empty: () => <el-empty />,
          }}
        </el-table>
        {paginationVNode()}
      </>
    );
  },
});
