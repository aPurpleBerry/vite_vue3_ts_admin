<template>
  <div class="setting">
    <el-button size="default" icon="Refresh" circle bg="true" @click="updateRefsh"></el-button>
    <el-button size="default" icon="FullScreen" circle  @click="fullScreen"></el-button>
    <el-button size="default" icon="Setting" circle ></el-button>
    <el-button size="default" icon="BellFilled" circle ></el-button>
    <span style="font-size:11px;position:absolute;right:140px;top:8px;border-radius: 50%;height: 20px;width: 20px;display: inline-block;background: rgb(255,77,79);vertical-align: top;">
        <span style="display: block;color: #FFFFFF;height: 20px;line-height: 20px;text-align: center"> 
          12
        </span>
    </span>
    <!-- admin  -->
    <img :src="userStore.avatar" style="width: 30px;height: 30px;margin-left: 20px;margin-right: 5px; border-radius: 50%;">
    <el-dropdown style="margin-right: 30px;cursor: pointer;">
        <span class="el-dropdown-link">
          {{userStore.username}}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goPerson">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/setting';
//路由器
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
// 刷新
let layOutSettingStore = useLayOutSettingStore()
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
//头像和名称
let userStore = useUserStore()

// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement 
  if(!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen()
  }
}
//个人中心
const goPerson = ()=> {
  $router.push({path: '/personalcenter'})
}
//退出登录
const logOut = ()=> {
  userStore.userLogout();
  $router.push({path: '/login',query:{redirect:$route.path}})
}
</script>

<style scoped>
.setting {
  display: flex;
  align-items: center;
  /* background-color: blue; */
}
.styleL {
  cursor: pointer;
}
</style>