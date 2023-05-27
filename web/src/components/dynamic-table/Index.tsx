import { computed, defineComponent } from 'vue';
import { Action, DynamicTableColumn, Scope } from './type';
import {
  Bottom,
  Delete,
  Grid,
  Plus,
  Refresh,
  Top,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCheckbox,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from 'element-plus';
import './style.less';

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
      type: Array as () => DynamicTableColumn[],
      required: true,
    },
    data: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const computedColumns = computed(() =>
      props.columns.filter((it) => it.show),
    );
    const actionVNode = () => (
      <div class="t-action">
        <div class="t-left">
          <ElButton icon={Refresh} />
          <ElButton
            type="primary"
            icon={Plus}
            onClick={() => emit('onAction', 'add')}
          >
            新增
          </ElButton>
          <ElButton
            type="danger"
            icon={Delete}
            onClick={() => emit('onAction', 'delete')}
          >
            删除
          </ElButton>
          <ElButton
            type="primary"
            icon={Top}
            onClick={() => emit('onAction', 'import')}
          >
            导入
          </ElButton>
          <ElButton
            type="primary"
            icon={Bottom}
            onClick={() => emit('onAction', 'export')}
          >
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
    return () => (
      <>
        {actionVNode()}
        <el-table
          border
          stripe
          highlight-current-row
          data={props.data}
          table-layout="auto"
          cell-style={{ textAlign: 'center' }}
          header-cell-style={{ textAlign: 'center' }}
        >
          {{
            default: () =>
              [
                <el-table-column type="selection" />,
                <el-table-column type="index" />,
              ].concat(
                computedColumns.value.map((it) => {
                  return (
                    <el-table-column
                      prop={it.prop}
                      label={it.title}
                      width={it.width}
                    >
                      {{
                        default: (scope: Scope) =>
                          it.render && it.render(scope),
                      }}
                    </el-table-column>
                  );
                }),
              ),
            empty: () => <el-empty />,
          }}
        </el-table>
      </>
    );
  },
});
