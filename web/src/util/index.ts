/**
 * 防抖函数
 * @param func 方法
 * @param delay 单位ms
 */
export function debounce(func: Function, delay: number) {
  let timer: number;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
