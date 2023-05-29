import { createApp } from 'vue';
import 'src/style.css';
import App from 'src/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from 'src/router';
import { createPinia } from 'pinia';
import piniaPersistencePlugin from 'pinia-plugin-persistedstate';
import { createI18n } from 'vue-i18n';
import en from 'src/lang/en.json';
import zhCn from 'src/lang/zh-cn.json';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  globalInjection: true,
  messages: {
    en,
    'zh-CN': zhCn,
  },
});

const pinia = createPinia().use(piniaPersistencePlugin);

app.use(router).use(pinia).use(ElementPlus).use(i18n).mount('#app');
