import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//svg配置代码
import 'virtual:svg-icons-register'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//国际化（中文版）配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//获取应用实例对象
const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn, //国际化
})

//将应用挂载到挂载点上
app.mount('#app')

