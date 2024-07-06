# 父子组件通信

用在SVG的图标里

V:\Web\Vue3_admin\vite_vue3_admin\src\components\SvgIcon\index.vue

menu递归路由 



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

vue-router

# 插槽

elementplus中使用

```
<template #title>权限管理</template>
<el-menu-item index="3-1">用户管理</el-menu-item>
<el-menu-item index="3-2">角色管理</el-menu-item>
<el-menu-item index="3-3">菜单管理</el-menu-item>
```



# elementplus相关



# TS

断言 

src\store\modules\user.ts

```
localStorage.setItem('TOKEN',(result.data.token as string))
```

