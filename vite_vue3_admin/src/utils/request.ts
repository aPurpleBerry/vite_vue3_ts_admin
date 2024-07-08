//axios二次封装：请求响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  //获取用户相关的小仓库：获取仓库内部token，登陆成功之后携带给服务器
  let userStore = useUserStore()
  if(userStore.token) {
    config.headers.token = userStore.token
  }
  return config;
})

request.interceptors.response.use(
  (response)=>{
    //成功回调
    return response.data;
  }, 
  (error)=>{
    //失败回调
    let msg = '';
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = '无权访问';
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }
    //提示错误信息
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
  }
)


// 对外暴露
export default request;