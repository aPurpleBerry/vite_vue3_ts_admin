// 创建用户相关的小仓库
import { loginForm,loginResponseData,userResponseData} from '@/api/user/type'
import {defineStore} from 'pinia'
import router from '@/router'
import {reqLogin, reqUserInfo} from '@/api/user/index'
import type{UserState} from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入常量路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
//过滤当前用户的异步路由
function filerAsyncRoute(asyncRoute:any, routes:any) {
  return asyncRoute.filter((item:any)=>{
    if(routes.includes(item.name)) {
      if(item.children&&item.children.length>0) {
        item.children = filerAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  //存储数据
  state: ():UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //菜单生成路由
      username: '',
      avatar: ''
    }
  },
  //异步、逻辑
  actions: {
    //用户登录
    async userLogin(data: loginForm) {
      let result:loginResponseData = await reqLogin(data)
      // console.log('userts',result);
      
      if(result.data.code == 200) {
        this.token = (result.data.token as string);
        SET_TOKEN((result.data.token as string))
        return 'ok'
      } else {
        // return Promise.reject(new Error(result.data.message)) 
        return Promise.reject(new Error('登陆出错')) 
      }
    },
    //获取用户信息方法
    async userInfo() {
      let result:userResponseData = await reqUserInfo();
      console.log('userts userInfo',result);
      
      if(result.data.code == 200) {
  
        this.username = result.data.username as string
        this.avatar = 'http://127.0.0.1:3000/'+ result.data.avatar as string

        //计算用户的路由
        try {
          let userAsyncRoute =  filerAsyncRoute(cloneDeep(asyncRoute), result.data.routes)
          this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
          //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
          ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
            router.addRoute(route)
          })
        } catch(Err) {
          console.log(Err);
        }
        
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
      
    },
    //退出登录
    async userLogout() {
      //目前没有mock接口：退出登录接口（通知服务器 本地用户唯一标识失效）
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    }
  }
})
// 对外暴露获取小仓库的方法
export default useUserStore