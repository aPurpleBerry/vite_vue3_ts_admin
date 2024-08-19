import router from '@/router'
//进度条包
// @ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' //进度条样式

//引入setting文件（项目统一名称）
import setting from './setting'

//获取用户相关的小仓库内部的token数据，判断用户是否登陆成功
//不在组件（.vue文件）中引入的话，需要把pinia引入
//获取小仓库的前提是大仓库存在
import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)

//进度条不要加载的小圆圈
nprogress.configure({showSpinner: false}) 

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫
//@ts-ignore
router.beforeEach(async(to:any, from:any, next:any) => {
  document.title = `${setting.title} - ${to.meta.title}` //网页名称

  nprogress.start() //进度条
  //路由鉴权-通过token
  let token = userStore.token
  if(token) { //用户登陆了，有token
    // alert('有token')
    if(to.path == '/login') {
      next({path:'/'})
    } else {
      try {
        //登录成功后可以访问除了login之外的所有路由
        //保证token不过期
        //如果没有用户信息，在守卫这里发送请求获取用户信息
        if(!userStore.username) {
          await userStore.userInfo()
  //万一刷新的时候是异步路由，有可能获取到用户信息 异步路由没有加载完毕，出现空白效果
          next({...to})
          console.log('permission');
        }
        next()
      } catch(error) {
        //token过期，无法获取用户信息
        //用户手动修改了token
        //相当于退出登录！
        userStore.userLogout() //清空数据
        next({path: '/login',query:{redirect: to.path}})//回到login
      }
    }
  } else { //用户没有登录，无token
    if(to.path == '/login') {
      next()
    } else {
      next({path: '/login',query:{redirect: to.path}})
      //query我把你想去但因为没有token没有去成的路径保留
    }
  }
  
}) 
//全局后置守卫
//@ts-ignore
router.beforeEach((to:any, from:any) => {
  // console.log('src/permission.ts - from未使用',to,from);

  nprogress.done() //进度条

}) 