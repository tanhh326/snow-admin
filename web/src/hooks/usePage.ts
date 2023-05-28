import { reactive, ref } from 'vue';
import { PageImpl } from 'src/components/dynamic-table/type';

/**
 * 分页查询
 *
 * @param fetchData 远程获取数据的方法，返回值需要自行转换
 */
export default function (fetchData: (pageImpl: PageImpl) => Promise<PageImpl>) {
  const loading = ref(false);

  const pageImpl = reactive<PageImpl>({
    current: 1,
    size: 10,
    total: 0,
    data: [],
  });

  const loadData = () => {
    loading.value = true;
    fetchData(pageImpl).then(({ current, size, total, data }) => {
      pageImpl.current = current;
      pageImpl.size = size;
      pageImpl.total = total;
      pageImpl.data = data;
      loading.value = false;
    });
  };
  
  loadData();
  return {
    loading,
    pageImpl,
    loadData,
  };
}
