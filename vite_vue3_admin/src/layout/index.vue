<template>
  <div class="layout_container">
    <!-- 左侧导航 -->
    <div class="layout_nav"></div>
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <Logo></Logo>
    </div>
    <!-- 右侧顶部 -->
    <div class="layout_tabbar">456</div>
    <!-- 右侧主内容 -->
    <div class="layout_main">789</div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  display: flex;
  .layout_nav {
    width: $base_nav_width;
    height: 100vh;
    background-color: $base-menu-background; 
  }
  .layout_menu {
    width: $base-menu-width;
    height: 100vh;
    // background-color: grey;
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width - $base_nav_width);
    height: $base-tabbar-height;
    background-color: blue;
    position: fixed;
    top: 0;
    right: 0;
  }
  .layout_main {
    width: calc(100% - $base-menu-width - $base_nav_width);
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