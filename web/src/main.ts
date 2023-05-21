import { createApp } from 'vue';
import 'src/style.css';
import App from 'src/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from 'src/router';
import { createPinia } from 'pinia';
import piniaPersistencePlugin from 'pinia-plugin-persistedstate';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia().use(piniaPersistencePlugin);

app.use(router).use(pinia).use(ElementPlus).mount('#app');
