import axios from 'axios';
import { usePermissionsStore } from 'src/store/permissions-store';
import { ElMessage } from 'element-plus';

const baseAxios = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const permissionsStore = usePermissionsStore();
baseAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = permissionsStore.token.valueOf();
    return config;
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  },
);

baseAxios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  },
);
export default baseAxios;
