// 创建用户相关的小仓库
import { loginForm,loginResponseData } from '@/api/user/type'
import {defineStore} from 'pinia'
import {reqLogin, reqUserInfo} from '@/api/user/index'
import type{UserState} from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入常量路由
import { constantRoute } from '@/router/routes';

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
      if(result.code == 200) {
        this.token = (result.data.token as string);
        SET_TOKEN((result.data.token as string))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message)) 
      }
    },
    //获取用户信息方法
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