import { ref } from 'vue';

/**
 * 执行某些操作时，需要添加加载状态防止重复提交时使用
 *
 * @param func
 * @param callback
 */
export default function <T>(
  func: () => Promise<T>,
  callback?: (result: T) => void,
) {
  const loading = ref(false);

  const execute = async () => {
    const result = await func();
    callback && callback(result);
  };

  return {
    loading,
    execute,
  };
}
