import { createApp } from 'vue'
import { createPinia } from 'pinia';
//整体导入 ElementPlus 组件库
import ElementPlus from 'element-plus' //导入 ElementPlus 组件库的所有模块和功能 
import 'element-plus/dist/index.css' //导入 ElementPlus 组件库所需的全局 CSS 样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //导入 ElementPlus 组件库中的所有图标
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //导入 ElementPlus 组件库的中文语言包
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import about from './about.vue'
import inspection from './inspection.vue'
import jdk from './jdk.vue'
import ksk from './ksk.vue'
import ywbm from './ywbm.vue'
import emitter from './plugins/Bus';


const app = createApp(App)

//注册 ElementPlus 组件库中的所有图标到全局 Vue 应用中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


//app.use(ElementPlus) //将 ElementPlus 插件注册到 Vue 应用中s
app.use(ElementPlus, {
    locale: zhCn // 设置 ElementPlus 组件库的区域语言为中文简体
})


// 定义路由
const routes = [
    { path: '/', component: inspection },
    { path: '/about', component: about },
    { path: '/jdk', component: jdk },
    { path: '/ksk', component: ksk },
    { path: '/ywbm', component: ywbm },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.config.errorHandler = (err, instance, info) => {
    emitter.emit('error', err);
}
app.use(createPinia())
app.use(router)
app.mount('#app')