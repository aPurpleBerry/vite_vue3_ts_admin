<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu" :class="{fold:layOutSettingStore.fold?true:false}">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-menu background-color="#00000" text-color="rgb(81,90,110)" :default-active="$route.path" :collapse="layOutSettingStore.fold?true:false" :collapse-transition="false"> 
        <!-- 根据路由动态生成 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
      
    </div>
    <!-- 右侧顶部 -->
    <div class="layout_tabbar" :class="{fold:layOutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>
    <!-- 右侧主内容 -->
    <div class="layout_main" :class="{fold:layOutSettingStore.fold?true:false}">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
//用户相关小仓库
import useUserStore from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/setting';
//路由展开，获取路由对象
import { useRoute } from 'vue-router';

let userStore = useUserStore();
let layOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;
  transition: all 0.1s;

  .layout_menu {
    width: $base-menu-width;
    height: 100vh;
    z-index: 1;

    .el-menu {
      border: 0!important;
    }

    &.fold {
      width: $base-min-menu-width;
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    // background-color: blue;
    position: fixed;
    top: 0;
    left: $base-menu-width;

    transition: all 0.1s;
    
    &.fold {
      width: calc(100% - $base-min-menu-width);
      left: $base-min-menu-width;
    }
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

    transition: all 0.1s;
    &.fold {
      width: calc(100% - $base-min-menu-width);
      left: $base-min-menu-width;
    }
  }
}
</style>