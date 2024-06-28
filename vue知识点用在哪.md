# 父子组件通信

用在SVG的图标里

V:\Web\Vue3_admin\vite_vue3_admin\src\components\SvgIcon\index.vue

子



# 全局组件注册

SvgIcon

- 可以直接在 main.ts中引入+注册

```
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon',SvgIcon)
```

## 自定义插件

- 一个项目中不可能只有一个全局组件

利用自定义插件把组件都变成全局组件  \src\components\index.ts

# 工具提取 utils

axios拦截器

# 生命周期

onmounted  ```import { onMounted } from 'vue';```

# 其他

axios-二次封装，相应拦截器

promise-返回promise对象（axios二次封装）

webpack：eslint和prettier使用

ES6模块化

ES6数组方法

