# 父子组件通信

用在SVG的图标里

V:\Web\Vue3_admin\vite_vue3_admin\src\components\SvgIcon\index.vue

menu递归路由 



涉及到叔侄子组件，比如刷新按钮，Setting & Main，就需要用到pinia

# 路由

全局路由守卫：进度条业务，路由鉴权

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

- 销毁创建组件：Setting刷新按钮

  ```
  watch监听
  销毁组件可以通过 v-if 
  nextTick ：nextTick所指定的回调会在浏览器更新DOM完毕之后再执行。
  ```

  

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



# vue2起名

```
<script lang="ts">
export default {
  name: 'BreadCrumb'
}
</script>
```



# elementplus相关

elementplus提供的`<component>`使用

# TS

断言 

src\store\modules\user.ts

```
localStorage.setItem('TOKEN',(result.data.token as string))
```

# watch

Setting刷新按钮

# css

加上了fold之后发生的效果：菜单折叠部分

```
 &.fold {
      width: $base-min-menu-width;
    }
```

# 优化

Setting刷新按钮：抖动

# pinia

- 创建时，先创建pinia，再创建小仓库

- 引用时①如果是组件（.vue文件），直接引入小仓库 ② 如果是TS文件，要先引入大仓库 src\permission.ts

  ```
  import pinia from './store'
  import useUserStore from './store/modules/user'
  let userStore = useUserStore(pinia)
  ```

  

# PROMISE

主要用在 组件(.vue)/TS文件  调用仓库(pinia)中的函数时，我需要得到成功或者失败的返回值。而这些函数都是async，返回的是promise对象

```javascript
    async userInfo() {
      let result = await reqUserInfo();

      if(result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
```

