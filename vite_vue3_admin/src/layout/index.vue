<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-menu background-color="#00000" text-color="rgb(81,90,110)" :default-active="$route.path"> 
        <!-- 根据路由动态生成 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
      
    </div>
    <!-- 右侧顶部 -->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
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
import Tabbar from './tabbar/index.vue'
//用户相关小仓库
import useUserStore from '@/store/modules/user';
//路由展开，获取路由对象
import { useRoute } from 'vue-router';

let userStore = useUserStore();
//获取路由对象
let $route = useRoute()

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
      // padding: 10px;
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    // background-color: blue;
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