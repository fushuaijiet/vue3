import { createApp } from 'vue'
// import App from './App.vue'
import store from './store/index.js';
import { router } from './router'
import Message from '@/components/Message.vue';
import Layout from '@/views/layout/index.vue';
import ShowMessage from '@/components/Message.js';
const app = createApp(Layout).use(store).use(router).use(Message)
// 设置全局方法
app.config.globalProperties.$ShowMessage = ShowMessage;
app.components = Layout;
app.template = '<Layout/>'
app.mount('#app')