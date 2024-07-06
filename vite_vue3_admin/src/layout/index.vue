<template>
  <div class="layout_container">
    <!-- 左侧导航 -->
    <!-- <div class="layout_nav">
      <el-button @click="goHome">首页</el-button>
      <el-button>组件</el-button>
      <el-button>图表</el-button>
      <el-button>配置</el-button>
    </div> -->
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-menu background-color="#00000" text-color="rgb(81,90,110)"> 
        <!-- 根据路由动态生成 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
        <!-- <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">数据大屏</el-menu-item>
        折叠菜单 
        <el-sub-menu index="3">
          这个是具名插槽 
          <template #title>权限管理</template>
          <el-menu-item index="3-1">用户管理</el-menu-item>
          <el-menu-item index="3-2">角色管理</el-menu-item>
          <el-menu-item index="3-3">菜单管理</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
      
    </div>
    <!-- 右侧顶部 -->
    <div class="layout_tabbar">456</div>
    <!-- 右侧主内容 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
//用户相关小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();


</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;
  // .layout_nav {
  //   width: $base_nav_width;
  //   height: 100vh;
  //   background-color: $base-menu-background; 
  //   display: flex;
  //   flex-direction: column;
  // }
  .layout_menu {
    width: $base-menu-width;
    height: 100vh;
    // background-color: grey;
    .el-menu {
      // width: 80%;
      border: 0!important;
      padding: 10px;
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: blue;
    position: fixed;
    top: 0;
    right: 0;
  }
  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: $main-bgc;
    position: fixed;
    top: $base-tabbar-height;
    right: 0;
    padding: 20px;
    overflow: auto;
  }
}
</style>