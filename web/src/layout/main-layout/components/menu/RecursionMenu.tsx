import { SystemMenu } from 'src/store/menu-store/type';
import { defineComponent } from 'vue';
import { Menu } from '@element-plus/icons-vue';

const RecursionMenu =
  defineComponent({
    props: {
      menus: {
        type: Array as () => SystemMenu[],
        required: true
      }
    },
    setup(props) {
      return () => props.menus.map(it => {
          return it.menuType === 'directory' && it.children && it.children.length ?
            <el-sub-menu index={String(it.id)}>
              {{
                title: () =>
                  [
                    <el-icon>
                      <Menu />
                    </el-icon>,
                    <span>{it.name}</span>
                  ],
                default: () => <RecursionMenu menus={it.children || []} />
              }}
            </el-sub-menu>
            :
            <el-menu-item index={String(it.id)} route={it.path}>
              <el-icon>
                <Menu />
              </el-icon>
              <span>{it.name}</span>
            </el-menu-item>;
        }
      );
    }
  });
export default RecursionMenu;
