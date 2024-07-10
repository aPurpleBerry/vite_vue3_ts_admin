# 说明

vite_vue3_admin_static 和 vite_vue3_admin 的区别是数据全是静态的，因为我发现…先搭建好静态的比较好。

# 改动

（1） main.ts

```
注释import './permission'
// import './permission'
```

（2）src\views\acl\personalcenter\index.vue

​          src\layout\tabbar\setting\index.vue

```
原本是：
<img :src="userStore。avatar">

不知道为什么没有办法显示，就改成了静态的：
<img src="@/assets/images/icon.gif">
```



