import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
//svg配置代码
import 'virtual:svg-icons-register'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//国际化（中文版）配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//路由
import router from './router'
//引入仓库
import pinia from './store'

//获取应用实例对象
const app = createApp(App)

//全局组件
import gloablComponent from './components/index';
app.use(gloablComponent);

//路由
app.use(router)

app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn, //国际化
})

//pinia
app.use(pinia)

//将应用挂载到挂载点上
app.mount('#app')

