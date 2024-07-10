import {createRouter, createWebHashHistory} from 'vue-router'
import {constantRoute} from './routes'
let router = createRouter({
  //模式
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为：页面跳转
  scrollBehavior(){
    return {
      left: 0,
      top: 0
    }
  }
})

export default router;