// 创建用户相关的小仓库
import { loginForm,loginResponseData } from '@/api/user/type'
import {defineStore} from 'pinia'
import {reqLogin} from '@/api/user/index'
import type{UserState} from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
let useUserStore = defineStore('User', {
  //存储数据
  state: ():UserState => {
    return {
      token: GET_TOKEN()
    }
  },
  //异步、逻辑
  actions: {
    async userLogin(data: loginForm) {
      let result:loginResponseData = await reqLogin(data)
      if(result.code == 200) {
        this.token = (result.data.token as string);
        SET_TOKEN((result.data.token as string))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message)) 
      }
    }
  },
  getters: {
    
  }

})
// 对外暴露获取小仓库的方法
export default useUserStore