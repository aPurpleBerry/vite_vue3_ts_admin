//对外暴露插件对象
// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
// 自定义类型
import type { App, Component } from 'vue';

// 把所有组件放进一个对象components中
const components: { [name: string]: Component } = { SvgIcon };

// 对外暴露插件对象
export default {
    // 务必叫做install方法
    // 注册项目全部的全局组件
    install(app: App) { // 会把app应用实例注入进来
        Object.keys(components).forEach((key: string) => {
            // 注册为全局组件
            app.component(key, components[key]);
        })
    }
}