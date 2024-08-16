登录的前后端流程 

（ 前端）点击登录后，后端返回token，前端存在pinia（仓库）中，同时localstorage保存（浏览器记录）。注意token是域名下独立的（京东有token 淘宝有token）。

页面保护：不能在没有token的情况下，（用户在地址栏手动输入网址）跳转其他页面。路由定义使用meta选项，自行定义 `meta: {authRequires:true}`，表示这个路由需要登录才能访问。这里使用到**导航守卫**，

```javascript
router.beforeEach((to, from, next)=>{
    const token = localStorage,getItem('item')
    if(to.name != 'login' && !token) next({name: 'Login'})
    else next()
})
代码含义：如果用户不能验证身份，则返回login
这里也能看出路由定义时 name选项的作用
```

上述代码也有问题，if条件只判断了是否有token，完全可以自己在localstorage中添加一个空白token，验证也能通过。**所以前端无法验证token是否正确，后端才行。**前端常通过设置请求头发送token给后端。用到**请求响应拦截器。**

```javascript
import axios from "axios";
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  // 从本地获取token，这里需要根据实际情况来获取
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    注意这里后端处理的时候，要截取字符串，'Bearer '后面的才是token  在后端.slice(7)
  }
  return config;
})
```

后端接口保护：防止别人直接调用接口对数据进行修改。因此在调用数据库接口之前，定义一个函数验证token。**JWT**创建token，签发 验证。

JWT签发token是通过加密id得到的，因此解密完token就是id，就能验证用户信息。

```
后端返回参数
200成功；201创建成功；204无内容，删除成功。
301永久重定向；302临时重定向（临时被攻击）
400 发送的请求后端无法理解，可能是参数传的不对（请求头请求体查询参数路径参数）；401没登陆（前端要么没有传token 要么传错了）；403没权限；404（前端：地址写错，请求方法错了）
500服务器内部出错；502有可能后端配置错误；503超载 秒杀系统；
```



REST Client可以在VScode中模拟请求，只是用于测试。BV1Nb411j7AC





思路：输入用户名密码时，登陆成功后端返回token，前端保存token（pinia localstorage）。跳转页面之前，如果没有token（没登陆的情况）OR token过期的情况，都要跳转至login页面