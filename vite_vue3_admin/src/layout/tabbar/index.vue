<template>
  <div class="tabbar-top">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
  <div class="tabbar-bottom">
    <Tab></Tab>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
import Tab from './tab/index.vue'
</script>

<style scoped lang="scss">
.tabbar-top {
  width: 100%;
  height: 60px;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid $border-line-color;
}
.tabbar-bottom {
  width: 100%;
  height: 50px;
  padding-left: 50px
  // background-color: yellow;
}

</style>